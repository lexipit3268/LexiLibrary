import api from './api.service'
import handleRequest from '../../utils/handleRequest'

const RESOURCE = '/library/books/'

class BookService {
  async getBooks(params = {}) {
    const response = await handleRequest(api.get(RESOURCE, { params }))
    return response.data
  }

  async getBook(maSach) {
    const response = await handleRequest(api.get(`${RESOURCE}${maSach}`))
    return response.data
  }

  async getRelatedBooks(maTheLoai) {
    const response = await handleRequest(api.get(RESOURCE, { params: { category: maTheLoai } }))
    return response.data
  }

  async uploadBookCover(file) {
    const formData = new FormData()
    formData.append('image', file)
    const result = await handleRequest(
      api.post(`${RESOURCE}upload-cover`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    )
    return result.data
  }

  async createBook(payload) {
    return await handleRequest(api.post(RESOURCE, payload))
  }

  async updateBook(maSach, payload) {
    return await handleRequest(api.post(`${RESOURCE}${maSach}`, payload))
  }

  async deleteBook(maSach) {
    return await handleRequest(api.delete(`${RESOURCE}${maSach}`))
  }

  async getByCategory() {
    const result = await handleRequest(api.get(`${RESOURCE}get-by-category`))
    return result.data
  }
}

export default new BookService()
