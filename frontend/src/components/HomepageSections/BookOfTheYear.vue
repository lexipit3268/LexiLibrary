<template>
  <section
    v-if="book && book.tenSach"
    class="relative py-28 lg:py-48 bg-(--bg-primary) overflow-hidden"
  >
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-20! newsreaderFont text-[10rem] italic font-bold tracking-tighter whitespace-nowrap z-0"
      data-aos="zoom-out"
      data-aos-duration="3000"
    >
      {{ book.tenSach }}
    </div>

    <div class="absolute -top-20 -right-20 w-96 h-96 opacity-10 pointer-events-none rotate-12">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-(--primary)"
      >
        <path
          d="M40 160C40 160 60 100 120 80C180 60 160 20 160 20"
          stroke="currentColor"
          stroke-width="0.5"
        />
        <circle cx="160" cy="20" r="3" fill="currentColor" />
        <path
          d="M30 140C30 140 80 130 100 80"
          stroke="currentColor"
          stroke-width="0.5"
          stroke-dasharray="4 4"
        />
      </svg>
    </div>

    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,140,106,0.1)_0%,transparent_50%)]"
    ></div>
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(212,140,106,0.08)_0%,transparent_50%)]"
    ></div>

    <div class="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
        <!-- hinh anh -->
        <div
          class="w-full lg:w-1/2 flex justify-center lg:justify-end"
          data-aos="fade-right"
          data-aos-offset="0"
          data-aos-duration="2000"
        >
          <div class="relative group">
            <div
              class="absolute -inset-12 bg-linear-to-tr from-(--primary)/20 to-amber-200/10 blur-[120px] rounded-full group-hover:opacity-100 opacity-60 transition-opacity duration-1000"
            ></div>

            <div
              class="relative p-8 md:p-14 bg-white/30 backdrop-blur-sm border border-white/80 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none z-20"
              ></div>

              <img
                :src="book.hinhAnh || 'https://placehold.co/400x600/d48c6a/FFF?text=Book'"
                class="w-72 md:w-104 h-auto object-cover shadow-[30px_30px_70px_rgba(0,0,0,0.35)] rounded-r-sm transition-all duration-600 group-hover:scale-[1.03] group-hover:-rotate-1 relative z-10"
              />
            </div>

            <!-- <div
              class="absolute -top-12 -left-12 w-36 h-36 flex items-center justify-center pointer-events-none"
            >
              <div
                class="absolute inset-0 border border-amber-900/10 rounded-full animate-spin-slow-reverse opacity-40"
              ></div>
              <div
                class="absolute inset-2 border-2 border-dashed border-(--primary)/20 rounded-full animate-spin-slow"
              ></div>
              <div
                class="relative bg-white shadow-xl rounded-full w-20 h-20 flex items-center justify-center border border-amber-900/5"
              >
                <span class="newsreaderFont italic text-(--secondary) font-bold text-3xl">L</span>
              </div>
            </div> -->
            <div
              class="absolute -top-12 -left-12 w-36 h-36 flex items-center justify-center pointer-events-none animate-spin-slow"
            >
              <svg class="w-full h-full text-(--primary) opacity-40" viewBox="0 0 100 100">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text class="text-[10px] uppercase font-bold tracking-[0.2em] fill-current">
                  <textPath xlink:href="#circlePath">Best Literature Selection 2026 •</textPath>
                </text>
              </svg>
              <div
                class="absolute bg-white shadow-xl rounded-full w-20 h-20 flex items-center justify-center border border-amber-900/5"
              >
                <span class="absolute newsreaderFont italic text-(--secondary) font-bold text-xl"
                  >L</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-1/2 space-y-10 text-center lg:text-left">
          <div data-aos="fade-up" data-aos-offset="0" data-aos-delay="200">
            <div class="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                class="text-(--primary) animate-spin"
              >
                <path
                  d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"
                  fill="currentColor"
                />
              </svg>
              <span
                class="text-[11px] uppercase font-bold tracking-[0.6em] text-(--primary) opacity-80"
              >
                Lựa chọn của năm
              </span>
            </div>

            <h2
              class="newsreaderFont text-6xl! lg:text-[5.5rem] text-(--secondary) leading-none mb-4 tracking-tighter italic font-medium"
            >
              {{ book.tenSach }}
            </h2>

            <div class="inline-flex items-center gap-6 px-6 py-2 border-y border-amber-900/10">
              <p class="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400">Tác giả</p>
              <p class="text-2xl newsreaderFont text-(--secondary) italic">{{ book.tacGia }}</p>
            </div>
          </div>

          <div
            class="newsreaderFont text-xl text-(--subtext-color) leading-relaxed opacity-70 max-w-xl mx-auto lg:mx-0 relative"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay="500"
          >
            <span class="absolute -top-6 -left-4 text-6xl text-(--primary)">“</span>
            "{{
              book.moTa?.split('\n')[0] ||
              'Một hành trình tri thức đầy thơ mộng đang chờ đón tâm hồn bạn.'
            }}"
          </div>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-12"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay="100"
          >
            <router-link
              :to="'/book/' + id"
              class="group/btn relative px-14 py-6 bg-(--secondary) text-white text-[11px] uppercase font-bold tracking-[0.5em] overflow-hidden shadow-2xl transition-transform hover:-translate-y-1"
            >
              <span class="relative z-10">Khám phá ngay</span>
              <div
                class="absolute inset-0 bg-(--primary) translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 ease-in-out"
              ></div>
            </router-link>

            <div class="flex flex-col items-center lg:items-start group cursor-default">
              <span class="text-[9px] uppercase font-bold tracking-[0.4em] text-gray-400 mb-2"
                >Giá niêm yết</span
              >
              <div class="flex items-baseline gap-1">
                <span class="text-4xl font-light text-(--secondary) tracking-tighter"
                  >${{ book.donGia }}</span
                >
                <span class="text-lg text-(--secondary)">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spin-slow-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
.animate-spin-slow-reverse {
  animation: spin-slow-reverse 25s linear infinite;
}

.rounded-r-sm {
  border-radius: 0 4px 4px 0;
}
</style>
<script setup>
import bookService from '@/services/book.service'
import { onMounted, ref, nextTick } from 'vue'
import AOS from 'aos'

const { id } = defineProps({
  id: String,
})

const book = ref({})

onMounted(async () => {
  const data = await bookService.getBook(id)
  book.value = data
  await nextTick()
  AOS.refresh()
})
</script>
