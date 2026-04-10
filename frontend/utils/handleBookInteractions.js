import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useFavoriteStore } from '@/stores/favorite'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const favoriteStore = useFavoriteStore()

export const handleAddToCart = async (id, title, quantity) => {
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
  let soLuong = 1
  if (quantity) soLuong = quantity

  const response = await cartStore.addToCart({ maSach: id, maDocGia: maDocGia, soLuong: soLuong })
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

export const handleAddToFavorite = async (id, title) => {
  if (!authStore.isLoggedIn) {
    ElMessageBox.confirm('Vui lòng đăng nhập để lưu sách yêu thích', 'Yêu cầu đăng nhập', {
      confirmButtonText: 'Đăng nhập',
      cancelButtonText: 'Hủy',
    }).then(() => router.push('/login'))
    return
  }

  if (authStore.user.role === 'staff') {
    ElMessageBox.alert(
      'Chỉ người dùng thông thường mới có thể thực hiện chức năng này',
      'Quyền truy cập bị từ chối',
    )
    return
  }

  try {
    const res = await favoriteStore.toggleFavorite(id)
    if (res.action === 'added') {
      ElMessage.success({ message: `Đã thêm "${title}" vào danh sách yêu thích`, offset: 100 })
    } else {
      ElMessage.info({ message: `Đã xóa "${title}" khỏi danh sách yêu thích`, offset: 100 })
    }
  } catch (error) {
    ElMessage.error('Không thể thực hiện thao tác này')
  }
}
