<template>
  <div class="flex flex-col w-52.5 h-fit gap-3 cursor-e-resize">
    <div class="relative aspect-2/3 w-full overflow-hidden rounded-sm shadow-sm">
      <img
        :src="image"
        :alt="title"
        loading="lazy"
        class="w-full h-full object-cover cursor-pointer"
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
const { title, author, price, image } = defineProps({
  title: String,
  author: String,
  price: Number,
  image: String,
})
</script>
