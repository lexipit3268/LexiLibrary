import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueSplide from '@splidejs/vue-splide'
import './assets/index.css'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueImageZoomer from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css'

AOS.init({
  duration: 800,
  offset: 0,
})

const pinia = createPinia()
const app = createApp(App)
app.use(VueImageZoomer)
app.use(ElementPlus)
app.use(VueSplide)
app.use(pinia)
app.use(router)
app.mount('#app')
