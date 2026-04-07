import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const handleAddToCart = async (id, title) => {
  if (!authStore.isLoggedIn) {
    ElMessageBox.confirm(`Vui lòng đăng nhập để thực hiện chức năng này`, 'Yêu cầu đăng nhập', {
      confirmButtonText: 'Đăng nhập',
      cancelButtonText: 'Hủy bỏ',
    }).then(() => router.push('/login'))
    return
  }

  if (authStore.userRole !== 'user') {
    ElMessageBox.alert(
      'Chỉ người dùng thông thường mới có thể mượn sách.',
      'Quyền truy cập bị từ chối',
    )
    return
  }

  const maDocGia = authStore.user.code
  const response = await cartStore.addToCart({ maSach: id, maDocGia: maDocGia, soLuong: 1 })
  if (response.status == 200) {
    ElMessage({
      message: `Đã thêm sách "${title}" vào giỏ`,
      type: 'success',
      offset: 100,
    })
  } else {
    ElMessage({
      message: 'Không thể thêm sách',
      type: 'error',
      offset: 100,
    })
  }
}

export default handleAddToCart
