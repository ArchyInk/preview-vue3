import { defineComponent, ref, watch } from 'vue';

import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import { debounce } from 'lodash-es'

// 类型引入
import type { ExtractDefaultPropTypes, PropType } from 'vue'
import type { PDFDocumentProxy, PDFPageProxy, PageViewport } from 'pdfjs-dist';

// worker资源引入
import pdfWorker from '../assets/pdfjs/pdf.worker.min.js?url'
// 钩子函数引入
import { useBoolean, useCreateElement, useState } from 'arhooks-vue';
import down from '../utils/download'
import printJS from 'print-js'

export const pdfViewerProps = () => ({
  src: { type: String, required: true },
  pageNum: { type: Number, default: 1 },
  scale: { type: Number, default: 1 },
})

export type PDFViewerProps = Partial<ExtractDefaultPropTypes<ReturnType<typeof pdfViewerProps>>>

export default defineComponent({
  name: 'PDFViewer',
  props: pdfViewerProps(),
  emits: ['error', 'update:pageNum'],
  setup(props, { emit, expose }) {
    GlobalWorkerOptions.workerSrc = pdfWorker
    const container = ref<HTMLDivElement>()
    const singleCanvas = ref<HTMLCanvasElement>()
    const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBoolean(false)
    const [totalPage, setTotalPage] = useState<number>(0)
    let document: PDFDocumentProxy | undefined = undefined
    const pageCache: Array<{ page: PDFPageProxy | undefined, rendered: boolean }> = []
    const [pageRefs, setPageRefs] = useState<Array<HTMLCanvasElement | undefined>>([])

    // 显示监听器
    const ob = new IntersectionObserver(obs => {
      let maxPage = 1
      let maxRatio = 0
      obs.forEach(async (page) => {
        const target = page.target as (Element & { dataset: any })
        preLoad(target.dataset.page)
        if (maxRatio < page.intersectionRatio) {
          maxRatio = page.intersectionRatio
          maxPage = target.dataset.page
        }
        await render()
      })

    }, {});
    const initDocument = async () => {
      try {
        setLoadingTrue()
        document = await getDocument(props.src!).promise // 获取document
        setTotalPage(document.numPages) // 获取总页数
        initPageRefs()
        initPageCache()

        await preLoad(1)
        await render()

        setLoadingFalse()
      } catch (err) {
        emit('error', err)
      }
    }

    // 初始化canvas数组
    const initPageRefs = () => {
      setPageRefs(new Array<HTMLCanvasElement | undefined>(document!.numPages).fill(undefined))
    }

    // 初始化pages缓存数组
    const initPageCache = () => {
      for (let i = 0; i < document!.numPages; i++) {
        pageCache.push({ page: undefined, rendered: false })
      }
    }

    watch(() => props.pageNum, (n) => {
      setPage(n)
    })

    const setPage = async (pageNum: number) => {
      if (!document) return
      if (pageNum < 1) {
        emit('update:pageNum', 1)
      } else if (pageNum > totalPage.value) {
        emit('update:pageNum', totalPage.value)
      } else {
        await preLoad(pageNum)
        pageRefs.value[pageNum - 1]!.scrollIntoView()
      }
    }

    // 预加载
    const preLoad = async (pageNum: number) => {
      for (let i = pageNum - 3; i < pageNum + 1; i++) {
        if (i < 0) {
          continue;
        }
        if (i > totalPage.value - 1) {
          continue;
        }
        pageCache[i] = {
          page: pageCache[i]?.page ?? await document!.getPage(i + 1),
          rendered: pageCache[i].rendered ?? false,
        }
      }
    }

    const render = async () => {
      pageCache.forEach(async (pageObj, index) => {
        if (!pageObj.page || pageObj.rendered) return
        const canvas = pageRefs.value[index]
        if (!canvas) return
        const viewport = pageObj.page.getViewport({ scale: adjustingScale(pageObj.page, canvas) * props.scale })
        canvas.width = viewport.width
        canvas.height = viewport.height
        const canvasContext = canvas.getContext('2d')!
        pageObj.page.render({
          canvasContext,
          viewport
        })
        pageObj.rendered = true
        ob.observe(canvas)
      })
    }

    const renderContainer = () => {
      const canvasArr = pageRefs.value.map((_, index) => {
        return <div class='vue-pdf-viewer__page'>
          <canvas id={`vue-pdf-viewer__page-${index + 1}`} data-page={index + 1} ref={(el) => {
            if (el) {
              pageRefs.value[index] = el as HTMLCanvasElement
            }
          }}
          ></canvas>
        </div>
      })
      return <>
        <div class='vue-pdf-viewer__container' ref={container} style={{ width: '60vw' }}>
          {canvasArr}
        </div>
      </>
    }

    const adjustingScale = (page: PDFPageProxy, canvas: HTMLCanvasElement): number => {
      try {
        canvas!.style.width = '100%'
        canvas!.style.height = 'auto'
        const scale = canvas.clientWidth / page.view[2]
        return scale
      } catch (err) {
        console.error(err);
        return 1
      }
    }

    const print = () => {
      printJS(props.src!)
    }

    const download = () => {
      down(props.src!)
    }

    expose({ print, download })

    initDocument()

    return () => {
      return renderContainer()
    }
  }
})