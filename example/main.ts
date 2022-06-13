/*
 * @author: Archy
 * @Date: 2022-04-22 10:03:25
 * @LastEditors: Archy
 * @LastEditTime: 2022-06-13 10:25:56
 * @FilePath: \preview-vue3\example\main.ts
 * @description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import preview from '../src'
import distPreview from '../dist/index.es'
const app = createApp(App)  
app.directive('preview', preview)
app.directive('dist-preview', distPreview)
app.mount('#app')