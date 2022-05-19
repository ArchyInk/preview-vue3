/*
 * @author: Archy
 * @Date: 2022-04-22 10:03:25
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-19 17:03:09
 * @FilePath: \preview-vue3\vite.config.ts
 * @description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import libCss from 'vite-plugin-libcss'
import dts from 'vite-plugin-dts'
const path = require('path')

export default defineConfig({
  plugins: [vue(), vueJsx(), libCss(), dts({ outputDir: './dist/types',exclude:'./example' })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'preview-vue3',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
