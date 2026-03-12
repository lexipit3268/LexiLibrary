import axios from 'axios'
import handleRequest from '../../utils/handleRequest'
const API_URL = 'http://localhost:3000/api/library/publishers/'

class PublisherService {
  async getPublishers() {
    const result = await handleRequest(axios.get(API_URL))
    return result.data
  }

  async createPublisher(payload) {
    const result = await handleRequest(axios.post(API_URL, payload))
    return result.data
  }

  async updatePublisher(id, payload) {
    const result = await handleRequest(axios.post(API_URL + id, payload))
    return result.data
  }

  async deletePublisher(id) {
    const result = await handleRequest(axios.delete(API_URL + id))
    return result.data
  }
}

export default new PublisherService()
