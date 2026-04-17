import api from './api.service'
import handleRequest from '../utils/handleRequest'

const RESOURCE = '/library/users/'

class UserService {
  async getUsers() {
    const result = await handleRequest(api.get(RESOURCE))
    return result.data
  }

  async getUserInfomation() {
    const result = await handleRequest(api.get(`${RESOURCE}me`))
    return result.data
  }

  async uploadAvatar(file) {
    const formData = new FormData()
    formData.append('image', file)

    const result = await handleRequest(
      api.post(`${RESOURCE}upload-avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    )
    return result.data
  }

  async updateUser(id, data) {
    const result = await handleRequest(api.post(`${RESOURCE}${id}`, data))
    return result.data
  }
}

export default new UserService()
