import { defineStore } from 'pinia'
import { ref } from 'vue'
import bookService from '@/services/book.service'
import publisherService from '@/services/publisher.service'
import userService from '@/services/user.service'
import categoryService from '@/services/category.service'
import borrowingService from '@/services/borrowing.service'

export const useStaffStore = defineStore('staff', () => {
  const books = ref([])
  const publishers = ref([])
  const users = ref([])
  const categories = ref([])
  const borrowings = ref([])

  const isLoading = ref(false)
  const error = ref(null)
  const fetchAllData = async () => {
    isLoading.value = true
    error.value = null
    try {
      const [booksRes, publishersRes, usersRes, categoryRes, borrowingsRes] = await Promise.all([
        bookService.getBooks(),
        publisherService.getPublishers(),
        userService.getUsers(),
        categoryService.getCategories(),
        borrowingService.getBorrowings(),
      ])

      books.value = booksRes
      publishers.value = publishersRes
      users.value = usersRes
      categories.value = categoryRes
      borrowings.value = borrowingsRes
    } catch (err) {
      error.value = 'Có lỗi xảy ra khi tải dữ liệu!'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const removeBook = async (maSach) => {
    try {
      await bookService.deleteBook(maSach)

      books.value = books.value.filter((b) => b.maSach !== maSach)

      return true
    } catch (error) {
      console.error('Lỗi khi xóa sách tại Store:', error)
      throw error
    }
  }

  const getCategoryStats = async () => {
    try {
      return await bookService.getByCategory()
    } catch (error) {
      console.error('Lỗi khi lấy sách theo thể loại', error)
      throw error
    }
  }

  return {
    books,
    publishers,
    users,
    categories,
    removeBook,
    isLoading,
    error,
    fetchAllData,
    getCategoryStats,
  }
})
