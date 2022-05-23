<!--
 * @author: Archy
 * @Date: 2022-05-17 10:03:57
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-23 10:54:58
 * @FilePath: \preview-vue3\README.md
 * @description: 
-->

# preview-vue3

vue3预览指令，包含image,pdf,audio和video的预览

## Demo
[demo](http://demo.archy.ink/preview-vue3/)

## 作者

- [@ArchyInk](https://github.com/ArchyInk)

## 开始

`npm install preview-vue3` 或者 `yarn add preview-vue3`

```javascript
//main.ts
import { createApp } from "vue";
import preview from "preview-vue3";

const app = createApp(App);
app.directive("preview", preview);
app.mount("#app");

//template
<span v-preview="'test.xxx'">例子</span>
<span v-preview="{url:'test.xxx',options:{name:'下载文件名',alt:'图片预览alt属性',title:'图片预览title属性',coverImage:'媒体预览封面.jpg'}}">例子</span>
```

## 备注
包含了pdfjs的worker文件，pdfjs要求worker文件下载到本地，否则会有警告，所以包有点大。  
还有挺多bug，正在修复。  
正在做功能的完善。
