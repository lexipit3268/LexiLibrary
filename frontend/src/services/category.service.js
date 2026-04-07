import api from './api.service'
import handleRequest from '../../utils/handleRequest'
const RESOURCE = '/library/categories/'

class CategoryService {
  async getCategories() {
    const response = await handleRequest(api.get(RESOURCE))
    return response.data
  }
}

export default new CategoryService()
