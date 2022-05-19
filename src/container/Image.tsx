/*
 * @author: Archy
 * @Date: 2022-04-22 14:09:31
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-19 16:30:47
 * @FilePath: \preview-vue3\src\container\Image.tsx
 * @description: 
 */
import { defineComponent, reactive, onUnmounted, onUpdated, ref, nextTick } from 'vue';
import type { ExtractPropTypes } from 'vue'

import { renderHeader } from '../components/renders';

import down from '../utils/download'

// 组件引入
import { warpperProps } from '../components/Warpper';
import Warpper from '../components/Warpper';

// 资源引入
import turn from '../assets/turn.svg'
import zoomIn from '../assets/zoomin.svg'
import zoomOut from '../assets/zoomout.svg'
import close from '../assets/close.svg'
import download from '../assets/download.svg'

// 钩子函数引入
import { useState } from 'arhooks-vue';

export const imageProps = () => Object.assign({
  src: { type: String, required: true },
  name: String,
  alt: String,
  title: String
}, warpperProps()
)

export type ImageProps = Partial<
  ExtractPropTypes<ReturnType<typeof imageProps>>
>

export default defineComponent({
  name: 'Image',
  props: imageProps(),
  emits: ['update:visible'],
  setup(props, { emit }) {
    const offset = reactive({ x: 0, y: 0 })
    const [zoom, setZoom] = useState<number>(1)
    const [deg, setDeg] = useState<number>(0)

    const warpper = ref()

    const toolButtons = [
      { src: turn, alt: '右旋', title: '向右旋转90°', onClick: () => { deg.value += 90 }, style: { transform: 'scale(1.3)' } },
      { src: turn, alt: '左旋', title: '向左旋转90°', onClick: () => { deg.value -= 90 }, style: { transform: 'rotateY(180deg) scale(1.3)' } },
      { src: zoomIn, alt: '放大', title: '放大', onClick: () => { handleZoom(true) } },
      { src: zoomOut, alt: '缩小', title: '缩小', disable: zoom.value <= 1, onClick: () => { handleZoom(false) } },
      {
        src: download, alt: '下载', title: '下载', onClick: () => {
          down(props.src!, props.name!)
        }
      },
      { src: close, alt: '关闭', title: '关闭', onClick: () => { emit('update:visible', false) } },
    ]

    // 格式化offset
    const normalizeOffset = (offset: { x: number, y: number }) => {
      return `${offset.x}px, ${offset.y}px`
    }

    // 格式化deg
    const normalizeDeg = (deg: number) => {
      return `${deg}deg`
    }

    // 放大
    const setZoomIn = () => {
      setZoom((oldV) => oldV += 0.2)
    }

    // 缩小
    const setZoomOut = () => {
      setZoom((oldV) => oldV -= 0.2)
    }

    // 鼠标移动事件回调
    const mousemoveEventListener = (e: any) => {
      offset.x += e.movementX
      offset.y += e.movementY
    }

    // 鼠标弹起事件回调
    const mouseupEventListener = (e: any) => {
      e.target.classList.remove('cursor--grabbing')
      if (zoom.value <= 1) {
        offset.x = offset.y = 0
      }
      window.removeEventListener('mousemove', mousemoveEventListener)
      window.removeEventListener('mouseup', mouseupEventListener)
    }

    // zoom按钮回调
    const handleZoom = (isIn: Boolean) => {
      isIn ? setZoomIn() : setZoomOut()
    }

    // 渲染图片
    const renderImage = () => {
      const handleMousedown = (e: any) => {
        e.target.classList.add('cursor--grabbing')
        window.addEventListener('mouseup', mouseupEventListener)
        window.addEventListener('mousemove', mousemoveEventListener)
      }

      return <>
        <img
          class='vue-preview__image__slot'
          style={{ transform: `translate(${normalizeOffset(offset)}) scale(${zoom.value}) rotate(${normalizeDeg(deg.value)})`, }}
          src={props.src}
          alt={props.alt}
          title={props.title}
          draggable={false}
          onMousedown={handleMousedown}
        />
      </>
    }

    const wheelEventListener = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        setZoomIn()
      } else {
        zoom.value >= 1.2 ? setZoomOut() : setZoom(1)
      }
    }

    // 复位
    const reset = () => {
      window.removeEventListener('wheel', wheelEventListener)
      offset.x = offset.y = 0
      setZoom(1)
      setDeg(0)
    }

    nextTick(() => {
      window.addEventListener('wheel', wheelEventListener)
    })

    onUpdated(() => {
      if (props.visible) {
        window.addEventListener('wheel', wheelEventListener)
      } else {
        reset()
      }
    })

    onUnmounted(() => {
      reset()
    })

    return () => {
      return <Warpper
        ref={warpper}
        v-model:visible={props.visible}
        onMaskClick={() => { emit('update:visible', false) }}
        v-slots={{
          content: () => renderImage(),
          header: () => renderHeader(toolButtons)
        }}></Warpper>
    }
  }
})