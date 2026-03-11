<template>
  <div class="max-w-4xl mx-auto bg-white border border-(--bg-secondary) shadow-sm overflow-hidden">
    <div class="relative h-56 bg-(--bg-quaternary) flex justify-center">
      <div class="absolute -bottom-20">
        <div class="relative group">
          <div
            class="overflow-hidden w-60 h-60 rounded-full border-4 border-white bg-white shadow-md"
          >
            <img
              v-if="user.hinhAnh"
              :src="user.hinhAnh"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <img
              v-else
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              alt=""
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="pt-24 pb-16 px-10 md:px-20 text-center">
      <h2 class="LexiLibrary text-(--primary) mb-3">{{ user.hoLot }} {{ user.ten }}</h2>
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
            <p class="text-base font-medium text-black">{{ user.maDocGia }}</p>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-(--subtext-color)"
              >Vai trò tài khoản</label
            >
            <p class="text-base font-medium text-black capitalize">{{ user.role }}</p>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-(--subtext-color)"
              >Ngày sinh</label
            >
            <p class="text-base font-medium text-black">{{ user.ngaySinh || 'Chưa cập nhật' }}</p>
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
              >Hộp thư điện tử</label
            >
            <p class="text-base font-medium text-black underline decoration-(--bg-secondary)">
              {{ user.email }}
            </p>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-(--subtext-color)"
              >Số điện thoại</label
            >
            <p class="text-base font-medium text-black">
              {{ user.soDienThoai || 'Chưa cập nhật' }}
            </p>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-(--subtext-color)"
              >Địa chỉ cư trú</label
            >
            <p class="text-base font-medium text-black leading-relaxed">
              {{ user.diaChi || 'Chưa cập nhật' }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h4
          class="newsreaderFont text-2xl text-(--secondary) border-b border-(--bg-secondary) pb-2 mb-8 text-left"
        >
          Chỉ số
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div
            class="flex items-center gap-8 p-8 bg-(--bg-primary) border border-(--bg-secondary) relative group transition-all hover:border-(--primary)"
          >
            <div
              class="absolute top-0 right-0 w-4 h-4 border-t border-r border-(--bg-quaternary) opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>

            <ElProgress
              type="circle"
              :percentage="user.diemUyTin * 10"
              :stroke-width="8"
              :width="120"
              :color="colors"
            >
              <template #default>
                <div class="flex flex-col items-center">
                  <span
                    class="text-2xl font-bold text-(--secondary) newsreaderFont italic leading-none"
                  >
                    {{ user.diemUyTin }}<span class="text-sm">/10</span>
                  </span>
                </div>
              </template>
            </ElProgress>

            <div class="text-left space-y-1">
              <p class="text-sm uppercase tracking-[0.2em] font-bold text-(--subtext-color)">
                Điểm uy tín
              </p>
              <p class="text-[11px] text-(--primary) leading-relaxed mt-2 italic">
                {{ user.diemUyTin >= 8 ? 'Tài khoản rất uy tín' : 'Cần chú ý trả sách đúng hạn' }}
              </p>
            </div>
          </div>

          <div
            class="flex items-center gap-8 p-8 bg-(--bg-primary) border border-(--bg-secondary) relative group transition-all hover:border-(--primary)"
          >
            <div
              class="absolute top-0 right-0 w-4 h-4 border-t border-r border-(--bg-quaternary) opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>

            <ElProgress
              type="circle"
              :percentage="(user.gioiHanMuon / 5) * 100"
              :stroke-width="8"
              :width="120"
              :color="colors"
            >
              <template #default>
                <div class="flex flex-col items-center">
                  <span
                    class="text-2xl font-bold text-(--secondary) newsreaderFont italic leading-none"
                  >
                    {{ user.gioiHanMuon }}<span class="text-sm">/5</span>
                  </span>
                </div>
              </template>
            </ElProgress>

            <div class="text-left space-y-1">
              <p class="text-sm uppercase tracking-[0.2em] font-bold text-(--subtext-color)">
                Hạn mức
              </p>
              <p class="text-[11px] text-(--primary) leading-relaxed mt-2 italic">
                Hạn mức tối đa được phép mượn
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 flex flex-col sm:flex-row justify-center gap-5">
        <button
          class="primary-btn px-12 py-3.5 text-xs tracking-widest font-bold uppercase flex items-center justify-center gap-3"
          @click="$router.push('/me/edit')"
        >
          <FontAwesomeIcon icon="pen-nib" />
          Chỉnh sửa thông tin
        </button>

        <button class="secondary-btn" @click="$router.push('me/edit/password')">
          Thay đổi mật khẩu
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera, faPenNib } from '@fortawesome/free-solid-svg-icons'
import userService from '@/services/user.service'
import { ElMessage, ElProgress } from 'element-plus'

library.add(faCamera, faPenNib)

const authStore = useAuthStore()
const user = ref({})

const fetchUserData = async () => {
  try {
    const token = authStore.token
    if (!token) return

    const detailData = await userService.getUserInfomation(token)

    if (detailData) {
      user.value = detailData
    }
    console.log(user.value)
  } catch (error) {
    ElMessage.error('Không thể lấy thông tin người dùng mới nhất')
    console.error(error)
  }
}

const colors = [
  { color: '#ef4444', percentage: 20 },
  { color: '#f59e0b', percentage: 40 },
  { color: '#d48c6a', percentage: 60 },
  { color: '#9d674e', percentage: 80 },
  { color: '#5d4037', percentage: 100 },
]

onMounted(() => {
  fetchUserData()
})
</script>

<style scoped>
img {
  image-rendering: -webkit-optimize-contrast;

  image-rendering: crisp-edges;

  will-change: transform;
  transform: translateZ(0);

  backface-visibility: hidden;
}

:deep(.el-progress-circle__track) {
  stroke: var(--bg-tertiary) !important;
}
</style>
