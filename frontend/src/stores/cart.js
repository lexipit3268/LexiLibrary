import { defineStore } from 'pinia'
import cartService from '@/services/cart.service'
import { computed, ref } from 'vue'
export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  const fetchCart = async (maDocGia) => {
    if (!maDocGia) return
    try {
      const response = await cartService.getCartById(maDocGia)
      cartItems.value = response || []
    } catch (error) {
      console.log('Lỗi khi tải giỏ hàng: ' + error)
    }
  }

  const addToCart = async (payload) => {
    if (!payload) return
    try {
      const response = await cartService.addToCart(payload)
      if (response) {
        await fetchCart(payload.maDocGia)
      }
      return response
    } catch (error) {
      console.log('Lỗi khi thêm vào giỏ: ' + error)
    }
  }

  const totalQuantity = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return (total += Number(item.soLuong) || 0)
    }, 0)
  })

  const resetCart = () => {
    cartItems.value = []
  }

  return { cartItems, totalQuantity, fetchCart, addToCart, resetCart }
})
