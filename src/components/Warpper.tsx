/*
 * @author: Archy
 * @Date: 2022-04-24 10:25:51
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-12 16:43:02
 * @FilePath: \vue3-preview\src\components\Warpper.tsx
 * @description: 外层组件
 */
import { defineComponent, Transition } from 'vue'
import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'

export const warpperProps = () => ({
  maskStyle: Object as PropType<CSSProperties>,
  contentStyle: Object as PropType<CSSProperties>,
  headerStyle: Object as PropType<CSSProperties>,
  visible: { type: Boolean, default: false },
})

export type WarpperProps = Partial<
  ExtractPropTypes<ReturnType<typeof warpperProps>>
>


export default defineComponent({
  name: 'Warpper',
  props: warpperProps(),
  emits: ['maskClick'],
  setup(props, { slots, emit }) {
    const renderContainerRoot = () => {
      return (
        <div class="vue-preview__root">
          <div
            class='vue-preview__mask'
            style={props.maskStyle}
            onClick={() => {
              emit('maskClick')
            }}
          />
          <div class='vue-preview__header' style={props.headerStyle}>
            {slots.header ? slots.header?.() : null}
          </div>
          <div class='vue-preview__content' style={props.contentStyle}>{slots.content?.()}</div>
          {slots.footer ? (
            <div class='vue-preview__footer'>{slots.footer?.()}</div>
          ) : null}
        </div>
      )
    }

    return () => {
      return <Transition name="vue-preview" appear>{props.visible ? renderContainerRoot() : null}</Transition>
    }
  },
})
