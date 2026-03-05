<template>
  <div class="p-6 font-['Montserrat'] bg-(--bg-primary) min-h-[calc(100vh-80px)] overflow-y-auto">
    <div class="grid grid-cols-12 gap-6 items-start">
      <div class="max-h-98 col-span-4 space-y-6">
        <!-- <div
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
              class="absolute bottom-0 right-0 staff-header-icon w-8! h-8! bg-white hover:bg-(--primary)! border border-(--primary)/20 shadow-sm"
            >
              <FontAwesomeIcon :icon="faCamera" class="text-[10px]" />
            </button>
          </div>

          <h2 class="newsreaderFont text-3xl font-semibold">{{ staff.name }}</h2>
          <p class="text-[9px] uppercase tracking-[0.25em] text-(--primary) font-bold mt-1">
            STaff LexiLibrary
          </p>
        </div> -->
        <SpotlightCard
          spotlight-color="rgba(212, 140, 106, 1)"
          class="h-75 bg-white p-6 shadow-sm border border-(--primary)/10 text-center relative rounded-none! overflow-hidden"
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
              class="absolute bottom-0 right-0 staff-header-icon w-8! h-8! bg-white hover:bg-(--primary)! border border-(--primary)/20 shadow-sm"
            >
              <FontAwesomeIcon :icon="faCamera" class="text-[10px]" />
            </button>
          </div>

          <h2 class="newsreaderFont text-3xl font-semibold">{{ staff.name }}</h2>
          <p class="text-[9px] uppercase tracking-[0.25em] text-(--primary) font-bold mt-1">
            STaff LexiLibrary
          </p>
        </SpotlightCard>

        <div class="p-6 min-h-full! border border-(--primary)/20 bg-white/50 italic text-center">
          <p class="newsreaderFont text-sm text-(--subtext-color)">
            Tri thức là sức mạnh, và người quản lý là chìa khóa.
          </p>
        </div>
      </div>

      <div class="max-h-98 col-span-8 bg-white p-6 shadow-sm border border-(--primary)/10">
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
                class="bg-(--bg-primary)/60 px-4 py-2.5 rounded-lg text-sm border border-transparent"
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
              class="flex items-center justify-between p-3 rounded-xl border border-(--bg-primary) hover:border-(--primary)/60 hover:bg-(--bg-primary)/20 transition-all cursor-pointer group"
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
              class="flex items-center justify-between p-3 rounded-xl border border-(--bg-primary) hover:border-(--primary)/60 hover:bg-(--bg-primary)/20 transition-all cursor-pointer group"
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

      <!-- thanh tich -->
      <div
        class="max-h-38 col-span-4 bg-(--secondary) p-6 shadow-md border border-white/10 flex flex-col justify-between text-white group relative overflow-hidden"
      >
        <FontAwesomeIcon
          :icon="faStar"
          class="absolute -right-4 -top-2 text-white/10 text-6xl rotate-15"
        />

        <div class="flex justify-between items-start relative z-10">
          <span class="text-[9px] font-bold bg-white/20 px-2 py-1 uppercase tracking-widest"
            >Ví thu nhập</span
          >
        </div>

        <div class="mt-4 relative z-10">
          <p class="text-[9px] uppercase tracking-widest text-white/70 font-bold">
            Thu nhập ước tính
          </p>
          <h4 class="newsreaderFont text-2xl font-bold italic">
            <CountUp :from="0" :to="staffStats.salaryBase" separator="," :duration="0.5" /> VNĐ
          </h4>
          <div class="flex justify-between items-center mt-2 pt-2 border-t border-white/10">
            <p class="text-[9px] font-medium italic">Thưởng tích lũy:</p>
            <p class="text-xs font-black text-amber-300">+ {{ staffStats.bonusPoints }} pts</p>
          </div>
        </div>
      </div>
      <div
        class="max-h-38 col-span-4 bg-white p-6 shadow-sm border border-(--primary)/10 flex flex-col justify-between group hover:border-(--primary) transition-all"
      >
        <div class="flex justify-between items-start">
          <span class="text-[10px] font-bold text-(--primary) bg-amber-100 px-2 py-1"
            >Master Archivist</span
          >
        </div>
        <div class="mt-4">
          <p class="text-[9px] uppercase tracking-widest text-(--subtext-color) font-bold">
            Sách đã xử lý
          </p>
          <h4 class="newsreaderFont text-3xl font-bold">
            <CountUp :from="0" :to="staffStats.booksProcessed" :duration="0.5" />
          </h4>
          <div class="w-full bg-(--bg-primary) h-1 mt-2 rounded-full overflow-hidden">
            <div class="bg-(--secondary) h-full w-[75%]"></div>
          </div>
        </div>
      </div>

      <div
        class="max-h-38 col-span-12 md:col-span-4 bg-white p-6 shadow-sm border border-(--primary)/10 flex flex-col justify-between group hover:border-(--primary) transition-all relative overflow-hidden"
      >
        <span
          class="absolute -right-2 -bottom-2 opacity-[0.08] text-5xl font-black uppercase select-none pointer-events-none"
        >
          Meeting
        </span>

        <div class="flex justify-between items-start border-b border-(--bg-primary) pb-2">
          <div class="flex flex-col">
            <p class="text-[10px] font-black text-(--primary) uppercase tracking-[0.2em]">
              Họp định kỳ
            </p>
            <p class="text-[8px] text-(--subtext-color) uppercase font-medium">Tháng 03/2026</p>
          </div>
          <span
            class="text-[9px] font-bold text-red-600 border border-red-200 px-2 py-0.5 rounded-sm uppercase tracking-tighter"
          >
            {{ staffStats.meetingStatus }}
          </span>
        </div>

        <div class="mt-2 flex items-end justify-between">
          <div>
            <p class="text-[9px] uppercase tracking-widest text-(--subtext-color) font-bold mb-1">
              Thời gian & Địa điểm
            </p>
            <div class="flex items-baseline gap-2">
              <h4 class="newsreaderFont text-4xl font-bold leading-none">
                {{ staffStats.nextMeeting }}
              </h4>
              <span class="text-[11px] font-semibold text-(--secondary) uppercase tracking-tighter">
                / {{ staffStats.meetingRoom }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-2">
          <p class="text-[10px] font-medium italic border-l-2 border-(--primary) pl-2 truncate">
            Chủ đề: {{ staffStats.meetingTopic }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCamera, faKey, faGear, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '@/stores/auth'
import SpotlightCard from '@/components/vuebits/SpotlightCard/SpotlightCard.vue'
import CountUp from '@/components/vuebits/CountUp/CountUp.vue'

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

const staffStats = reactive({
  booksProcessed: 1240,
  caffeineLevel: '85%',
  silenceEnforced: 42,
  salaryBase: 126832099,
  bonusPoints: 1250,
  nextMeeting: '15/03',
  meetingRoom: 'Phòng Creative',
  meetingTopic: 'Kế hoạch nhập sách hè',
  meetingStatus: 'Bắt buộc',
})

const displayFields = {
  'Họ tên': staff.name,
  Email: staff.email,
  'Liên hệ': staffData.phone,
  'Ngày gia nhập': staffData.joinDate,
}
</script>
