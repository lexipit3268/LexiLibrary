<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import CategoryService from '@/services/category.service'
import { onMounted, ref } from 'vue'
const categories = ref([])

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

onMounted(async () => {
  const data = await CategoryService.getCategories()
  categories.value = data
})
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
            :src="`https://picsum.photos/id/${index * 2 + 111}/400/550`"
            :alt="cat.tenTheLoai"
          />
          <div
            class="overlay-text flex items-center justify-center p-5 absolute top-0 left-0 w-full h-full bg-black/20 transition-all duration-500 hover:bg-black/40 hover:backdrop-blur-xs"
          >
            <router-link
              :to="{
                path: '/book',
                query: { category: cat.tenTheLoai },
              }"
              class="flex items-center justify-center w-full h-full text-center"
            >
              <span class="text-white text-base uppercase font-semibold">{{ cat.tenTheLoai }}</span>
            </router-link>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>
