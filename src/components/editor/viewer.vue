<template>
  <div class="view">

    <div :class="[


      'w-[750px]',
      'bg-white',
      'pt-[30px]',
      'pt-[30px]',
      'pl-[40px]',
      'pr-[40px]',
      'ml-auto',
      'mr-auto'
    ]">
      <Viewer :value="data" :plugins="plugins"></Viewer>

    </div>
    <div class="fixed right-16 top-14 w-80 rounded-lg mb-5 bg-white h-4/5 overflow-y-auto">
      <div class="mulu-top ml-5 mr-5 h-14 leading-[56px] text-base 	border-[#e4e6eb] border-solid border-b-[1px]">
        目录
      </div>
      <ul class="mulu-content   flex flex-col mt-3 relative" @click="changeActive">
        <li class="absolute top-0 left-0 w-[3px] h-[14px] bg-[#1E80FF] "
          :style="{ 'top': cur * 36 + 11 + 'px', 'transition': 'all 0.3s ease' }"></li>
        <li v-for="(item, $index) in mulu" class="mulu-item  h-9 fl"
          :style="{ 'padding-left': (item.level - minLevel + 1) * 16 + 'px' }"><a :index="$index"
            :href="'#head-' + $index"
            :class="['block', 'pl-2', 'h-full', ' leading-9', 'text-[#515767]', 'text-sm]', cur === $index ? 'active' : '']">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch, nextTick, watchEffect, ref, onMounted } from "vue";
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
let minLevel = ref(100)
let mulu = ref()
let cur = ref(0)
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
const changeActive = function (e: MouseEvent) {
  if (e.target && (e.target as HTMLAnchorElement).nodeName === 'A') {
    e.preventDefault();
    cur.value = (e.target as HTMLAnchorElement).getAttribute('index') as any * 1;


    let targetId = (e.target as HTMLAnchorElement).getAttribute('href');
    const targetElement = document.querySelector(targetId as any);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }

}
const stringifyHeading = function (node) {

  let stack = Array.isArray(node) ? node : [node]
  let result = null
  while (stack.length) {
    const node = stack.shift()

    if (node.type === 'text') {

      result = node.value
      break;
    }
    for (let i = 0; i <= node.children.length - 1; i++) {
      stack.push(node.children[i]);
    }

  }
  return result

}
function debounce(func, delay) {
  let timeout;

  return function (...args) {
    const context = this;

    // 清除之前的定时器
    clearTimeout(timeout);

    // 设置新的定时器
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
onMounted(() => {


  let markdownBody = document.querySelector('.markdown-body')
  let nodes = markdownBody?.querySelectorAll('h1, h2, h3, h4, h5, h6');
  document.querySelector('.view')!.addEventListener('scroll', function (e) {
    //需要使用防抖优化！！！！！！！！！！！！！！
    nodes?.forEach((node, index) => {
      if (node.nodeName[0] === 'H') {

        let top = (node as HTMLElement).offsetTop - this.scrollTop
        if (top < 120) {
          cur.value = index
        }

      }
    });

  })
  nodes?.forEach((node, index) => {
    if (node.nodeName[0] === 'H') {
      (node as HTMLElement).setAttribute('id', `head-${index}`);
    }
  });
  (document.querySelector('.mulu-content') as any).addEventListener('click', changeActive)
})
watchEffect(() => {
  getProcessor({
    plugins: [
      {
        rehype: (p) => p.use(() => (tree) => {
          let items: any[] = [];
          tree.children.filter(v => v.type === 'element').forEach((node) => {
            if (node.tagName[0] === 'h' && !!node.children.length) {
              const i = Number(node.tagName[1])
              minLevel.value = Math.min(minLevel.value, i)
              items.push({
                level: i,
                text: stringifyHeading(node),
              })
            }
          })
          mulu.value = items


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
  /* overflow: auto; */

}

.active {
  color: #1E80FF;
}

.view {
  height: 100%;
  overflow-y: auto;
}
</style>
