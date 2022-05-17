/*
 * @author: Archy
 * @Date: 2022-04-24 10:26:27
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-11 11:41:35
 * @FilePath: \vue3-preview\src\container\Video.tsx
 * @description: 
 */
import Warpper from '../components/Warpper';
import { defineComponent, ExtractPropTypes, ref, onUpdated, nextTick } from 'vue';
import { warpperProps } from '../components/Warpper';
import close from '../assets/close.svg'
import { renderHeader } from '../components/renders';
import { useState } from 'arhooks-vue';
import Video, { VideoJsPlayer } from 'video.js'
import 'video.js/dist/video-js.css'
export const VideoProps = () => Object.assign({
  src: { type: String, required: true },
}, warpperProps()
)

export type WarpperProps = Partial<
  ExtractPropTypes<ReturnType<typeof VideoProps>>
>

export default defineComponent({
  name: 'Video',
  props: VideoProps(),
  emits: ['update:visible'],
  setup(props, { emit }) {
    const container = ref<HTMLElement>()
    const [video, setVideo] = useState<VideoJsPlayer>()

    // 初始化videoJs实例
    const initVideo = () => {
      const videoElement = document.createElement('video')
      videoElement.classList.add('video-js')
      videoElement.src = props.src!
      container.value?.appendChild(videoElement)
      const video = Video(videoElement, {
        controls: true,
        autoplay: true,
        muted: true,
        width: 800,
        height: 450
      })
      return video
    }

    // 渲染video容器
    const renderVideoContainer = () => {
      return <div ref={container}></div>
    }

    const toolButtons = [
      { src: close, alt: '关闭', title: '关闭', onClick: () => { emit('update:visible', false) } },
    ]

    // nextTick等renderVideoContainer完成后再初始化
    nextTick(() => {
      setVideo(initVideo())
    })

    onUpdated(() => {
      if (props.visible) {
        if (video.value) {
          video.value.src(props.src!)
          container.value?.appendChild((video.value as any).el_)
        } else {
          setVideo(initVideo())
        }
      }
    })

    return () => {
      return <Warpper
        v-model:visible={props.visible}
        onMaskClick={() => { emit('update:visible', false) }}
        v-slots={{
          content: () => renderVideoContainer(),
          header: () => renderHeader(toolButtons)
        }}></Warpper>
    }
  }
})