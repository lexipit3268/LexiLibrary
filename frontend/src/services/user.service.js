import axios from 'axios'
const API_URL = 'http://localhost:3000/api/library/users/'

class UserService {
  async _handleRequest(request) {
    try {
      const response = await request
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message
      console.error('Lỗi API LexiLibrary:', message)
      throw error
    }
  }

  _getAuthHeader(token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    }
  }

  async getUsers(token) {
    return this._handleRequest(axios.get(API_URL, this._getAuthHeader(token)))
  }

  async getUserInfomation(token) {
    return this._handleRequest(axios.get(`${API_URL}me`, this._getAuthHeader(token)))
  }

  async uploadAvatar(file, token) {
    const formData = new FormData()
    formData.append('image', file)

    return this._handleRequest(
      axios.post(`${API_URL}upload-avatar`, formData, {
        headers: {
          ...this._getAuthHeader(token).headers,
          'Content-Type': 'multipart/form-data',
        },
      }),
    )
  }

  async updateUser(id, data, token) {
    return this._handleRequest(axios.post(`${API_URL}${id}`, data, this._getAuthHeader(token)))
  }
}

export default new UserService()
