/*
 * @author: Archy
 * @Date: 2022-04-22 15:58:17
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-10 15:22:08
 * @FilePath: \vue3-preview\src\utils\getType.ts
 * @description:
 */
import { getType } from 'mime'


export default (url: string) => {
  const mimeType = getType(url)
  try {
    if (mimeType === 'application/pdf') {
      return 'pdf'
    }
    return mimeType?.split('/')[0] as 'image' | 'audio' | 'video' || 'unknown'
  } catch (err) {
    return 'unknown'
  }
}


