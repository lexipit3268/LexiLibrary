import axios from 'axios'
const API_URL = 'http://localhost:3000/api/library/books/'
class BookService {
  async getBooks() {
    try {
      const response = await axios.get(API_URL)
      return response.data
    } catch (error) {
      console.error('Lỗi API:', error)
      return []
    }
  }

  async getBook(maSach) {
    try {
      const response = await axios.get(API_URL + maSach)
      return response.data
    } catch (error) {
      console.error('Lỗi API:', error)
      return {}
    }
  }

  async getRelatedBooks(maTheLoai) {
    try {
      const response = await axios.get(API_URL + `?category=` + maTheLoai)
      return response.data
    } catch (error) {
      console.error('Lỗi API:', error)
      return {}
    }
  }
}
export default new BookService()
