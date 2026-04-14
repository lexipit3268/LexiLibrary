<template>
  <LoadingComponent v-if="isLoading"></LoadingComponent>
  <div class="max-w-4xl mx-auto bg-white border border-(--bg-secondary) shadow-sm overflow-hidden">
    <div class="relative h-56 bg-(--bg-quaternary) flex justify-center">
      <div class="absolute -bottom-20">
        <div class="relative group">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarChange"
            accept="image/*"
          >
            <div class="relative group cursor-pointer">
              <div
                class="overflow-hidden w-60 h-60 rounded-full border-4 border-white shadow-md bg-white"
              >
                <img
                  :src="
                    user.hinhAnh ||
                    'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg'
                  "
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  class="absolute inset-0 rounded-full bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FontAwesomeIcon icon="camera" class="text-white text-2xl mb-2" />
                  <span class="text-white text-[10px] uppercase font-bold tracking-widest"
                    >Thay đổi ảnh</span
                  >
                </div>
              </div>
            </div>
          </el-upload>
        </div>
      </div>
    </div>

    <div class="pt-24 pb-16 px-10 md:px-20 text-center">
      <div class="flex flex-col md:flex-row justify-center gap-2 mb-3">
        <div
          class="flex flex-col border-b border-(--bg-secondary) focus-within:border-(--primary) transition-all duration-300 py-1"
        >
          <label
            class="text-[10px] uppercase tracking-widest text-(--subtext-color) font-bold mb-1"
          >
            Họ và chữ lót
          </label>
          <input
            v-model="user.hoLot"
            placeholder="Nhập họ lót..."
            class="LexiLibrary text-center text-(--primary) bg-transparent outline-none w-full min-w-0 leading-20"
          />
        </div>
        <div
          class="flex flex-col border-b border-(--bg-secondary) focus-within:border-(--primary) transition-all duration-300 py-1"
        >
          <label
            class="text-[10px] uppercase tracking-widest text-(--subtext-color) font-bold mb-1"
          >
            Tên gọi
          </label>
          <input
            v-model="user.ten"
            placeholder="Tên..."
            class="LexiLibrary text-center text-(--primary) bg-transparent outline-none w-full min-w-0 leading-20"
          />
        </div>
      </div>

      <div class="inline-block px-5 py-1 rounded-full bg-(--bg-primary) border border-(--primary)">
        <span class="text-[10px] font-bold uppercase tracking-widest text-(--secondary)">
          {{ user.role === 'staff' ? 'Thành viên quản trị' : 'Độc giả thư viện' }}
        </span>
      </div>

      <hr class="my-6 border-t border-(--bg-secondary) opacity-50" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 text-left">
        <div class="space-y-8">
          <h4
            class="newsreaderFont text-2xl text-(--secondary) border-b border-(--bg-secondary) pb-2 mb-6"
          >
            Định danh
          </h4>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-(--subtext-color)"
              >Mã thành viên</label
            >
            <input
              :value="user.maDocGia"
              disabled
              class="bg-transparent text-gray-400 font-medium py-1 outline-none border-none cursor-not-allowed"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-(--subtext-color)"
              >Ngày sinh</label
            >
            <input
              type="date"
              v-model="user.ngaySinh"
              class="bg-transparent border-b border-(--bg-secondary) py-1 text-black font-medium transition-colors duration-300 focus:border-(--primary) focus:outline-none"
            />
          </div>
        </div>

        <div class="space-y-8">
          <h4
            class="newsreaderFont text-2xl text-(--secondary) border-b border-(--bg-secondary) pb-2 mb-6"
          >
            Thông tin liên lạc
          </h4>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-(--subtext-color)"
              >Hòm thư điện tử</label
            >
            <input
              type="email"
              v-model="user.email"
              disabled="true"
              class="bg-transparent text-gray-400 font-medium py-1 outline-none border-none cursor-not-allowed"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-(--subtext-color)"
              >Số điện thoại</label
            >
            <input
              type="tel"
              v-model="user.soDienThoai"
              class="bg-transparent border-b border-(--bg-secondary) py-1 text-black font-medium transition-colors duration-300 focus:border-(--primary) focus:outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-(--subtext-color)"
              >Địa chỉ cư trú</label
            >
            <input
              type="text"
              v-model="user.diaChi"
              rows="2"
              class="bg-transparent border-b border-(--bg-secondary) py-1 text-black font-medium transition-colors duration-300 focus:border-(--primary) focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      <div class="mt-20 flex flex-col sm:flex-row justify-center gap-5">
        <button
          @click="handleUpdate"
          class="primary-btn px-12 py-3.5 text-xs tracking-widest font-bold uppercase flex items-center justify-center gap-3"
        >
          <FontAwesomeIcon icon="save" />
          Lưu thay đổi
        </button>
        <button @click="$router.back()" class="secondary-btn px-12 py-3.5">Hủy bỏ</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera, faSave } from '@fortawesome/free-solid-svg-icons'
import userService from '@/services/user.service'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import LoadingComponent from '@/components/LoadingComponent.vue'

library.add(faCamera, faSave)

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const selectedFile = ref(null)

const user = reactive({
  hoLot: '',
  ten: '',
  ngaySinh: '',
  email: '',
  soDienThoai: '',
  diaChi: '',
  hinhAnh: '',
  maDocGia: '',
  publicAvtId: '',
})

const handleAvatarChange = (file) => {
  selectedFile.value = file.raw
  user.hinhAnh = URL.createObjectURL(file.raw)
}

const fetchUserData = async () => {
  try {
    const detailData = await userService.getUserInfomation(authStore.token)
    if (detailData) {
      Object.assign(user, detailData)
    }
  } catch (error) {
    ElMessage.error('Không thể nạp dữ liệu người dùng: ' + error.message)
  }
}

const reloadLocalstorageAvt = (newAvtUrl, updatedUser) => {
  const localData = JSON.parse(localStorage.getItem('user'))

  if (localData) {
    if (newAvtUrl) localData.image = newAvtUrl

    localData.name = updatedUser.hoLot + updatedUser.ten
    localStorage.setItem('user', JSON.stringify(localData))

    authStore.user = localData
  }
}

const handleUpdate = async () => {
  if (!user.hoLot || !user.ten) {
    ElMessage.warning('Vui lòng không để trống họ tên')
    return
  }

  try {
    isLoading.value = true
    let currentAvtUrl = user.hinhAnh

    if (selectedFile.value) {
      const uploadRes = await userService.uploadAvatar(selectedFile.value, authStore.token)

      currentAvtUrl = uploadRes.coverUrl
      user.hinhAnh = currentAvtUrl
      user.publicAvtId = uploadRes.publicId
    }

    const payload = user
    await userService.updateUser(user.maDocGia, payload, authStore.token)

    reloadLocalstorageAvt(currentAvtUrl, user)

    ElMessage.success('Đã cập nhật hồ sơ thành công')
    router.push('/me')
  } catch (error) {
    console.error(error)
    ElMessage.error('Thao tác thất bại: ' + (error.response?.data?.message || error.message))
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchUserData)
</script>
