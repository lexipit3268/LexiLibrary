<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { faArrowRight, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ElMessage } from 'element-plus'
import AuthService from '@/services/auth.service'

const carouselRef = ref(null)
const activeStep = ref(0)
const router = useRouter()

const hoLot = ref('')
const ten = ref('')
const ngaySinh = ref('')
const phai = ref('Nam')
const diaChi = ref('')
const soDienThoai = ref('')
const email = ref('')
const matKhau = ref('')

const is18Plus = (dateString) => {
  if (!dateString) return false
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
  return age >= 18
}

const isStep1Valid = computed(() => {
  return (
    hoLot.value.trim().length >= 2 &&
    ten.value.trim().length >= 2 &&
    ngaySinh.value !== '' &&
    is18Plus(ngaySinh.value) &&
    diaChi.value.trim() !== ''
  )
})

const isStep2Valid = computed(() => {
  const phoneRegex = /^(0|\+84)(\d{9})$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return (
    phoneRegex.test(soDienThoai.value) && emailRegex.test(email.value) && matKhau.value.length >= 6
  )
})

const nextStep = () => {
  if (isStep1Valid.value) {
    carouselRef.value.next()
    activeStep.value = 1
  } else {
    if (!is18Plus(ngaySinh.value) && ngaySinh.value !== '') {
      ElMessage.warning('Độc giả phải từ 18 tuổi trở lên')
    } else {
      ElMessage.warning('Vui lòng điền đúng và đủ thông tin cá nhân')
    }
  }
}

const prevStep = () => {
  carouselRef.value.prev()
  activeStep.value = 0
}

const handleRegister = async () => {
  if (!isStep2Valid.value) {
    ElMessage.warning('Vui lòng kiểm tra lại định dạng Email, SĐT hoặc Mật khẩu')
    return
  }

  const payload = {
    hoLot: hoLot.value,
    ten: ten.value,
    ngaySinh: ngaySinh.value,
    phai: phai.value,
    diaChi: diaChi.value,
    soDienThoai: soDienThoai.value,
    email: email.value,
    matKhau: matKhau.value,
  }

  try {
    ElMessage.info('Đang xử lý đăng ký...')
    const response = await AuthService.register(payload)

    if (response.status === 201 || response.status === 200) {
      ElMessage.success(
        `Đăng ký thành công - Mã: ${response.data.maDocGia}. Vui lòng đăng nhập lại`,
      )
      setTimeout(() => router.push('/login'), 2000)
    }
  } catch (error) {
    ElMessage.error(error.response?.data?.message || 'Lỗi kết nối máy chủ')
  }
}
</script>

