<template>
  <Viewer :value="data" :plugins="plugins"></Viewer>
</template>
<script setup lang="ts">
import { watch, nextTick, watchEffect } from "vue";
import 'bytemd/dist/index.css';
import { getProcessor } from 'bytemd'

import pluginGfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json"
import { Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import mermaid from "@bytemd/plugin-mermaid";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaidLocale from "@bytemd/plugin-mermaid/locales/zh_Hans.json";
import align from 'bytemd-plugin-align'
import image from 'bytemd-plugin-image'
import changecodeTheme from 'bytemd-plugin-highlight'
import changeTheme from 'bytemd-plugin-theme'
import { setTheme } from "bytemd-plugin-theme"
import { visit } from "unist-util-visit";
let minLevel = 1;
const { data, theme } = defineProps({
  data: {
    type: String,
    required: true,
    default: '',
    theme: 'dark',
  },
  theme: {
    type: String,

  },
})
const stringifyHeading = function (node) {

  let stack = Array.isArray(node) ? node : [node]



  console.log(Object.prototype.toString.call(node));

  let result = ''

  console.log(node);


  return result

}


watchEffect(() => {
  getProcessor({
    plugins: [
      {
        rehype: (p) => p.use(() => (tree) => {
          let items: any[] = [];


          tree.children[0].children[0].children.filter(v => v.type === 'element').forEach((node) => {


            if (node.tagName[0] === 'h' && !!node.children.length) {
              const i = Number(node.tagName[1])
              console.log(i);

              minLevel = Math.min(minLevel, i)


              items.push({
                level: i,
                text: stringifyHeading(node),
              })
            }
          })

        }),
      },
    ],
  }).processSync(data);



})

watch(() => theme,
  (val: any) => {

    nextTick(() => val && setTheme(val))
  },
  { immediate: true })
const plugins = [
  gfm({ locale: pluginGfmZhHans }),
  align(),
  image(),

  changeTheme(),//引入代码高亮样式 这是主题样式
  changecodeTheme(),
  gemoji(),


  mermaid({
    locale: mermaidLocale,
  }),
  mediumZoom(),
  // Add more plugins here
];




</script>

<style scoped>
:deep(.markdown-body) {
  height: 100%;
  overflow: auto;
}
</style>
