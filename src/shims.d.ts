/*
 * @author: Archy
 * @Date: 2022-05-06 14:54:38
 * @LastEditors: Archy
 * @LastEditTime: 2022-06-14 10:10:16
 * @FilePath: \preview-vue3\src\shims.d.ts
 * @description: 
 */
declare module 'pdfjs-dist/build/pdf.worker.entry';
declare module 'pdfjs-dist/lib/display/display_utils';

import { VuePreviewBinding } from './'

type VPreviewDirective = {
  'v-preview'?: VuePreviewBinding;
};

type VPreviewShimesTypes = VPreviewDirective

declare module 'vue' {
  export interface HTMLAttributes extends VPreviewShimesTypes { }
}

