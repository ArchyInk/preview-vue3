/*
 * @author: Archy
 * @Date: 2022-04-22 10:03:25
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-17 10:41:55
 * @FilePath: \preview-vue3\example\main.ts
 * @description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import preview from '../src'
const app = createApp(App)  
app.directive('preview', preview)
app.mount('#app')