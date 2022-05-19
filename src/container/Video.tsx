/*
 * @author: Archy
 * @Date: 2022-04-24 10:26:27
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-19 16:31:52
 * @FilePath: \preview-vue3\src\container\Video.tsx
 * @description: 
 */

// vue相关引入
import { defineComponent, ref, onUpdated, nextTick, onUnmounted } from 'vue';
import type { ExtractPropTypes } from 'vue'

import { useCreateElement, useEventListener, useState } from 'arhooks-vue'; //钩子函数
import { getDeviceType, DEVICE_TYPE } from '../utils/device'; // 设备判断
import down from '../utils/download'

// 组件和渲染函数引入
import Warpper from '../components/Warpper';
import { warpperProps } from '../components/Warpper';
import { renderHeader } from '../components/renders';

// videojs
import Video, { VideoJsPlayer } from 'video.js'
import zhCN from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'

// 引入静态资源
import close from '../assets/close.svg'
import picInPic from '../assets/picInPic.svg'
import download from '../assets/download.svg'


export const VideoProps = () => Object.assign({
  src: { type: String, required: true },
  name: { type: String },
  coverImage: { type: String }
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
      const videoElement = useCreateElement('video', {}, container.value!)
      videoElement.classList.add('video-js')

      // 添加中文, 需要手动添加, 否则不生效
      Video.addLanguage('zh-CN', zhCN)
      // 长宽适配
      const windowWidth = window.innerWidth
      const videoWidth = windowWidth * (getDeviceType() === DEVICE_TYPE.DESKTOP ? 0.6 : 1)

      // 挂载Video到container上
      const video = Video(videoElement, {
        controls: true,
        autoplay: false,
        muted: true,
        language: 'zh-CN',
        width: videoWidth,
        height: videoWidth * 9 / 16,
        controlBar: {
          children: ['playToggle', 'volumePanel', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'fullscreenToggle']
        }
      }, () => {
        setVideo(video)
      }
      )

      video.src(props.src!)
      props.coverImage && video.poster(props.coverImage)
    }


    const cancelResizeListener = useEventListener('resize', () => {
      if (video.value) {
        const windowWidth = window.innerWidth
        const videoWidth = windowWidth * (getDeviceType() === DEVICE_TYPE.DESKTOP ? 0.6 : 1)
        video.value.width(videoWidth)
        video.value.height(videoWidth * 9 / 16)
      }
    }, { target: window })

    // 渲染video容器
    const renderVideoContainer = () => {
      return <div ref={container}></div>
    }

    const handlePIPButton = async () => {
      if (video.value) {
        try {
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          } else {
            await video.value.requestPictureInPicture();
          }
        } catch (err) {
          console.error('Video failed to enter/leave Picture-in-Picture mode.');
        }
      }
    }

    const toolButtons = [
      {
        src: download, alt: '下载', title: '下载', onClick: () => {
          down(props.src!)
        }
      },
      { src: picInPic, alt: '画中画', title: '画中画', onClick: () => { handlePIPButton(); emit('update:visible', false) } },
      { src: close, alt: '关闭', title: '关闭', onClick: () => { emit('update:visible', false) } },
    ]

    // nextTick等renderVideoContainer完成后再初始化
    nextTick(() => {
      initVideo()
    })

    onUpdated(async () => {
      if (props.visible) {
        if (video.value) {
          video.value.src(props.src!)
          props.coverImage && video.value.poster(props.coverImage)
          container.value?.appendChild((video.value as any).el_)
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          }
        } else {
          initVideo()

        }
      }
    })

    onUnmounted(() => {
      cancelResizeListener()
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