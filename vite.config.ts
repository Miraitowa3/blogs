import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteCompression({
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      threshold: 10240, //压缩前最小文件大小
      algorithm: 'gzip', //压缩算法
      ext: '.gz' //文件类型
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
