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

  const createBorrowing = async (payload) => {
    try {
      const res = await borrowingService.create(payload)
      return res
    } catch (error) {
      console.log('Lỗi khi tạo: ' + error)
      return null
    }
  }

  const updateStatus = async (maPhieu, payload) => {
    try {
      const response = await borrowingService.update(maPhieu, payload)
      if (response) {
        if (payload.maDocGia) {
          await fetchBorrowings(payload.maDocGia)
        } else {
          await fetchBorrowings()
        }
      }
      return response
    } catch (error) {
      console.log('Lỗi khi cập nhật: ' + error)
      return null
    }
  }

  const resetBorrowingsWhenLogout = () => {
    borrowings.value = []
  }

  const getStatusStats = async () => {
    try {
      return await borrowingService.getByStatus()
    } catch (error) {
      console.log('Lỗi khi lấy tống kết phiếu mượn theo trạng thái: ' + error)
    }
  }

  return {
    borrowings,
    isLoading,
    activeCount,
    fetchBorrowings,
    updateStatus,
    resetBorrowingsWhenLogout,
    getStatusStats,
    createBorrowing,
  }
})
