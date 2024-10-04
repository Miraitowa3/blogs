<template>
  <div class="bb relative h-full  overflow-hidden">
    <div class="fixed top-0 left-0 bg-red-700 rounded-lg" @click="showPreview = !showPreview">预览</div>
    <Editor :value="value" :plugins="plugins" @change="handleChange" :locale="zhHans" v-show="!showPreview"
      :editorConfig="{ lineNumbers: true, autofocus: false }" />
    <Viewer :value="value" v-show="showPreview" :plugins="plugins"></Viewer>
  </div>
</template>
<script setup lang="ts">

import 'bytemd/dist/index.css';
import zhHans from "bytemd/locales/zh_Hans.json"
import pluginGfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json"
import 'highlight.js/styles/atom-one-dark.css' // 引入代码高亮样式 这是默认样式
// import 'juejin-markdown-themes/dist/juejin.min.css';
import { ref, onMounted } from "vue";
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import hightlight from "@bytemd/plugin-highlight";
import gemoji from "@bytemd/plugin-gemoji";
import math from "@bytemd/plugin-math";
import mermaid from "@bytemd/plugin-mermaid";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mathLocale from "@bytemd/plugin-math/locales/zh_Hans.json";
import mermaidLocale from "@bytemd/plugin-mermaid/locales/zh_Hans.json";
import align from 'bytemd-plugin-align'
import image from 'bytemd-plugin-image'

import changecodeTheme from 'bytemd-plugin-highlight'
import changeTheme from 'bytemd-plugin-theme' //这个插件 把 `juejin-markdown-themes` 中的主题集中起来并提供切换功能。
//bytemd-plugin-theme插件实现可以参考https://juejin.cn/post/7410224960298336306?searchId=20241002112321A6BBD410FEDE061CB732
//引入bytemd-plugin-theme 这个插件，就不需要 引入'juejin-markdown-themes/dist/juejin.min.css' 样式了。
//下面是切换主题的原理
//  let css = await import('juejin-markdown-themes/dist/channing-cyan')   //channing-cyan yu  smartblue scrolls-light fancy geek-black healer-readable jzman lilsnake orange

//   let markdownThemeStyleElement = document.querySelector('#markdownTheme')
//   if (markdownThemeStyleElement) {
//     markdownThemeStyleElement.innerHTML = css.default
//   } else {
//     // // ('创建style标签')
//     markdownThemeStyleElement = document.createElement('style')
//     markdownThemeStyleElement.id = 'markdownTheme'
//     markdownThemeStyleElement.innerHTML = css.default
//     document.head.appendChild(markdownThemeStyleElement)

//   }
const plugins = [
  gfm({ locale: pluginGfmZhHans }),
  align(),
  image(),
  hightlight(), //引入代码高亮样式 这是默认样式
  changeTheme(),//引入代码高亮样式 这是主题样式
  changecodeTheme(),
  gemoji(),

  math({
    locale: mathLocale,
  }),
  mermaid({
    locale: mermaidLocale,
  }),
  mediumZoom(),
  // Add more plugins here
];
const value = ref("");
//输入文本之后，触发该事件，就可以在这里获取到值
const handleChange = (v: string) => {
  value.value = v;
  console.log(v, 888888888);

};

const showPreview = ref(false);
onMounted(async () => {


});
</script>

<style scoped>
:deep(.bytemd) {
  height: 100vh !important
}

:deep(.markdown-body) {
  height: 100%;
  overflow: auto;
}
</style>
