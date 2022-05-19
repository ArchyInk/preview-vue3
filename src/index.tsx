/*
 * @author: Archy
 * @Date: 2022-04-22 14:20:58
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-19 16:59:44
 * @FilePath: \preview-vue3\src\index.tsx
 * @description:
 */

import { render, nextTick, ref, watch } from 'vue'
import type { Directive } from 'vue'
import getType from './utils/getType'

// 组件引入
import Image from './container/Image'
import Audio from './container/Audio'
import Unpreviewable from './container/Unpreviewable'
import Video from './container/Video'
import PDF from './container/Pdf'

import './shims.d.ts'
import './styles/index.less'

export type VuePreviewBinding = {
  url: string,
  options?: VuePreviewOptions
}

export type VuePreviewOptions = {
  alt?: string,
  title?: string,
  coverImage?: string,
  name?: string
}

// 插入vue-preview插件根节点
const appendRoot = () => {
  let div = document.getElementById('vue-preview')
  if (!div) {
    div = document.createElement('div')
    div.id = 'vue-preview'
  }
  nextTick(() => {
    document.getElementById('app')?.appendChild(div!)
  })
  return div
}

const switchHandle = (url: string, options?: VuePreviewOptions) => {
  const type = getType(url)
  const div = appendRoot()
  const visible = ref(true)
  watch(() => visible.value, () => {
    switch (type) {
      // 处理图片类型
      case 'image':
        render(<Image v-model:visible={visible.value} src={url} name={options?.name} alt={options?.alt} title={options?.title}></Image>, div!)
        break
      // 处理PDF类别
      case 'pdf':
        render(<PDF v-model:visible={visible.value} src={url} name={options?.name}></PDF>, div!)
        break
      // 处理音频类别
      case 'audio':
        render(<Audio v-model:visible={visible.value} src={url} name={options?.name} coverImage={options?.coverImage}></Audio>, div!)
        break
      // 处理视频类别
      case 'video':
        render(<Video v-model:visible={visible.value} src={url} name={options?.name} coverImage={options?.coverImage}></Video>, div!)
        break
      // 处理不能预览的类别
      default:
        render(<Unpreviewable v-model:visible={visible.value}></Unpreviewable>, div!)
        break
    }
  }, { immediate: true })
}

export default {
  mounted(el, binding) {
    el.addEventListener('click', async () => {
      if (typeof binding.value === 'string') {
        const url = binding.value
        switchHandle(url)
      } else if (binding.value instanceof Promise) {
        const asyncValue = await binding.value
        const url = asyncValue.default || asyncValue
        if (typeof url !== 'string') {
          throw Error(`The type of Promise result is not \`string\`.`)
        } else {
          switchHandle(url)
        }
      } else if (typeof binding.value === 'object') {
        const url = binding.value.url
        switchHandle(url, binding.value.options)
      } else {
        throw Error(
          `Expected \`string\` or \`Object\` pr \`Promise\`,but got \`${typeof binding.value}\`.`
        )
      }
    })
  },
} as Directive<any, string | VuePreviewBinding | Promise<Record<string, any>>>
