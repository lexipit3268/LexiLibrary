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

    return await handleRequest(api.post(`${RESOURCE}add`, payload))
  }

  async update(id, payload) {
    if (!id) return null

    return await handleRequest(api.post(`${RESOURCE}${id}`, payload))
  }

  async removeItem(id) {
    if (!id) return null

    return await handleRequest(api.delete(`${RESOURCE}${id}`))
  }

  async removeAllItem(maDocGia) {
    if (!maDocGia) return null

    return await handleRequest(api.delete(RESOURCE, { data: { maDocGia } }))
  }
}

export default new CartService()
