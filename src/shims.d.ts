/*
 * @author: Archy
 * @Date: 2022-05-06 14:54:38
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-19 17:00:59
 * @FilePath: \preview-vue3\src\shims.d.ts
 * @description: 
 */
declare module 'pdfjs-dist/build/pdf.worker.entry';

import { VuePreviewBinding } from './'

type VPreviewDirective = {
  'v-preview'?: VuePreviewBinding;
};

type VPreviewShimesTypes = VLoadingDirective & VDownloadingDirective

declare module 'vue' {
  export interface HTMLAttributes extends ArdirectivesShimesTypes { }
}

