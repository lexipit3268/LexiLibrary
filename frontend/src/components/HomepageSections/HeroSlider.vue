<template>
  <div class="hero-slider w-full h-fit overflow-hidden">
    <ElCarousel trigger="click" height="480px" interval="4000" autoplay>
      <ElCarousel-item v-for="(slide, index) in slides" :key="index">
        <div
          class="slide-content"
          :style="{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
          }"
        >
          <div class="overlay-text flex flex-col items-center h-full p-10 justify-end w-2/3">
            <AppLogo class="w-12 my-2"></AppLogo>
            <h2 class="quote-text text-white text-4xl px-4 my-4">“{{ slide.quote }}”</h2>
            <ElDivider class="w-[10%]! my-2!"></ElDivider>
            <button class="primary-btn w-fit px-6 py-2 rounded-lg my-2">
              <router-link to="/book">Tìm sách ngay</router-link>
            </button>
            <p class="text-white text-sm opacity-80 mt-2">
              Cùng hơn 2.000 độc giả lật mở những giá trị vĩnh cửu.
            </p>
          </div>
        </div>
      </ElCarousel-item>
    </ElCarousel>
  </div>
</template>

<script setup>
import '@splidejs/vue-splide/css'
import AppLogo from '@/components/AppLogo.vue'
import { ElCarousel, ElDivider } from 'element-plus'
const slides = [
  {
    image:
      'https://images.pexels.com/photos/19015215/pexels-photo-19015215.jpeg?auto=compress&cs=tinysrgb&w=1260',
    quote: 'Sách khơi nguồn cảm hứng, chuyện động mãi tâm tư',
  },
  {
    image:
      'https://images.pexels.com/photos/5634667/pexels-photo-5634667.jpeg?auto=compress&cs=tinysrgb&w=1260',
    quote: 'Lật mở từng trang sách, chạm tới những ước mơ',
  },
]
</script>

<style scoped>
.slide-content {
  height: 480px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.overlay-text {
  max-width: 800px;
  color: white;
}

:deep(.el-carousel__arrow) {
  background-color: var(--secondary);
  border-radius: 0;
}
</style>
