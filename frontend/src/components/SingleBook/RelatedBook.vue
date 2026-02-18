<template>
  <div class="flex flex-col px-30 gap-16">
    <p class="newsreaderFont text-5xl text-center">Sách tương tự</p>
    <ElCarousel :interval="4000" height="480px" indicator-position="outside" arrow="never">
      <ElCarouselItem v-for="(group, index) in bookGroups" :key="index">
        <div class="flex justify-center gap-14 h-full">
          <BookCard
            v-for="book in group"
            :key="book.title"
            :title="book.title"
            :author="book.author"
            :image="book.image"
            :price="book.price"
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
