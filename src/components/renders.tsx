/*
 * @author: Archy
 * @Date: 2022-05-06 14:34:02
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-12 16:44:18
 * @FilePath: \vue3-preview\src\components\renders.tsx
 * @description: 
 */
import type { CSSProperties } from "vue"
import type { ToolType } from "./Tool"

import Tool from "./Tool"

export const defaultIconStyle = {
  width: '20px',
  height: '20px',
  marginLeft: '24px',
  marginRight: '8px',
  cursor: 'pointer'
}

export const renderHeader = (tools: Array<ToolType>, defaultStyle: CSSProperties = defaultIconStyle) => {
  return <>
    <div class="vue-preview__header__slot"></div>
    <div class="vue-preview__header__tools">
      {tools.map((tool) => (<Tool {...tool} style={defaultStyle} />))}
    </div>
    </>
}