<script setup>
import { reactive, ref } from 'vue'
import { faArrowRight, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const carouselRef = ref(null)
const activeStep = ref(0)

const formData = reactive({
  hoLot: '',
  ten: '',
  ngaySinh: '',
  phai: 'Nam',
  diaChi: '',
  soDienThoai: '',
  email: '',
  matKhau: '',
})

const nextStep = () => {
  carouselRef.value.next()
  activeStep.value = 1
}

const prevStep = () => {
  carouselRef.value.prev()
  activeStep.value = 0
}

const handleRegister = () => console.log('Đăng ký:', formData)
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
      height="380px"
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
                v-model="formData.hoLot"
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
                v-model="formData.ten"
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
                v-model="formData.ngaySinh"
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
                v-model="formData.phai"
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
              v-model="formData.diaChi"
              type="text"
              placeholder="Xã/Phường, Quận/Huyện..."
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
              v-model="formData.soDienThoai"
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
              v-model="formData.email"
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
              v-model="formData.matKhau"
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
            class="flex-1 py-2 bg-white border border-(--bg-secondary) hover:border-(--primary) transition-all active:scale-95"
          >
            <span class="text-xs flex items-center justify-center gap-4"
              ><FontAwesomeIcon :icon="faGoogle" /> Google</span
            >
          </button>
          <button
            class="flex-1 py-2 bg-white border border-(--bg-secondary) hover:border-(--primary) transition-all active:scale-95"
          >
            <span class="text-xs flex items-center justify-center gap-4"
              ><FontAwesomeIcon :icon="faFacebookF" /> Facebook</span
            >
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
/* Tùy chỉnh màu sắc cho Element Plus Carousel */
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
