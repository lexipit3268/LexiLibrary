<template>
  <div
    class="flex flex-col w-52.5 h-fit gap-3 cursor-pointer"
    @click="router.push({ name: 'single-book', params: { id } })"
  >
    <div class="relative aspect-2/3 w-full overflow-hidden rounded-sm shadow-sm group">
      <img
        :src="
          image
            ? image
            : `https://placehold.co/400x600/d48c6a/FFF?font=Montserrat&text=Loading+image...`
        "
        :alt="title"
        loading="lazy"
        class="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-all duration-300"
      />
    </div>
    <div class="flex flex-col text-center gap-1">
      <h3 class="newsreaderFont text-xl">{{ title }}</h3>
      <p class="text-xs text-(--subtext-color)">{{ author }}</p>
      <p class="text-(--subtext-color)">${{ price }}</p>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const { id, title, author, price, image } = defineProps({
  id: String,
  title: String,
  author: String,
  price: Number,
  image: String,
})
</script>
