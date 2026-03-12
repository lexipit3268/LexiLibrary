import axios from 'axios'
import handleRequest from '../../utils/handleRequest'
const API_URL = 'http://localhost:3000/api/library/borrowings/'

class BorrowingService {
  async getBorrowings() {
    const result = await handleRequest(axios.get(API_URL))
    return result.data
  }

  async getBorrowingsById(maDocGia) {
    const result = await handleRequest(axios.get(API_URL, { params: { maDocGia: maDocGia } }))
    return result.data
  }

  async findOne(id) {
    const result = await handleRequest(axios.get(API_URL`/${id}`))
    return result.data
  }

  async create(payload) {
    if (!payload.maDocGia || !payload.maSach || !payload.ngayCanTra) return null
    const result = await handleRequest(axios.post(API_URL, payload))
    return result.data
  }

  async update(payload) {
    if (!payload.maPhieu || !payload.trangThai) return null
    const result = await handleRequest(axios.post(API_URL + `/${payload.maPhieu}`, payload))
    return result.data
  }
}

export default new BorrowingService()
