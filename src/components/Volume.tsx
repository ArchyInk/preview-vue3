/*
 * @author: Archy
 * @Date: 2022-04-28 16:09:05
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-11 11:40:46
 * @FilePath: \vue3-preview\src\components\Volume.tsx
 * @description: 音量滑动条组件
 */
import { defineComponent, ref } from 'vue';
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

// 资源引入
import volumeSvg from '../assets/volume.svg'
import volumeClearSvg from '../assets/volumeClear.svg'

// 钩子函数引入
import { useBoolean, useHover } from 'arhooks-vue';

export const volumeProps = () => ({
  vol: { type: [Number, String], default: 0 },
  buttonStyle: { type: Object as PropType<CSSProperties> }
})

export type VolumeProps = Partial<
  ExtractPropTypes<ReturnType<typeof volumeProps>>
>

export default defineComponent({
  name: 'Volume',
  emits: ['update:vol', 'change'],
  props: volumeProps(),
  setup(props, { emit }) {
    const volume = ref<HTMLElement>()
    const box = ref<HTMLElement>()
    const [visible, { setTrue, setFalse }] = useBoolean(false)
    const [mute, setMute] = useBoolean(false)
    const handleDown = (e: MouseEvent & { target: any }) => {
      e.stopPropagation()
      window.addEventListener('mousemove', hanldeMousemove)
      window.addEventListener('mouseup', (e) => {
        window.removeEventListener('mousemove', hanldeMousemove)
      })
    }

    const handleClick = (e: MouseEvent & { target: any }) => {
      if (e.target !== volume.value) return
      const vol = e.target.clientWidth ? ((e.offsetX / e.target.clientWidth) * 100).toFixed(2) : 0
      emit('change', vol)
      emit('update:vol', vol)
    }

    const hanldeMousemove = (e: MouseEvent & { target: any }) => {
      const elementWidth = volume.value?.clientWidth
      const offset = elementWidth ? (Number((e.movementX / elementWidth) * 100).toFixed(2)) : 0
      const vol = Number(props.vol) + Number(offset)
      const volNow = vol > 100 ? 100 : vol < 0 ? 0 : vol
      emit('change', volNow)
      emit('update:vol', volNow)
    }

    const renderVolume = () => {
      return <div class={`vue-preview__volume`} ref={volume} style={{ marginLeft: '4px' }} onClick={handleClick} >
        <div class="vue-preview__volume__sign" style={{ left: props.vol + '%' }} onMousedown={handleDown}>
        </div>
      </div>
    }

    useHover(box, {
      onEnter: () => { setTrue() },
      onLeave: () => { setFalse() },
    })

    const handleButtonClick = () => {
      if (props.vol > 0) {
        emit('change', 0)
        emit('update:vol', 0)
        setMute.setTrue()
      } else {
        emit('change', 50)
        emit('update:vol', 50)
        setMute.setFalse()
      }
    }


    return () => {
      return <>
        <div class='vue-preview__volume__box' ref={box}>
          {visible.value ?
            <><img style={{ transform: 'scale(0.7)', ...props.buttonStyle }} src={!mute.value ? volumeSvg : volumeClearSvg} onClick={handleButtonClick} />{renderVolume()}</> :
            <img style={props.buttonStyle} src={!mute.value ? volumeSvg : volumeClearSvg} ref={volume} onClick={handleButtonClick} />}
        </div>
      </>
    }
  }
})