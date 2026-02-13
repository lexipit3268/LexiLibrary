<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import '@splidejs/vue-splide/css'

const brands = [
  { name: 'Logo CTU', src: '../../public/brands/logoctu.png' },
  {
    name: 'Logo Marvel',
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg',
  },
  { name: 'Logo 1', src: '../../public/brands/logo1.svg' },
  { name: 'Logo 2', src: '../../public/brands/logo2.svg' },
  { name: 'Logo 3', src: '../../public/brands/logo3.svg' },
  { name: 'Logo 4', src: '../../public/brands/logo4.svg' },
  { name: 'Logo 5', src: '../../public/brands/logo5.svg' },
  { name: 'Logo 6', src: '../../public/brands/logo6.svg' },
]

const splideOptions = {
  type: 'loop',
  drag: 'free',
  focus: 'center',
  arrows: false,
  pagination: false,
  autoWidth: true,
  gap: '60px',
  autoScroll: {
    speed: 0.6,
    pauseOnHover: true,
  },
  breakpoints: {
    768: {
      gap: '40px',
    },
    480: {
      gap: '30px',
    },
  },
}
</script>

<template>
  <div class="brands-section w-full py-5 bg-white">
    <div class="fade-mask">
      <Splide :options="splideOptions" :extensions="{ AutoScroll }">
        <SplideSlide v-for="(brand, index) in brands" :key="index">
          <div class="logo-box flex items-center py-2.5 relative">
            <img
              :src="brand.src"
              :alt="brand.name"
              class="h-8 w-auto grayscale-100 opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out"
            />
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<style scoped>
.fade-mask {
  width: 100%;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.logo-box::after {
  content: '';
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 30px;
  background-color: #e0e0e0;
}

:deep(.splide__list) {
  transition-timing-function: linear !important;
}
</style>
