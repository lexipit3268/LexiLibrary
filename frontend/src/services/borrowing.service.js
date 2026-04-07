import api from './api.service'
import handleRequest from '../../utils/handleRequest'

const RESOURCE = '/library/borrowings/'

class BorrowingService {
  async getBorrowings() {
    const result = await handleRequest(api.get(RESOURCE))
    return result.data
  }

  async getBorrowingsById(maDocGia) {
    const result = await handleRequest(api.get(RESOURCE, { params: { maDocGia } }))
    return result.data
  }

  async findOne(id) {
    const result = await handleRequest(api.get(`${RESOURCE}${id}`))
    return result.data
  }

  // Tạo mới một phiếu mượn
  async create(payload) {
    // Giữ nguyên logic validation cơ bản của bạn
    if (!payload.maDocGia || !payload.maSach || !payload.ngayCanTra) return null

    const result = await handleRequest(api.post(RESOURCE, payload))
    return result.data
  }

  async update(maPhieu, payload) {
    if (!maPhieu || !payload.trangThai) return null
    const result = await handleRequest(api.post(`${RESOURCE}${maPhieu}`, payload))
    return result.data
  }
}

export default new BorrowingService()
