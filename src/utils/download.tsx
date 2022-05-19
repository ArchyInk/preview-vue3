/*
 * @author: Archy
 * @Date: 2022-05-17 10:03:57
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-19 16:26:19
 * @FilePath: \preview-vue3\src\utils\download.tsx
 * @description: 
 */
import { useCreateElement } from "arhooks-vue"
import message from "../components/Message"
import download from '../assets/download2.svg'

/**
 * @description: 下载的方法
 * @param url url
 * @param filename 下载的文件夹
 * @param request 是否通过request请求下载，默认true，开启后会避免浏览器直接打开某些类型的文件而不是下载
 * @return {*}
 */
export default async (url: string, filename?: string, request: boolean = true) => {
  const link = useCreateElement<'a'>('a')
  if (request) {
    const close = message(<div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><img src={download} style={{marginRight:'4px'}} height={16} ></img><div>正在准备下载中...</div></div>)
    const blob = await (await fetch(url)).blob()
    close()
    url = URL.createObjectURL(blob)
  }
  link.href = url
  link.download = filename || ''
  link.click()
}