<template>
  <div>
    <LoadingComponent v-if="isLoading" />

    <div class="max-w-xl mx-auto bg-white border border-(--bg-secondary) shadow-sm p-10 md:p-16">
      <div class="text-center mb-12">
        <h2
          class="text-4xl text-(--primary) mb-4 select-none"
          style="font-family: 'Newsreader', serif"
        >
          Đổi mật khẩu
        </h2>
      </div>

      <div class="space-y-6">
        <div class="flex flex-col gap-2">
          <label class="text-[10px] uppercase tracking-wider font-bold text-(--subtext-color)">
            Mật khẩu mới
          </label>
          <div class="relative group">
            <input
              type="password"
              v-model="form.newPassword"
              placeholder="••••••••"
              class="w-full bg-transparent border-b border-(--bg-secondary) py-2 text-base outline-none transition-colors focus:border-(--primary)"
            />
            <div
              class="absolute bottom-0 left-0 h-[1.5px] bg-(--primary) w-0 group-focus-within:w-full transition-all duration-500"
            ></div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[10px] uppercase tracking-wider font-bold text-(--subtext-color)">
            Xác nhận lại
          </label>
          <div class="relative group">
            <input
              type="password"
              v-model="form.confirmPassword"
              placeholder="••••••••"
              class="w-full bg-transparent border-b border-(--bg-secondary) py-2 text-base outline-none transition-colors focus:border-(--primary)"
            />
            <div
              class="absolute bottom-0 left-0 h-[1.5px] bg-(--primary) w-0 group-focus-within:w-full transition-all duration-500"
            ></div>
          </div>
        </div>

        <div class="pt-8 flex flex-col gap-4">
          <button
            @click="handleUpdatePassword"
            class="primary-btn w-full py-4 text-[12px] font-bold uppercase tracking-wider shadow-sm active:scale-[0.98]"
            :disabled="isLoading"
          >
            <FontAwesomeIcon icon="save" />
            Cập nhật mật khẩu
          </button>

          <button @click="$router.back()" class="secondary-btn">Quay lại trang trước</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import userService from '@/services/user.service'
import LoadingComponent from '@/components/LoadingComponent.vue'

library.add(faSave)

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)

const form = reactive({
  newPassword: '',
  confirmPassword: '',
})

const user = ref({})

const fetchUserData = async () => {
  try {
    const token = authStore.token
    if (!token) return

    const detailData = await userService.getUserInfomation(token)

    if (detailData) {
      user.value = detailData
    }
  } catch (error) {
    ElMessage.error('Không thể lấy thông tin người')
    console.error(error)
  }
}

const handleUpdatePassword = async () => {
  if (!form.newPassword || !form.confirmPassword) {
    ElMessage.warning('Vui lòng nhập đầy đủ thông tin')
    return
  }

  if (form.newPassword.length < 6) {
    ElMessage.warning('Mật khẩu tối thiểu phải 6 ký tự')
    return
  }

  if (form.newPassword !== form.confirmPassword) {
    ElMessage.error('Mật khẩu xác nhận không trùng khớp')
    return
  }

  try {
    isLoading.value = true

    await fetchUserData()

    const userId = authStore.user?.code || authStore.user?.maDocGia

    if (!userId) {
      throw new Error('Không tìm thấy thông tin định danh người dùng')
    }

    const payload = {
      ...user.value,
      matKhau: form.newPassword,
    }

    await userService.updateUser(userId, payload, authStore.token)

    ElMessage.success('Mật khẩu của bạn đã được thay đổi')
    router.push('/me')
  } catch (error) {
    console.error('Lỗi cập nhật mật khẩu:', error)
    ElMessage.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchUserData)
</script>

<style scoped>
input::placeholder {
  color: #d1d5db;
  font-style: italic;
  font-size: 13px;
}
</style>
