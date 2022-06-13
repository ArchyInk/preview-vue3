<!--
 * @author: Archy
 * @Date: 2022-04-22 10:03:25
 * @LastEditors: Archy
 * @LastEditTime: 2022-06-13 10:27:32
 * @FilePath: \preview-vue3\example\App.vue
 * @description: 
-->
<script setup lang="ts">
import { useState } from 'arhooks-vue'
const [url, setUrl] = useState<string>('/测试中文小米字体.pdf')
setTimeout(()=>{
  setUrl('http://demo.archy.ink/preview-vue3/assets/test.744b6685.png')
},2000)
</script>

<template>
  <span v-preview="'http://demo.archy.ink/preview-vue3/assets/test.744b6685.png'">正常jpg图片</span>
  <br />
  <span v-preview="'http://demo.archy.ink/preview-vue3/assets/test.744b6685.png'">过宽png图片</span>
  <br />
  <span v-dist-preview="url">pdf</span>
  <br />
  <span
    v-preview="{ url: 'http://demo.archy.ink/preview-vue3/assets/test.5436ebd4.mp3', options: { name: 'test', coverImage: 'http://demo.archy.ink/preview-vue3/assets/test.744b6685.png' } }">音频</span>
  <br />
  <span v-preview="'http://demo.archy.ink/preview-vue3/assets/test.f98776a7.mp4'">视频</span>
  <br />
  <span v-preview="'C://img'">未知类型</span>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
