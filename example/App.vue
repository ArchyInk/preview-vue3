<!--
 * @author: Archy
 * @Date: 2022-04-22 10:03:25
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-13 13:47:37
 * @FilePath: \vue3-preview\example\App.vue
 * @description: 
-->
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <span v-preview="import('./assets/test.jpg')">正常jpg图片</span>
  <br />
  <span v-preview="import('./assets/test.png')">过宽png图片</span>
  <br />
  <span v-preview="import('./assets/test.pdf')">pdf</span>
  <br />
  <span v-preview="import('./assets/test.mp3')">音频</span>
  <br />
  <span v-preview="import('./assets/test.mp4')">视频</span>
  <br />
  <span v-preview="'C://img'">未知类型</span>
  <br />
  <span v-preview="'C://img'">未知类型</span>
  <br />
  <!-- <Warpper v-model:visible="visible"></Warpper> -->
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
