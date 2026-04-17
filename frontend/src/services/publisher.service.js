import api from './api.service'
import handleRequest from '../utils/handleRequest'

const RESOURCE = '/library/publishers/'

class PublisherService {
  async getPublishers() {
    const result = await handleRequest(api.get(RESOURCE))
    return result.data
  }

  async createPublisher(payload) {
    const result = await handleRequest(api.post(RESOURCE, payload))
    return result.data
  }

  async updatePublisher(id, payload) {
    const result = await handleRequest(api.post(`${RESOURCE}${id}`, payload))
    return result.data
  }

  async deletePublisher(id) {
    const result = await handleRequest(api.delete(`${RESOURCE}${id}`))
    return result.data
  }
}

export default new PublisherService()
