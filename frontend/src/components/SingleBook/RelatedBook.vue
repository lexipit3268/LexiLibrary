<template>
  <div class="flex flex-col px-30 gap-14 relative">
    <div class="absolute flex justify-between items-center top-0"></div>
    <img
      src="../../../public/single_line_flower.svg"
      alt=""
      class="absolute -rotate-90 -top-25 left-50 w-32"
      data-aos="zoom-in"
      data-aos-duration="2000"
      data-aos-delay="200"
    />
    <img
      src="../../../public/single_line_flower.svg"
      alt=""
      class="absolute rotate-90 -top-20 right-55 w-32"
      data-aos="zoom-in"
      data-aos-duration="2000"
      data-aos-delay="400"
    />
    <div class="flex flex-col items-center space-y-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-px bg-(--primary) opacity-50"></div>
        <span class="text-[10px] uppercase font-bold tracking-[0.4em] text-(--primary)"
          >Khám phá thêm</span
        >
        <div class="w-8 h-px bg-(--primary) opacity-50"></div>
      </div>

      <h3
        class="newsreaderFont text-5xl md:text-6xl text-(--secondary) italic tracking-tighter text-center"
      >
        Các ấn phẩm tương tự
      </h3>
    </div>
    <ElCarousel :interval="3000" height="480px" indicator-position="outside" arrow="never">
      <ElCarouselItem v-for="(group, index) in bookGroups" :key="index">
        <div class="flex justify-center gap-14 h-full">
          <BookCard
            v-for="book in group"
            :key="book.tenSach"
            :id="book.maSach"
            :title="book.tenSach"
            :author="book.tacGia"
            :image="book.hinhAnh"
            :price="book.donGia"
          />
        </div>
      </ElCarouselItem>
    </ElCarousel>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import BookCard from '../BookCard.vue'

const props = defineProps({
  books: {
    type: Array,
    default: () => [],
  },
})

const bookGroups = computed(() => {
  const groups = []
  const size = 4
  for (let i = 0; i < props.books.length; i += size) {
    groups.push(props.books.slice(i, i + size))
  }
  return groups
})
</script>

<style scoped>
:deep(.el-carousel__button) {
  background-color: var(--secondary);
}
</style>
