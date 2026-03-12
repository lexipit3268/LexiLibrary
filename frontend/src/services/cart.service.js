import axios from 'axios'
import handleRequest from '../../utils/handleRequest'
const API_URL = 'http://localhost:3000/api/library/carts/'

class CartService {
  async getCartById(maDocGia) {
    if (!maDocGia) {
      console.error('maDocGia bị trống ')
      return
    }
    const response = await handleRequest(axios.get(API_URL, { params: { maDocGia: maDocGia } }))
    return response.data
  }

  async addToCart(payload) {
    if (!payload.maDocGia || !payload.maSach) return null
    return await handleRequest(axios.post(`${API_URL}add`, payload))
  }

  async update(id, payload) {
    if (!id) return null
    return await handleRequest(axios.post(`${API_URL}${id}`, payload))
  }

  async removeItem(id) {
    if (!id) return null
    return await handleRequest(axios.delete(API_URL + id))
  }
}
export default new CartService()
