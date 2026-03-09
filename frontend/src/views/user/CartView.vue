<template>
  <BreadcrumbComponent
    title="Giỏ hàng"
    :paths="[
      { label: 'Trang chủ', path: '/' },
      { label: 'Giỏ hàng', path: '/cart' },
    ]"
  />

  <div v-if="cartItems.length > 0" class="px-18 py-20">
    {{ cartItems }}
    <button class="primary-btn" @click="addToCart">test</button>
  </div>
  <div v-else>trống</div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue'
import cartService from '@/services/cart.service'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const cartItems = ref('null')

const addToCart = async () => {
  const response = await cartService.addToCart({
    maDocGia: 'DG20260001',
    maSach: 'S27',
    soLuong: '1',
  })
  console.log(response)
}

onMounted(async () => {
  const user = authStore.user
  cartItems.value = await cartService.getCartById(user.code)
})
</script>
