
import 'bytemd/dist/index.css';
import zhHans from "bytemd/locales/zh_Hans.json"
import pluginGfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json"
import 'highlight.js/styles/atom-one-dark.css' // 引入代码高亮样式 这是默认样式
// import 'juejin-markdown-themes/dist/juejin.min.css';
import { ref, onMounted } from "vue";

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
import changeTheme from 'bytemd-plugin-theme'

export default function () {
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


  return {
    plugins
  }
}
