/*
 * @author: Archy
 * @Date: 2022-04-28 16:08:59
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-10 15:30:36
 * @FilePath: \vue3-preview\src\components\Progress.tsx
 * @description: 
 */
import { defineComponent, ref } from 'vue';
import type { ExtractPropTypes } from 'vue'

export const progressProps = () => ({
  percent: { type: [Number, String], default: 0 },
  fullTime: { type: String, default: '00:00:00' },
  currentTime: { type: String, default: '00:00:00' }
})

export type ProgressProps = Partial<ExtractPropTypes<ReturnType<typeof progressProps>>>

export default defineComponent({
  name: 'Progress',
  emits: ['update:percent', 'change'],
  props: progressProps(),
  setup(props, { emit }) {
    const progress = ref<HTMLElement>()
    const handleDown = (e: MouseEvent & { target: any }) => {
      e.stopPropagation()
      window.addEventListener('mousemove', hanldeMousemove)
      window.addEventListener('mouseup', (e) => {
        window.removeEventListener('mousemove', hanldeMousemove)
      })
    }

    const handleClick = (e: MouseEvent & { target: any }) => {
      if (e.target !== progress.value) return
      const percent = e.target.clientWidth ? ((e.offsetX / e.target.clientWidth) * 100).toFixed(2) : 0
      emit('change', percent)
      emit('update:percent', percent)
    }

    const hanldeMousemove = (e: MouseEvent & { target: any }) => {
      const elementWidth = progress.value?.clientWidth
      const offset = elementWidth ? (Number((e.movementX / elementWidth) * 100).toFixed(2)) : 0
      const per = Number(props.percent) + Number(offset)
      const perNow = per > 100 ? 100 : per < 0 ? 0 : per
      emit('change', perNow)
      emit('update:percent', perNow)
    }

    return () => {
      return <div class='vue-preview__progress' ref={progress} onClick={handleClick} >
        <div class="vue-preview__progress__sign" style={{ left: props.percent + '%' }} onMousedown={handleDown}>
          <div class='vue-preview__progress__current-time'>{props.currentTime}</div>
        </div>
        <div class='vue-preview__progress__full-time'>{props.fullTime}</div>
      </div>
    }
  }
})