import axios from 'axios'
const API_URL = 'http://localhost:3000/api/library/users/'

class UserService {
  // for Admin
  async getUsers() {
    try {
      const response = await axios.get(API_URL)
      return response.data
    } catch (error) {
      console.error('Lỗi lấy danh sách users:', error)
      return []
    }
  }

  async getUserInfomation(token) {
    try {
      const response = await axios.get(API_URL + 'me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Lỗi xác thực người dùng:', error.response?.data?.message || error.message)
      return null
    }
  }
}

export default new UserService()