<template>
  <div
    class="w-full max-w-lg bg-white border border-(--bg-secondary) shadow-md my-4 overflow-hidden"
  >
    <div class="p-6 border-b border-(--bg-primary) text-center">
      <h2 class="newsreaderFont text-3xl font-medium text-(--secondary)">Đăng ký tài khoản</h2>
      <div class="flex justify-center gap-2 mt-2">
        <div
          class="h-1 w-8 transition-all duration-500"
          :class="activeStep === 0 ? 'bg-(--primary)' : 'bg-(--bg-secondary)'"
        ></div>
        <div
          class="h-1 w-8 transition-all duration-500"
          :class="activeStep === 1 ? 'bg-(--primary)' : 'bg-(--bg-secondary)'"
        ></div>
      </div>
    </div>

    <el-carousel
      ref="carouselRef"
      :autoplay="false"
      arrow="never"
      indicator-position="none"
      height="350px"
    >
      <el-carousel-item>
        <div class="p-8 space-y-6">
          <div class="grid grid-cols-3 gap-4">
            <div
              class="col-span-2 border-b border-(--bg-secondary) focus-within:border-(--primary)"
            >
              <label
                class="block text-[10px] font-bold uppercase text-(--subtext-color) tracking-widest"
                >Họ và tên lót</label
              >
              <input
                v-model="hoLot"
                type="text"
                placeholder="..."
                class="w-full py-2 bg-transparent text-base outline-none"
              />
            </div>
            <div class="border-b border-(--bg-secondary) focus-within:border-(--primary)">
              <label
                class="block text-[10px] font-bold uppercase text-(--subtext-color) tracking-widest"
                >Tên</label
              >
              <input
                v-model="ten"
                type="text"
                placeholder="..."
                class="w-full py-2 bg-transparent text-base outline-none"
              />
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-1 border-b border-(--bg-secondary) focus-within:border-(--primary)">
              <label
                class="block text-[10px] font-bold uppercase text-(--subtext-color) tracking-widest"
                >Ngày sinh</label
              >
              <input
                v-model="ngaySinh"
                type="date"
                class="w-full py-2 bg-transparent text-sm outline-none font-sans"
              />
            </div>
            <div class="w-1/3 border-b border-(--bg-secondary) focus-within:border-(--primary)">
              <label
                class="block text-[10px] font-bold uppercase text-(--subtext-color) tracking-widest"
                >Phái</label
              >
              <select
                v-model="phai"
                class="w-full py-2 bg-transparent text-sm outline-none cursor-pointer"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>

          <div class="border-b border-(--bg-secondary) focus-within:border-(--primary)">
            <label
              class="block text-[10px] font-bold uppercase text-(--subtext-color) tracking-widest"
              >Địa chỉ thường trú</label
            >
            <input
              v-model="diaChi"
              type="text"
              placeholder="..."
              class="w-full py-2 bg-transparent text-sm outline-none"
            />
          </div>

          <button
            @click="nextStep"
            class="primary-btn w-full py-3 flex justify-center items-center gap-3 group"
          >
            <span class="text-[11px] font-bold uppercase tracking-[0.2em]">Tiếp theo</span>
            <FontAwesomeIcon
              :icon="faArrowRight"
              class="text-xs group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </el-carousel-item>

      <el-carousel-item>
        <div class="p-8 space-y-6">
          <div class="border-b border-(--bg-secondary) focus-within:border-(--primary)">
            <label
              class="block text-[10px] font-bold uppercase text-(--subtext-color) tracking-widest"
              >Số điện thoại</label
            >
            <input
              v-model="soDienThoai"
              type="tel"
              placeholder="09xxxxxxxx"
              class="w-full py-2 bg-transparent text-base outline-none"
            />
          </div>

          <div class="border-b border-(--bg-secondary) focus-within:border-(--primary)">
            <label class="block text-[10px] font-bold uppercase text-(--secondary) tracking-widest"
              >Email (Tài khoản)</label
            >
            <input
              v-model="email"
              type="email"
              placeholder="example@mail.com"
              class="w-full py-2 bg-transparent text-base outline-none"
            />
          </div>

          <div class="border-b border-(--bg-secondary) focus-within:border-(--primary)">
            <label class="block text-[10px] font-bold uppercase text-(--secondary) tracking-widest"
              >Mật khẩu</label
            >
            <input
              v-model="matKhau"
              type="password"
              placeholder="••••••••"
              class="w-full py-2 bg-transparent text-base outline-none"
            />
          </div>

          <div class="flex gap-4 mt-4">
            <button
              @click="prevStep"
              class="flex-1 py-3 border border-(--bg-secondary) text-(--subtext-color) hover:bg-(--bg-primary) transition-all flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon :icon="faArrowLeft" class="text-[10px]" />
              <span class="text-[10px] font-bold uppercase">Quay lại</span>
            </button>
            <button
              @click="handleRegister"
              class="flex-2 primary-btn py-3 flex items-center justify-center gap-2 shadow-lg"
            >
              <FontAwesomeIcon :icon="faCheck" class="text-[10px]" />
              <span class="text-[10px] font-bold uppercase tracking-widest">Hoàn tất</span>
            </button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="p-6 bg-(--bg-primary) border-t border-(--bg-secondary)">
      <div class="flex items-center gap-4">
        <span class="text-[9px] font-bold uppercase text-(--subtext-color) whitespace-nowrap"
          >Hoặc</span
        >
        <div class="flex gap-2 w-full">
          <button
            class="cursor-pointer flex-1 flex items-center justify-center py-2 border border-(--bg-secondary) bg-white hover:bg-amber-500/20 transition-colors"
          >
            <FontAwesomeIcon :icon="faGoogle" class="text-xs mr-2" />
            <span class="text-[10px] font-bold uppercase">Google</span>
          </button>
          <button
            class="cursor-pointer flex-1 flex items-center justify-center py-2 border border-(--bg-secondary) bg-white hover:bg-amber-500/20 transition-colors"
          >
            <FontAwesomeIcon :icon="faFacebookF" class="text-xs mr-2" />
            <span class="text-[10px] font-bold uppercase">Facebook</span>
          </button>
        </div>
      </div>
      <div class="text-center mt-4 text-sm text-(--subtext-color)">
        Bạn đã có tài khoản?
        <router-link to="/login" class="hover:text-(--primary)">Đăng nhập</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-carousel__container) {
  background-color: transparent;
}
input[type='date']::-webkit-calendar-picker-indicator {
  filter: sepia(0.5) hue-rotate(15deg);
  cursor: pointer;
}
input::placeholder {
  color: #e2e8f0;
}
</style>
