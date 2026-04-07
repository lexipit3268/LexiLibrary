import api from './api.service'
import handleRequest from '../../utils/handleRequest'

const RESOURCE = '/library/carts/'

class CartService {
  async getCartById(maDocGia) {
    if (!maDocGia) {
      console.error('maDocGia bị trống')
      return
    }
    const response = await handleRequest(api.get(RESOURCE, { params: { maDocGia } }))
    return response.data
  }

  async addToCart(payload) {
    if (!payload.maDocGia || !payload.maSach) return null

    const response = await handleRequest(api.post(`${RESOURCE}add`, payload))
    return response.data
  }

  async update(id, payload) {
    if (!id) return null

    const response = await handleRequest(api.post(`${RESOURCE}${id}`, payload))
    return response.data
  }

  async removeItem(id) {
    if (!id) return null

    const response = await handleRequest(api.delete(`${RESOURCE}${id}`))
    return response.data
  }

  async removeAllItem(maDocGia) {
    if (!maDocGia) return null

    const response = await handleRequest(api.delete(RESOURCE, { data: { maDocGia } }))
    return response.data
  }
}

export default new CartService()
