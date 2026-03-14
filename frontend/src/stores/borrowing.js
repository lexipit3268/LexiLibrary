import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import borrowingService from '@/services/borrowing.service'

export const useBorrowingStore = defineStore('borrowing', () => {
  const borrowings = ref([])
  const isLoading = ref(false)

  const activeCount = computed(() => {
    return borrowings.value
      .filter((b) => ['DangCho', 'DaDuyet', 'DangMuon'].includes(b.trangThai))
      .reduce((total, item) => total + item.soLuong, 0)
  })

  const fetchBorrowings = async (maDocGia) => {
    isLoading.value = true
    try {
      const res = await borrowingService.getBorrowingsById(maDocGia)
      borrowings.value = res || []
    } finally {
      isLoading.value = false
    }
  }

  const updateStatus = async (maPhieu, payload) => {
    try {
      const response = await borrowingService.update(maPhieu, { trangThai: payload.trangThai })
      if (response) {
        await fetchBorrowings(payload.maDocGia)
      }
      return response
    } catch (error) {
      console.log('Lỗi khi cập nhật: ' + error)
    }
  }

  const resetBorrowingsWhenLogout = () => {
    borrowings.value = []
  }

  return {
    borrowings,
    isLoading,
    activeCount,
    fetchBorrowings,
    updateStatus,
    resetBorrowingsWhenLogout,
  }
})
