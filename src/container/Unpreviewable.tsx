/*
 * @author: Archy
 * @Date: 2022-04-27 15:49:49
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-06 14:38:54
 * @FilePath: \vue3-preview\src\container\Unpreviewable.tsx
 * @description: 
 */
import Warpper from '../components/Warpper';
import { defineComponent, ExtractPropTypes } from 'vue';
import { warpperProps } from '../components/Warpper';
import close from '../assets/close.svg'

import { renderHeader } from '../components/renders';
export const unpreviewableProps = () => Object.assign({
}, warpperProps()
)

export type UnpreviewableProps = Partial<
  ExtractPropTypes<ReturnType<typeof unpreviewableProps>>
>

export default defineComponent({
  name: 'Unpreviewable',
  props: unpreviewableProps(),
  emits: ['update:visible'],
  setup(props, { emit }) {
    const toolButtons = [
      { src: close, alt: '关闭', title: '关闭', onClick: () => { emit('update:visible', false) } },
    ]

    const renderUnpreviewable = () => {
      return <div style={{ color: 'white' }}>此类型文件暂不支持预览</div>
    }

    return () => {
      return <Warpper
        v-model:visible={props.visible}
        onMaskClick={() => { emit('update:visible', false) }}
        v-slots={{
          content: () => renderUnpreviewable(),
          header: () => renderHeader(toolButtons)
        }}></Warpper>
    }
  }
})