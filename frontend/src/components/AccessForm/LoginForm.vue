<script setup>
import { reactive, ref } from 'vue'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const showPassword = ref(false)

const credentials = reactive({ email: '', password: '' })
</script>

<template>
  <div class="w-full max-w-sm p-10 bg-white border border-(--bg-secondary) shadow-sm">
    <div class="text-center mb-10">
      <h1 class="LexiLibrary text-(--primary) leading-none">Lexilibrary</h1>
      <p class="newsreaderFont text-(--secondary) mt-2 text-lg">Hành trình tri thức</p>
    </div>

    <form @submit.prevent="" class="space-y-6">
      <div
        class="border-b border-(--bg-secondary) focus-within:border-(--primary) transition-colors"
      >
        <label class="block text-[10px] uppercase tracking-widest font-bold text-(--subtext-color)"
          >Email</label
        >
        <input
          v-model="credentials.email"
          type="email"
          placeholder="example@mail.com"
          class="w-full py-2 bg-transparent text-sm outline-none"
        />
      </div>

      <div
        class="border-b border-(--bg-secondary) focus-within:border-(--primary) transition-colors relative"
      >
        <label class="block text-[10px] uppercase tracking-widest font-bold text-(--subtext-color)"
          >Mật
        </label>
        <input
          v-model="credentials.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="w-full py-2 bg-transparent text-sm outline-none"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute right-0 bottom-2 text-xs text-(--subtext-color)"
        >
          <FontAwesomeIcon :icon="showPassword ? faEyeSlash : faEye" />
        </button>
      </div>

      <button
        type="submit"
        class="primary-btn w-full py-3 text-xs tracking-widest font-bold uppercase mt-4"
      >
        Đăng nhập
      </button>
    </form>

    <div class="relative my-8 text-center">
      <span class="absolute inset-0 flex items-center"
        ><span class="w-full border-t border-(--bg-primary)"></span
      ></span>
      <span
        class="relative bg-white px-4 text-[10px] uppercase text-(--subtext-color) tracking-widest font-medium"
        >Hoặc dùng</span
      >
    </div>

    <div class="flex gap-4">
      <button
        class="cursor-pointer flex-1 flex items-center justify-center py-2 border border-(--bg-secondary) hover:bg-(--bg-primary) transition-colors"
      >
        <FontAwesomeIcon :icon="faGoogle" class="text-xs mr-2" />
        <span class="text-[10px] font-bold uppercase">Google</span>
      </button>
      <button
        class="cursor-pointer flex-1 flex items-center justify-center py-2 border border-(--bg-secondary) hover:bg-(--bg-primary) transition-colors"
      >
        <FontAwesomeIcon :icon="faFacebookF" class="text-xs mr-2" />
        <span class="text-[10px] font-bold uppercase">Facebook</span>
      </button>
    </div>

    <p class="mt-10 text-center text-sm text-(--subtext-color)">
      Lần đầu ghé thăm?
      <router-link to="/register" class="text-(--primary) font-bold not-italic hover:underline"
        >Đăng ký ngay</router-link
      >
    </p>
  </div>
</template>
