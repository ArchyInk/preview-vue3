/*
 * @author: Archy
 * @Date: 2022-04-24 10:26:18
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-10 15:01:16
 * @FilePath: \vue3-preview\src\container\Audio.tsx
 * @description: 
 */
import { defineComponent, onUpdated, onUnmounted } from 'vue';
import type { ExtractPropTypes, CSSProperties } from 'vue'

import { warpperProps } from '../components/Warpper';
import { formatTime } from '../utils/format';

import { renderHeader } from '../components/renders';

// 组件引入
import Warpper from '../components/Warpper';
import Progress from '../components/Progress';
import Volume from '../components/Volume';

// 资源引入
import defaultCover from '../assets/default_cover.png'
import close from '../assets/close.svg'
import playSvg from '../assets/play.svg'
import pauseSvg from '../assets/pause.svg'
import stopSvg from '../assets/stop.svg'

// 钩子函数引入
import { useState, useBoolean, useEventListener } from 'arhooks-vue';

export const audioProps = () => Object.assign({
  src: { type: String, required: true },
  coverImage: String,
  name: String,
}, warpperProps()
)

export type AudioProps = Partial<
  ExtractPropTypes<ReturnType<typeof audioProps>>
>

enum PlayState {
  stoping = 0,
  playing = 1,
  error = -1
}

export default defineComponent({
  name: 'Audio',
  props: audioProps(),
  emits: ['update:visible'],
  setup(props, { emit }) {
    const [percent, setPercent] = useState<number>(0)
    const [playState, setPlayState] = useState<number>(PlayState.stoping)
    const [canPlay, setCanPlay] = useBoolean(false)
    const [fullTime, setFullTime] = useState<string>()
    const [currentTime, setCurrentTime] = useState<string>()
    const [audio, setAudio] = useState<HTMLAudioElement>()
    const [vol] = useState<number>(50)

    // 初始化
    const init = () => {
      setAudio(new Audio(props.src))
      audio.value.volume = 0.5
    }

    // 停止
    const stop = () => {
      setPlayState(PlayState.stoping)
      audio.value.currentTime = 0
      audio.value.pause()
    }

    // 播放
    const play = () => {
      setPlayState(PlayState.playing)
      audio.value.play()
    }

    // 暂停
    const pause = () => {
      setPlayState(PlayState.stoping)
      audio.value.pause()
    }

    // 渲染Audio
    const renderAudioContainer = () => {
      const buttonStyle: CSSProperties = { height: '32px' }

      const handleProgressChange = (val: number) => {
        audio.value.currentTime = val * audio.value.duration / 100
      }

      const handleVolueChange = (val: number) => {
        audio.value.volume = val / 100
      }

      return (<div class="vue-preview__audio__slot">
        <img class="vue-preview__audio__image" src={props.coverImage || defaultCover} alt="" />
        <div class="vue-preview__audio__dashboard">
          {
            canPlay.value ? <>
              {playState.value === PlayState.stoping ?
                <img style={buttonStyle} src={playSvg} onClick={play}></img>
                : <img style={buttonStyle} src={pauseSvg} onClick={pause}></img>
              }
              <img style={buttonStyle} src={stopSvg} onClick={stop}></img>
              <div class="vue-preview__audio__dashboard__progress">
                <Progress v-model:percent={percent.value} onChange={handleProgressChange} fullTime={fullTime.value} currentTime={currentTime.value}></Progress>
              </div>
              <Volume buttonStyle={buttonStyle} v-model:vol={vol.value} onChange={handleVolueChange}></Volume>
            </>
              : '加载中。。。'
          }
        </div>
      </div>)
    }

    // 上方工具按钮数组
    const toolButtons = [
      { src: close, alt: '关闭', title: '关闭', onClick: () => { emit('update:visible', false) } },
    ]

    // 监听canplay
    useEventListener('canplay', () => {
      setCanPlay.set(true)
      setFullTime(formatTime(audio.value.duration))
    }, { target: audio })

    // 监听timeupdate
    useEventListener('timeupdate', () => {
      setPercent(audio.value.duration !== 0 ? (audio.value.currentTime / audio.value.duration) * 100 : 0)
      setCurrentTime(formatTime(audio.value.currentTime))
    }, { target: audio })

    init()

    // watch和watchEffect会报错，原因可能是因为在外部有个重新render的操作会导致queuePreFlushCb函数队列丢失
    // 只能监听update了，但如果其他操作导致重新渲染也会触发此回调
    onUpdated(() => {
      if (props.visible) {
        if (audio.value) {
          audio.value.src && audio.value.src !== props.src && (audio.value.src = props.src!)
        } else {
          init()
        }
      } else {
        stop()
        setCanPlay.set(false)
      }
    })

    onUnmounted(() => {
      stop()
      setCanPlay.set(false)
    })

    return () => {
      return <Warpper
        v-model:visible={props.visible}
        onMaskClick={() => { emit('update:visible', false) }}
        v-slots={{
          content: () => renderAudioContainer(),
          header: () => renderHeader(toolButtons)
        }}></Warpper>
    }
  }
})