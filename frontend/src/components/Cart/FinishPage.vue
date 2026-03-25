<template>
  <div class="min-h-screen bg-[--bg-primary] flex items-center justify-center pb-20">
    <div class="max-w-2xl w-full" data-aos="zoom-in" data-aos-duration="800">
      <div
        class="bg-white border border-[#e8d5c4] shadow-[0_20px_60px_rgba(58,42,30,0.1)] relative overflow-hidden"
      >
        <div
          class="bg-(--text-color-2) py-12 flex justify-center items-center relative overflow-hidden"
        >
          <AppLogo class="w-20 relative" />
        </div>

        <div class="p-12 text-center space-y-8">
          <div class="space-y-4">
            <h1 class="newsreaderFont text-5xl text-(--text-color-2) italic leading-tight">
              Tạo phiếu mượn thành công
            </h1>
            <div class="flex items-center justify-center gap-3">
              <div class="h-px w-8 bg-(--primary) opacity-30"></div>
              <p class="text-[10px] uppercase tracking-[0.4em] text-(--secondary) font-bold">
                Cảm ơn bạn đã ghé thăm
              </p>
              <div class="h-px w-8 bg-(--primary) opacity-30"></div>
            </div>
          </div>

          <div class="space-y-6 max-w-md mx-auto">
            <div
              class="bg-(--bg-primary) border border-dashed border-[#d4c0b0] p-6 space-y-3 relative"
            >
              <p class="text-[11px] text-(--text-color-2) font-bold uppercase tracking-[0.2em]">
                Lời nhắc từ thủ thư
              </p>
              <ul class="text-[13px] text-(--subtext-color) space-y-2 text-left inline-block">
                <li class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-(--primary) rounded-full"></span>
                  Vui lòng đến quầy nhận sách trong vòng 24h.
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-(--primary) rounded-full"></span>
                  Giữ gìn ấn phẩm cẩn thận để bảo vệ uy tín.
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-(--primary) rounded-full"></span>
                  Hạn mượn mặc định cho mỗi đầu sách là 14 ngày.
                </li>
              </ul>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="$router.push('/history')"
              class="primary-btn px-10 py-4 text-[10px] tracking-[0.2em] font-bold uppercase"
            >
              Xem lịch sử mượn
            </button>
            <button
              @click="$router.push('/book')"
              class="secondary-btn px-10 py-4 text-[10px] tracking-[0.2em] font-bold uppercase"
            >
              Tiếp tục khám phá
            </button>
          </div>
        </div>

        <div class="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M100 0L0 100H100V0Z" fill="var(--primary)" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppLogo from '../AppLogo.vue'
</script>

<style scoped>
.primary-btn {
  min-width: 220px;
}

.secondary-btn {
  min-width: 220px;
}
</style>
