<template>
  <div
    class="border border-gray-200 hover:border-(--secondary) p-4 hover:shadow-md group transition duration-300 place-items-center relative overflow-hidden h-full"
  >
    <!-- hover menu -->
    <div class="absolute top-6 right-0 z-10 flex flex-col gap-1">
      <ClickSpark
        spark-color="#9d674e"
        :spark-size="8"
        :spark-radius="20"
        :spark-count="8"
        :duration="600"
        easing="ease-out"
        :extra-scale="1.2"
        class="flex items-center justify-center bg-(--primary) border border-(--primary) hover:bg-white h-fit w-fit aspect-square text-lg opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-300"
      >
        <FontAwesomeIcon
          @click="handleAddToFavorite(id, title)"
          :icon="isFavorite ? faHeartSolid : faHeartRegular"
          class="h-full w-full p-3 text-white hover:text-(--primary) transition-all duration-200 cursor-pointer"
        />
      </ClickSpark>
      <div
        class="flex items-center justify-center bg-(--primary) border border-(--primary) hover:bg-white h-fit w-fit aspect-square text-lg opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500"
        @click="handleAddToCart(id, title)"
        v-if="quantity > 0"
      >
        <FontAwesomeIcon
          :icon="faCartPlus"
          class="h-full w-full p-3 text-white hover:text-(--primary) transition-all duration-200 cursor-pointer"
        />
      </div>

      <div
        class="flex items-center justify-center bg-(--primary) border border-(--primary) hover:bg-white h-fit w-fit aspect-square text-lg opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-700"
        @click="router.push(`/book/${id}`)"
      >
        <FontAwesomeIcon
          :icon="faArrowRight"
          class="h-full w-full p-3 text-white hover:text-(--primary) transition-all duration-200 cursor-pointer"
        />
      </div>
    </div>

    <!-- book -->
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
  </div>
</template>
<script setup>
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import {
  faCartPlus,
  faArrowRight,
  faHeartCircleCheck as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import { handleAddToCart, handleAddToFavorite } from '../utils/book.util'
import { computed, onMounted } from 'vue'
import { useFavoriteStore } from '@/stores/favorite'
import ClickSpark from './vuebits/ClickSpark/ClickSpark.vue'

const router = useRouter()
const favoriteStore = useFavoriteStore()

const { id, title, author, price, image } = defineProps({
  id: String,
  title: String,
  author: String,
  price: Number,
  image: String,
  quantity: Number,
})

const isFavorite = computed(() => favoriteStore.checkIsFavorite(id))

onMounted(async () => {
  await favoriteStore.fetchFavorite()
})
</script>
