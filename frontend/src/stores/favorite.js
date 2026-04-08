import { defineStore } from 'pinia'
import favoriteService from '@/services/favorite.service'
import { ref } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteItems = ref([])

  const fetchFavorite = async () => {
    try {
      const response = await favoriteService.getFavorites()
      favoriteItems.value = response || []
    } catch (error) {
      console.error('Lỗi khi tải danh sách yêu thích:', error)
    }
  }

  const checkIsFavorite = (maSach) => {
    return favoriteItems.value.some((fav) => fav.maSach === maSach)
  }

  const toggleFavorite = async (maSach) => {
    const existFav = favoriteItems.value.find((fav) => fav.maSach === maSach)
    try {
      if (existFav) {
        await favoriteService.delete(existFav._id)
        favoriteItems.value = favoriteItems.value.filter((item) => item._id !== existFav._id)
        await fetchFavorite()
        return { action: 'removed' }
      } else {
        await favoriteService.createFavorite(maSach)
        await fetchFavorite()
        return { action: 'added' }
      }
    } catch (error) {
      console.error('Lỗi toggle favorite:', error)
      throw error
    }
  }

  return { favoriteItems, fetchFavorite, checkIsFavorite, toggleFavorite }
})
