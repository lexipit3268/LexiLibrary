<template>
  <div class="bg-pattern min-h-screen flex items-center justify-center px-6">
    <div class="text-center rounded-2xl shadow-md backdrop-blur-xs p-16">
      <h1 class="text-9xl font-extrabold text-(--primary) tracking-widest">404</h1>

      <div
        class="bg-white px-2 text-sm rounded rotate-12 absolute transform -translate-y-15 translate-x-8 border border-(--primary) text-(--primary) font-semibold shadow-sm hidden sm:block"
      >
        Page Not Found
      </div>

      <div class="mt-8">
        <p class="text-2xl newsreaderFont md:text-3xl leading-normal text-gray-800">
          Rất tiếc! Chúng tôi không tìm thấy trang này.
        </p>
        <p class="mt-4 mb-8 text-gray-500">
          Đừng lo lắng, bạn có thể quay lại trang chủ hoặc thử tìm kiếm lại nhé.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button
            @click="goBack"
            class="cursor-pointer px-6 py-3 border border-(--primary) text-(--primary) hover:bg-white/70 transition duration-300 rounded-full"
          >
            Quay lại
          </button>

          <button @click="goHome" class="primary-btn cta-btn m-0!">Về trang chủ</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push({ name: 'home-page' })
}
</script>
