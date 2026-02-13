<template>
  <div class="hero-slider w-full h-fit overflow-hidden">
    <Splide :options="splideOptions" ref="splideRef">
      <SplideSlide v-for="(slide, index) in slides" :key="index">
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
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import AppLogo from '@/components/AppLogo.vue'
import { ElDivider } from 'element-plus'

const splideRef = ref(null)

const splideOptions = {
  type: 'fade',
  rewind: true,
  speed: 2000,
  interval: 4000,
  autoplay: true,
  arrows: false,
  pagination: true,
  pauseOnHover: false,
  pauseOnFocus: false,
  easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  intersection: {
    active: false,
  },
}

onMounted(() => {
  if (splideRef.value?.splide) {
    splideRef.value.splide.Components.Autoplay.play()
  }
})

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

:deep(.splide__pagination__page.is-active) {
  background: var(--primary);
}
</style>
