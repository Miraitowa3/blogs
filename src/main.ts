import "@/assets/css/tailwind.css";
import "@/assets/css/reset.css";
import "@/assets/fonts/iconfont.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.tsx'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
