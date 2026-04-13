import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { ElMessageBox } from 'element-plus'
import router from '@/router'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token || localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (!window.isLogoutAlertShown) {
        window.isLogoutAlertShown = true

        try {
          await ElMessageBox.alert(
            'Phiên đăng nhập đã hết hạn hoặc token không hợp lệ. Vui lòng đăng nhập lại.',
            'Hết hạn phiên làm việc',
            {
              confirmButtonText: 'OK',
              type: 'warning',
            },
          ).then(() => {
            authStore.logout()
            window.isLogoutAlertShown = false
            router.push('/login')
            console.clear()
          })
        } catch (err) {
          authStore.logout()
          window.isLogoutAlertShown = false
          router.push('/login')
        }
      }
    }

    return Promise.reject(error)
  },
)

export default api
