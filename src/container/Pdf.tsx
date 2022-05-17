/*
 * @author: Archy
 * @Date: 2022-04-24 10:26:31
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-13 09:31:38
 * @FilePath: \vue3-preview\src\container\Pdf.tsx
 * @description: 
 */
import { CSSProperties, defineComponent, ref } from 'vue';
import type { ExtractPropTypes } from 'vue'
import { defaultIconStyle, renderHeader } from '../components/renders';

// 组件引入
import Warpper, { warpperProps } from '../components/Warpper';
import PDFViewer from '../components/PDFViewer';
import Tool from '../components/Tool';


// 资源引入
import close from '../assets/close.svg'
import download from '../assets/download.svg'
import print from '../assets/print.svg'

import { useState } from 'arhooks-vue';

export const pdfProps = () => Object.assign({
  src: { type: String, required: true },
}, warpperProps()
)

export type PdfProps = Partial<
  ExtractPropTypes<ReturnType<typeof pdfProps>>
>
export default defineComponent({
  name: 'Pdf',
  props: pdfProps(),
  emits: ['update:visible'],
  setup(props, { emit }) {
    const [pageNum, setPageNum] = useState<number>(1)
    const pdfViewer = ref()
    const renderTools = () => {
      return <>
        <div class="vue-preview__header__slot"></div>
        <div class="vue-preview__header__tools">
          <Tool src={download} style={defaultIconStyle} alt="下载" title="下载" onClick={() => { pdfViewer.value.download() }} />
          <Tool src={print} style={defaultIconStyle} alt="打印" title="打印" onClick={() => { pdfViewer.value.print() }} />
          <Tool src={close} style={defaultIconStyle} alt="关闭" title="关闭" onClick={() => { emit('update:visible', false) }} />
        </div>
      </>

    }

    const renderPdf = () => {
      return <PDFViewer src={props.src} v-model:pageNum={pageNum.value} ref={pdfViewer}></PDFViewer>
    }

    return () => {
      const contentStyle: CSSProperties = {
        overflow: 'auto',
        position: 'absolute',
        display: 'block',
        left: '50%',
        transform: 'translateX(-50%)'
      }
      return <Warpper
        v-model:visible={props.visible}
        onMaskClick={() => { emit('update:visible', false) }}
        contentStyle={contentStyle}
        v-slots={{
          content: () => renderPdf(),
          header: () => renderTools()
        }}></Warpper>
    }
  }
})