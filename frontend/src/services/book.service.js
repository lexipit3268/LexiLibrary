import axios from 'axios'
import handleRequest from '../../utils/handleRequest'
const API_URL = 'http://localhost:3000/api/library/books/'
class BookService {
  async getBooks(params = {}) {
    const result = await handleRequest(axios.get(API_URL, { params }))
    return result.data
  }

  async getBook(maSach) {
    const result = await handleRequest(axios.get(API_URL + maSach))
    return result.data
  }

  async getRelatedBooks(maTheLoai) {
    const result = await handleRequest(axios.get(API_URL + `?category=` + maTheLoai))
    return result.data
  }

  async uploadBookCover(file) {
    const formData = new FormData()
    formData.append('image', file)
    const result = await handleRequest(axios.post(API_URL + 'upload-cover', formData))
    return result.data
  }

  async createBook(payload) {
    return await handleRequest(axios.post(API_URL, payload))
  }

  async updateBook(maSach, payload) {
    return await handleRequest(axios.post(API_URL + maSach, payload))
  }

  async deleteBook(maSach) {
    return await handleRequest(axios.delete(API_URL + maSach))
  }
}
export default new BookService()
