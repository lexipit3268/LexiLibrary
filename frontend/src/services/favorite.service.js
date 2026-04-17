import api from './api.service'
import handleRequest from '../utils/handleRequest'

const RESOURCE = '/library/favorites/'

class FavoriteService {
  async getFavorites() {
    const response = await handleRequest(api.get(RESOURCE))
    return response.data
  }

  async createFavorite(maSach) {
    if (!maSach) return null
    return await handleRequest(api.post(RESOURCE, { maSach: maSach }))
  }

  async delete(id) {
    return await handleRequest(api.delete(RESOURCE + id))
  }

  async deleteAll() {
    return await handleRequest(api.delete(RESOURCE))
  }
}

export default new FavoriteService()
