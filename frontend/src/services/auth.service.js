import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/library/'

class AuthService {
  register(payload) {
    return axios.post(BASE_URL + 'users/register', payload)
  }

  login(payload) {
    const endpoint = payload.email.endsWith('@lexilibrary.com') ? 'staffs/login' : 'users/login'

    return axios.post(BASE_URL + endpoint, payload)
  }
}

export default new AuthService()
