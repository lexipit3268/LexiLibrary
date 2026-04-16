<template>
  <div class="flex flex-col items-center justify-center py-24 text-center">
    <div class="relative mb-8">
      <div class="w-28 h-28 rounded-full bg-[#f7ede2] flex items-center justify-center">
        <span class="newsreaderFont text-6xl italic text-[#d4c0b0] mr-2">∅</span>
      </div>
      <div
        class="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white bg-(--primary) opacity-60"
      ></div>
      <div
        class="absolute -bottom-2 -left-2 w-3 h-3 rounded-full border-2 border-white bg-[#faedcd]"
      ></div>
    </div>
    <p class="text-[10px] uppercase tracking-[0.35em] text-[#c5b5ab] mb-3">
      {{ props.description }}
    </p>
    <div v-if="authStore.user">
      <h2 class="newsreaderFont text-4xl italic text-[#c5b5ab] mb-8">{{ props.title }}</h2>
      <button
        v-if="!hideButton"
        @click="$router.push('/book')"
        class="primary-btn text-[10px] px-12 py-4 uppercase tracking-[0.25em] font-bold"
      >
        Khám phá kho sách
      </button>
    </div>
    <div v-else>
      <h2 class="newsreaderFont text-4xl italic text-[#c5b5ab] mb-8">
        {{ props.advise }}
      </h2>
      <button
        @click="$router.push('/login')"
        class="primary-btn text-[10px] px-12 py-4 uppercase tracking-[0.25em] font-bold"
      >
        Đăng nhập
      </button>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth'
const props = defineProps({
  title: {
    type: String,
    default: 'Chưa có tiêu đề',
  },
  description: {
    type: String,
    default: 'MÔ TẢ TRỐNG',
  },
  advise: {
    type: String,
    default: 'Hãy đăng nhập để tiếp tục',
  },
  hideButton: {
    type: Boolean,
    default: false,
  },
})

const authStore = useAuthStore()
</script>
