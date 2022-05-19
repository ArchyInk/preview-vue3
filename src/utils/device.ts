/*
 * @author: Archy
 * @Date: 2022-05-18 16:16:25
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-18 16:23:47
 * @FilePath: \preview-vue3\src\utils\device.ts
 * @description: 
 */
import enquireJs from 'enquire.js'

export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
}

export const getDeviceType = () => {
  let deviceType = DEVICE_TYPE.DESKTOP

  enquireJs
    .register('screen and (max-width: 576px)', { match: () => { deviceType = DEVICE_TYPE.MOBILE } })
    .register(
      'screen and (min-width: 576px) and (max-width: 1199px)',
      { match: () => { deviceType = DEVICE_TYPE.TABLET } }
    )
    .register('screen and (min-width: 1200px)', { match: () => { deviceType = DEVICE_TYPE.DESKTOP } })

  return deviceType
}
