import { defineStore } from 'pinia'
import { ref } from 'vue' // Cần import ref
import bookService from '@/services/book.service'
import publisherService from '@/services/publisher.service'
import userService from '@/services/user.service'
import categoryService from '@/services/category.service'

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
      const [booksRes, publishersRes, usersRes, categoryRes] = await Promise.all([
        bookService.getBooks(),
        publisherService.getPublishers(),
        userService.getUsers(),
        categoryService.getCategories(),
      ])

      books.value = booksRes
      publishers.value = publishersRes
      users.value = usersRes
      categories.value = categoryRes
    } catch (err) {
      error.value = 'Có lỗi xảy ra khi tải dữ liệu!'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  return { books, publishers, users, categories, isLoading, error, fetchAllData }
})
