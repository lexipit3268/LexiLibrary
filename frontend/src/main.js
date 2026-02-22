import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueSplide from '@splidejs/vue-splide'
import './assets/index.css'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(VueSplide)
app.use(pinia)
app.use(router)
app.mount('#app')
