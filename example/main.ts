/*
 * @author: Archy
 * @Date: 2022-04-22 10:03:25
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-13 14:12:55
 * @FilePath: \vue3-preview\example\main.ts
 * @description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import vuePreview from '../dist/vue3preview.es.js'
const app = createApp(App)
app.use(vuePreview)
app.mount('#app')