<template>
  <div
    class="border border-gray-200 hover:border-(--secondary) p-4 hover:shadow-md group transition duration-300 place-items-center relative overflow-hidden h-full"
  >
    <!-- hover menu -->
    <div class="absolute top-6 right-0 z-10 flex flex-col gap-1">
      <div
        class="flex items-center justify-center bg-(--primary) border border-(--primary) hover:bg-white h-fit w-fit aspect-square text-lg opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-300"
      >
        <FontAwesomeIcon
          :icon="faHeart"
          class="h-full w-full p-3 text-white hover:text-(--primary) transition-all duration-200 cursor-pointer"
        />
      </div>
      <div
        class="flex items-center justify-center bg-(--primary) border border-(--primary) hover:bg-white h-fit w-fit aspect-square text-lg opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500"
        @click="handleAddToCart(id, title)"
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
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faCartPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const { id, title, author, price, image } = defineProps({
  id: String,
  title: String,
  author: String,
  price: Number,
  image: String,
})

const handleAddToCart = async (id, title) => {
  const maDocGia = authStore.user.code
  const response = await cartStore.addToCart({ maSach: id, maDocGia: maDocGia, soLuong: 1 })
  if (response.status == 200) {
    ElMessage.success(`Đã thêm sách "${title}" vào giỏ`)
  } else {
    ElMessage.error('Không thể thêm sách')
  }
}
</script>
