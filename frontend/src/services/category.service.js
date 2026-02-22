import axios from 'axios'
const API_URL = 'http://localhost:3000/api/library/categories/'

class CategoryService {
  async getCategories() {
    try {
      const response = await axios.get(API_URL)
      return response.data
    } catch (error) {
      console.error('Lỗi API:', error)
      return []
    }
  }
}

export default new CategoryService()
