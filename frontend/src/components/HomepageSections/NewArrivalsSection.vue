<template>
  <div class="min-h-214 py-14">
    <MainTitle title="Sách mới cập nhật" divider></MainTitle>
    <div class="h-fit cursor-e-resize flex flex-col justify-center items-center">
      <div class="w-full">
        <Splide
          :options="splideOptions"
          :extensions="{ AutoScroll }"
          aria-label="Sách mới cập nhật"
        >
          <SplideSlide v-for="(book, index) in books" :key="index">
            <BookCard
              :id="book.maSach"
              :title="book.tenSach"
              :author="book.tacGia"
              :price="book.donGia"
              :image="book.hinhAnh"
              :quantity="book.soQuyen"
            />
          </SplideSlide>
        </Splide>
      </div>
      <router-link to="/book">
        <button type="button" class="primary-btn cta-btn">
          Xem tất cả
          <FontAwesomeIcon :icon="faArrowRight"></FontAwesomeIcon></button
      ></router-link>
    </div>
  </div>
</template>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import BookCard from '../BookCard.vue'
import MainTitle from '../MainTitle.vue'
import '@splidejs/vue-splide/css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { onMounted, ref } from 'vue'
import BookService from '@/services/book.service'

const books = ref([])
onMounted(async () => {
  const data = await BookService.getBooks()
  books.value = data.slice(-10)
})

const splideOptions = {
  type: 'loop',
  drag: 'free',
  focus: 'center',
  arrows: false,
  pagination: false,
  autoWidth: true,
  gap: '40px',
  autoScroll: {
    speed: 0.6,
    pauseOnHover: true,
  },
  breakpoints: {
    1024: { perPage: 3, padding: { left: '30px', right: '30px' } },
    768: { perPage: 2, padding: 0 },
  },
}
</script>

<style scoped></style>
