/*
 * @author: Archy
 * @Date: 2022-05-05 15:23:14
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-10 15:11:28
 * @FilePath: \vue3-preview\src\utils\format.ts
 * @description: 
 */
/**
 * @description: 通过sec格式化为时间字符串
 * @param {number} sec
 * @return {string} 'hh:mm:ss'格式的字符串
 */
export const formatTime = (sec?: number): string => {
  const round = Math.floor(sec ?? 0)
  const levelArr: Array<string> = ['00', '00', '00']
  const secend = round % 60
  levelArr[2] = secend.toString().padStart(2, '0')
  const minute = Math.trunc(round / 60)
  if (minute >= 60) {
    const hour = Math.trunc(minute / 60)
    levelArr[0] = hour.toString()
  }
  levelArr[1] = minute.toString().padStart(2, '0')
  return levelArr.join(':')
}
