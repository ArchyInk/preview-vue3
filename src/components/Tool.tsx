/*
 * @author: Archy
 * @Date: 2022-04-26 13:44:11
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-19 14:19:35
 * @FilePath: \preview-vue3\src\components\Tool.tsx
 * @description: 上方工具按钮组件
 */
import { defineComponent } from 'vue';
import type { PropType, CSSProperties, ExtractPropTypes } from 'vue'

export type ToolType = {
  src: string,
  alt?: string,
  title?: string,
  style?: CSSProperties,
  disable?: boolean,
  onClick?: (e: Event) => void
}

export const toolProps = () => ({
  src: { type: String, required: true },
  alt: String,
  title: String,
  style: Object as PropType<CSSProperties>,
  disable: { type: Boolean, default: false },
})

export type ToolProps = Partial<
  ExtractPropTypes<ReturnType<typeof toolProps>>
>


export default defineComponent({
  name: 'Tool',
  props: toolProps(),
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (e: Event) => {
      emit('click', e)
    }
    return () => {
      return <img src={props.src} style={props.style} alt={props.alt} title={props.title} class={props.disable ? 'vue-preview__tool--disable' : ''}  onClick={handleClick} />
    }
  }
})