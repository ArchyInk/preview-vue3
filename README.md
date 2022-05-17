
# preview-vue3

vue3预览指令，包含image,pdf,audio和video的预览

## Demo
[demo](http://demo.archy.ink/preview-vue3/)

## 作者

- [@ArchyInk](https://gitee.com/archyInk)

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
```

## 备注
包含了pdfjs的worker文件，pdfjs要求worker文件下载到本地，否则会有警告，所以包有点大。  
还有挺多bug，正在修复。  
正在做功能的完善。

## bug
v1.0.0
root层级过低
mask事件未屏蔽冒泡
未添加loading
