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
              :title="book.title"
              :author="book.author"
              :price="book.price"
              :image="book.image"
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
const books = [
  {
    title: 'Mắt biếc',
    author: 'Nguyễn Nhật Ánh',
    price: 500,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_01372019_043734.jpg',
  },
  {
    title: 'Tiệm sách của nàng',
    author: 'Nguyễn Nhật Ánh',
    price: 450,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_25412024_024109.jpg',
  },
  {
    title: 'Cô gái đến từ hôm qua',
    author: 'Nguyễn Nhật Ánh',
    price: 480,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_06202025_092033.jpg',
  },
  {
    title: 'Tôi thấy hoa vàng trên cỏ xanh',
    author: 'Nguyễn Nhật Ánh',
    price: 520,
    image: 'https://www.nxbtre.com.vn/Images/Book/NXBTreStoryFull_02482010_104821.jpg',
  },
  {
    title: 'Ngồi khóc trên cây',
    author: 'Nguyễn Nhật Ánh',
    price: 400,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_31252025_082543.jpg',
  },
]
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
