<template>
  <div class="min-h-screen bg-pattern py-16 px-4">
    <div
      class="max-w-4xl mx-auto bg-white border border-(--bg-secondary) shadow-sm overflow-hidden"
    >
      <div class="relative h-56 bg-(--bg-quaternary) flex justify-center">
        <div class="absolute -bottom-20">
          <div class="relative group cursor-pointer">
            <el-avatar
              :size="160"
              :src="userAvatar"
              class="border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-105"
              fit="cover"
            />
            <div
              class="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <FontAwesomeIcon icon="camera" class="text-white text-3xl" />
            </div>
          </div>
        </div>
      </div>

      <div class="pt-24 pb-16 px-10 md:px-20 text-center">
        <h2 class="LexiLibrary text-(--primary) mb-3">{{ user.name }}</h2>
        <div
          class="inline-block px-5 py-1 rounded-full bg-(--bg-primary) border border-(--primary)"
        >
          <span class="text-[10px] font-bold uppercase tracking-widest text-(--secondary)">
            {{ user.role === 'staff' ? 'Thành viên quản trị' : 'Độc giả thư viện' }}
          </span>
        </div>

        <div class="mt-10 max-w-xl mx-auto">
          <p class="newsreaderFont italic text-2xl text-(--subtext-color) leading-relaxed">
            "Cuốn sách tốt nhất cho bạn là cuốn sách nói nhiều nhất với bạn."
          </p>
        </div>

        <hr class="my-12 border-t border-(--bg-secondary) opacity-50" />

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
              <p class="text-base font-medium text-black">{{ user.code }}</p>
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
                >Hòm thư điện tử</label
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

        <div class="mt-20 flex flex-col sm:flex-row justify-center gap-5">
          <button
            class="primary-btn px-12 py-3.5 text-xs tracking-widest font-bold uppercase flex items-center justify-center gap-3"
          >
            <FontAwesomeIcon icon="pen-nib" />
            Chỉnh sửa thông tin
          </button>

          <button
            class="bg-white border border-(--primary) text-(--primary) px-12 py-3.5 text-xs tracking-widest font-bold uppercase hover:bg-(--bg-primary) transition-all active:scale-95"
          >
            Thay đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera, faPenNib } from '@fortawesome/free-solid-svg-icons'

library.add(faCamera, faPenNib)

const authStore = useAuthStore()

const user = computed(() => authStore.user || {})

const userAvatar = computed(() => {
  return user.value.image || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
})
</script>

<style scoped>
:deep(.el-avatar img) {
  image-rendering: -webkit-optimize-contrast;
}
</style>
