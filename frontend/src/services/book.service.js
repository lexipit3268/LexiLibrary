import axios from 'axios'
const API_URL = 'http://localhost:3000/api/library/books/'
class BookService {
  async _handleRequest(request) {
    try {
      const response = await request
      return response.data
    } catch (error) {
      console.error('Lỗi API:', error)
      throw error
    }
  }

  async getBooks() {
    return this._handleRequest(axios.get(API_URL))
  }

  async getBooks(params = {}) {
    return this._handleRequest(axios.get(API_URL, { params }))
  }

  async getBook(maSach) {
    return this._handleRequest(axios.get(API_URL + maSach))
  }

  async getRelatedBooks(maTheLoai) {
    return this._handleRequest(axios.get(API_URL + `?category=` + maTheLoai))
  }

  async deleteBook(maSach) {
    return this._handleRequest(axios.delete(API_URL + maSach))
  }
}
export default new BookService()
