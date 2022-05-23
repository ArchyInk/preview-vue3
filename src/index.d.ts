/*
 * @author: Archy
 * @Date: 2022-05-23 10:56:49
 * @LastEditors: Archy
 * @LastEditTime: 2022-05-23 10:56:51
 * @FilePath: \preview-vue3\src\index.d.ts
 * @description: 
 */
import type { Directive } from 'vue';
export declare type VuePreviewBinding = {
    url: string;
    options?: VuePreviewOptions;
};
export declare type VuePreviewOptions = {
    alt?: string;
    title?: string;
    coverImage?: string;
    name?: string;
};

type VPreviewDirective = {
  'v-preview'?: VuePreviewBinding;
};

type VPreviewShimesTypes = VPreviewDirective

declare module 'vue' {
  export interface HTMLAttributes extends VPreviewShimesTypes { }
}

declare const _default: Directive<any, string | VuePreviewBinding | Promise<Record<string, any>>>;
export default _default;
