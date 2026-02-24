import axios from 'axios'
const API_URL = 'http://localhost:3000/api/library/publishers/'

class PublisherService {
  async getPublishers() {
    try {
      const response = await axios.get(API_URL)
      return response.data
    } catch (error) {
      console.error('Lỗi API:', error)
      return []
    }
  }
}

export default new PublisherService()
