import axios from 'axios'
import handleRequest from '../../utils/handleRequest'
const API_URL = 'http://localhost:3000/api/library/categories/'

class CategoryService {
  async getCategories() {
    return (await handleRequest(axios.get(API_URL))).data
  }
}

export default new CategoryService()
