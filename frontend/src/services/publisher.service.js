import axios from 'axios'
const API_URL = 'http://localhost:3000/api/library/publishers/'

class PublisherService {
  async _handleRequest(request) {
    try {
      const response = await request
      return response.data
    } catch (error) {
      console.error('Lỗi API:', error)
      throw error
    }
  }

  getPublishers() {
    return this._handleRequest(axios.get(API_URL))
  }

  createPublisher(payload) {
    return this._handleRequest(axios.post(API_URL, payload))
  }

  updatePublisher(id, payload) {
    return this._handleRequest(axios.post(API_URL + id, payload))
  }

  deletePublisher(id) {
    return this._handleRequest(axios.delete(API_URL + id))
  }
}

export default new PublisherService()
