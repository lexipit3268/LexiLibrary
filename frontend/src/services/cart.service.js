import axios from 'axios'
const API_URL = 'http://localhost:3000/api/library/carts'

class CartService {
  async _handleRequest(request) {
    try {
      const response = await request
      return response
    } catch (error) {
      console.error('Lỗi API:', error)
      throw error
    }
  }

  async getCartById(maDocGia) {
    if (!maDocGia) {
      console.error('maDocGia bị trống ')
      return
    }
    const response = await this._handleRequest(
      axios.get(API_URL, { params: { maDocGia: maDocGia } }),
    )
    return response.data
  }

  async addToCart(payload) {
    if (!payload.maDocGia || !payload.maSach) return null
    return await this._handleRequest(axios.post(`${API_URL}/add`, payload))
  }
}
export default new CartService()
