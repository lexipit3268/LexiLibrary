<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

const categories = [
  { name: 'Kinh tế', image: 'https://picsum.photos/id/1/400/250' },
  { name: 'Kỹ năng', image: 'https://picsum.photos/id/2/400/250' },
  { name: 'Văn học', image: 'https://picsum.photos/id/3/400/250' },
  { name: 'Ngoại ngữ', image: 'https://picsum.photos/id/4/400/250' },
  { name: 'Công nghệ', image: 'https://picsum.photos/id/5/400/250' },
  { name: 'Tâm lý', image: 'https://picsum.photos/id/6/400/250' },
]

const options = {
  type: 'loop',
  drag: 'free',
  focus: 0,
  arrows: false,
  pagination: false,
  autoWidth: true,
  start: 0,
  gap: '40px',
}
</script>

<template>
  <div class="w-full h-fit overflow-hidden cursor-e-resize">
    <Splide :options="options">
      <SplideSlide v-for="(cat, index) in categories" :key="index">
        <div
          class="category-card relative w-42.5 h-55 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 group"
        >
          <img
            class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
            :src="cat.image"
            :alt="cat.name"
          />
          <div
            class="overlay-text flex items-center justify-center p-5 absolute top-0 left-0 w-full h-full bg-black/20 transition-all duration-500 hover:bg-black/40 hover:backdrop-blur-xs"
          >
            <span class="text-white text-base uppercase font-semibold">{{ cat.name }}</span>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>
