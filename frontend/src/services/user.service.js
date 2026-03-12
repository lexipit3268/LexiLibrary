import axios from 'axios'
import handleRequest from '../../utils/handleRequest'
const API_URL = 'http://localhost:3000/api/library/users/'

class UserService {
  _getAuthHeader(token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    }
  }

  async getUsers(token) {
    const result = await handleRequest(axios.get(API_URL, this._getAuthHeader(token)))
    return result.data
  }

  async getUserInfomation(token) {
    const result = await handleRequest(axios.get(`${API_URL}me`, this._getAuthHeader(token)))
    return result.data
  }

  async uploadAvatar(file, token) {
    const formData = new FormData()
    formData.append('image', file)

    const result = await handleRequest(
      axios.post(`${API_URL}upload-avatar`, formData, {
        headers: {
          ...this._getAuthHeader(token).headers,
          'Content-Type': 'multipart/form-data',
        },
      }),
    )
    return result.data
  }

  async updateUser(id, data, token) {
    const result = await handleRequest(
      axios.post(`${API_URL}${id}`, data, this._getAuthHeader(token)),
    )
    return result.data
  }
}

export default new UserService()
