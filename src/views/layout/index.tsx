import {  defineComponent, onMounted, ref, onUnmounted } from 'vue';
import styles from './index.module.css';
import HomeNav from './HomeNav/index';
import HomeContent from './HomeCont/index';
export default defineComponent({
  name: 'home',
  setup() {
    return () => (
      <div class={['overflow-y-auto', 'w-full', 'h-full', 'relative']} id="home">
        <HomeNav scrollDom="#home" />

        <HomeContent />
      </div>
    );
  }
});
