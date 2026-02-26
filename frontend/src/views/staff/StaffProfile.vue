<template>
  <div
    class="p-6 font-['Montserrat'] bg-(--bg-primary) min-h-[calc(100vh-80px)] overflow-y-auto text-(--text-color)"
  >
    <div class="grid grid-cols-12 gap-6 items-start">
      <div class="max-h-98 col-span-12 lg:col-span-4 space-y-6">
        <div
          class="h-75 bg-white p-6 shadow-sm border border-(--primary)/10 text-center relative overflow-hidden"
        >
          <span
            class="absolute -right-2 -bottom-4 opacity-[0.05] text-[6rem]! LexiLibrary select-none"
            >staff</span
          >

          <div class="relative w-32 h-32 mx-auto mb-4">
            <div class="w-full h-full rounded-full border-2 border-(--primary) p-1 shadow-sm">
              <img
                :src="staff.image"
                alt="Avatar"
                class="w-full h-full rounded-full object-cover bg-(--bg-secondary)"
              />
            </div>
            <button
              class="absolute bottom-0 right-0 staff-header-icon w-8! h-8! bg-white border border-(--primary)/20 shadow-sm"
            >
              <FontAwesomeIcon :icon="faCamera" class="text-[10px]" />
            </button>
          </div>

          <h2 class="newsreaderFont text-2xl font-semibold italic">{{ staff.name }}</h2>
          <p class="text-[9px] uppercase tracking-[0.25em] text-(--primary) font-bold mt-1">
            STaff LexiLibrary
          </p>
        </div>

        <div class="p-6 min-h-full! border border-(--primary)/20 bg-white/50 italic text-center">
          <p class="newsreaderFont text-sm text-(--subtext-color)">
            "Tri thức là sức mạnh, và người quản lý là chìa khóa."
          </p>
        </div>
      </div>

      <div
        class="max-h-98 col-span-12 lg:col-span-8 bg-white p-6 shadow-sm border border-(--primary)/10"
      >
        <div class="mb-8">
          <h3 class="newsreaderFont text-xl mb-6 flex items-center gap-3">
            <span class="w-8 h-px bg-(--primary)"></span>
            Thông tin nhân sự
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div v-for="(value, label) in displayFields" :key="label" class="flex flex-col gap-1">
              <label
                class="text-[9px] uppercase font-bold tracking-widest text-(--subtext-color) opacity-70"
                >{{ label }}</label
              >
              <div
                class="bg-(--bg-primary)/30 px-4 py-2.5 rounded-lg text-sm text-(--text-color) border border-transparent"
              >
                {{ value }}
              </div>
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-(--bg-primary)">
          <h3 class="newsreaderFont text-xl mb-4 text-(--secondary)">Tài khoản & Bảo mật</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              @click="router.push('/staff/settings/security')"
              class="flex items-center justify-between p-3 rounded-xl border border-(--bg-primary) hover:border-(--primary)/30 hover:bg-(--bg-primary)/20 transition-all cursor-pointer group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="text-(--primary) w-8 h-8 flex items-center justify-center bg-(--bg-primary) rounded-full group-hover:bg-(--primary) group-hover:text-white transition-colors"
                >
                  <FontAwesomeIcon :icon="faKey" class="text-xs" />
                </div>
                <div>
                  <p class="text-xs font-bold">Mật khẩu</p>
                  <p class="text-[9px] text-(--subtext-color) uppercase tracking-tighter">
                    Thay đổi định kỳ
                  </p>
                </div>
              </div>
              <FontAwesomeIcon
                :icon="faChevronRight"
                class="text-[10px] text-(--subtext-color) opacity-50"
              />
            </div>

            <div
              @click="router.push('/staff/settings')"
              class="flex items-center justify-between p-3 rounded-xl border border-(--bg-primary) hover:border-(--primary)/30 hover:bg-(--bg-primary)/20 transition-all cursor-pointer group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="text-(--secondary) w-8 h-8 flex items-center justify-center bg-(--bg-primary) rounded-full group-hover:bg-(--secondary) group-hover:text-white transition-colors"
                >
                  <FontAwesomeIcon :icon="faGear" class="text-xs" />
                </div>
                <div>
                  <p class="text-xs font-bold">Cài đặt khác</p>
                  <p class="text-[9px] text-(--subtext-color) uppercase tracking-tighter">
                    Tùy chỉnh hệ thống
                  </p>
                </div>
              </div>
              <FontAwesomeIcon
                :icon="faChevronRight"
                class="text-[10px] text-(--subtext-color) opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCamera, faKey, faGear, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const staff = authStore.user
console.log(staff)
const router = useRouter()

const staffData = reactive({
  name: 'Admin System',
  role: 'Quản trị viên',
  email: 'root@lexilibrary.com',
  phone: '0123 456 789',
  joinDate: '12/2025',
})

const displayFields = {
  'Họ tên': staff.name,
  Email: staff.email,
  'Liên hệ': staffData.phone,
  'Ngày gia nhập': staffData.joinDate,
}
</script>
