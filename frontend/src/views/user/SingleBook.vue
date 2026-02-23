<template>
  <div class="w-full bg-(--bg-primary)">
    <BookDetail v-if="selectedBook" :book="selectedBook" :categories="bookCategoryNames" />

    <RelatedBook v-if="relatedBooks" :books="relatedBooks" />
  </div>
</template>

<script setup>
import BookDetail from '@/components/SingleBook/BookDetail.vue'
import RelatedBook from '@/components/SingleBook/RelatedBook.vue'
import bookService from '@/services/book.service'
import categoryService from '@/services/category.service'
import { computed, onMounted, ref, watch } from 'vue'
const props = defineProps({
  id: String,
})

const selectedBook = ref()
const relatedBooks = ref()
const categories = ref([])

const bookCategoryNames = computed(() => {
  if (!selectedBook.value || categories.value.length === 0) return []

  return selectedBook.value.maTheLoai.map((ma) => {
    const found = categories.value.find((cat) => cat.maTheLoai === ma)
    return found
  })
})

const loadData = async (maSach) => {
  selectedBook.value = null
  relatedBooks.value = null

  const data = await bookService.getBook(maSach)
  selectedBook.value = data

  categories.value = await categoryService.getCategories()

  if (selectedBook.value) {
    relatedBooks.value = await bookService.getRelatedBooks(selectedBook.value.maTheLoai[0])
  }
}
onMounted(() => {
  loadData(props.id)
})

watch(
  () => props.id,
  (newId) => {
    loadData(newId)
  },
)
</script>
