import { defineComponent, onMounted } from 'vue';
import MyViewer from '@/components/editor/viewer.vue';
import s from './index.module.css';

export default defineComponent({
  name: 'Viewer',

  setup() {
    let data = localStorage.getItem('content') ||'';
    let theme = localStorage.getItem('theme') || 'light';


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
        class={['overflow-hidden', 'h-full']}
      >
        <MyViewer data={data} theme={theme}></MyViewer>
      </div>
      </div>
    );
  }
});
