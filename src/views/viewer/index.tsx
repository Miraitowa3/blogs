import { defineComponent, onMounted } from 'vue';
import MyViewer from '@/components/editor/viewer.vue';
import s from './index.module.css';

export default defineComponent({
  name: 'Viewer',

  setup() {
    let data = localStorage.getItem('content');
    let theme = localStorage.getItem('theme');


    onMounted(async () => {
      // let css = await import('juejin-markdown-themes/dist/channing-cyan');

      // let markdownThemeStyleElement = document.querySelector('#markdownTheme');
      // if (markdownThemeStyleElement) {
      //   markdownThemeStyleElement.innerHTML = css.default;
      // } else {
      //   // // ('创建style标签')
      //   markdownThemeStyleElement = document.createElement('style');
      //   markdownThemeStyleElement.id = 'markdownTheme';
      //   markdownThemeStyleElement.innerHTML = css.default;
      //   document.head.appendChild(markdownThemeStyleElement);
      // }
    });
    return () => (
      <div class={[s.cont, 'h-full',]}>
        <div
        class={[
         s.viewer,
          'h-full',
          'overflow-auto',
          'w-[900px]',
          'bg-white',
          'pt-[30px]',
          'pt-[30px]',
          'pl-[40px]',
          'pr-[40px]',
          'ml-auto',
          'mr-auto'
        ]}
      >
        <MyViewer data={data} theme={theme}></MyViewer>
      </div>
      </div>
    );
  }
});
