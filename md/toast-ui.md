```js
import { defineComponent, onMounted, ref } from 'vue';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import  "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
// Import prismjs
import Prism from 'prismjs';

import { Editor } from '@toast-ui/editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
export default defineComponent({
  setup() {
    const editorDom = ref();
    let editor = ref();

    onMounted(() => {
      editor.value = new Editor({
        el: editorDom.value,
        language: 'zh-CN',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '100%',
        viewer: true,
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
        // theme: 'dark'
      });
    });
    return () => (
      <main class={['w-full', 'h-[100vh]', 'overflow-hidden']}>

        <div ref={editorDom}></div>
      </main>
    );
  }
});

```
官网：https://github.com/nhn/tui.editor/
