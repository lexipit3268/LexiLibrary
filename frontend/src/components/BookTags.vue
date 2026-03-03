<template>
  <div class="flex flex-wrap gap-x-3 gap-y-2 max-w-120">
    <button
      v-for="(cate, index) in props.categories"
      :key="index"
      class="text-[11px] uppercase tracking-[0.15em] font-semibold px-3 py-1.5 border border-amber-900/10 bg-amber-50/50 text-amber-900/60 hover:bg-amber-100 hover:text-(--primary) hover:border-amber-900/20 transition-all duration-300 cursor-pointer shadow-[2px_2px_0px_rgba(212,140,106,0.05)] active:translate-y-px active:shadow-none"
      @click="router.push({ name: 'book-page', query: { category: cate.maTheLoai } })"
    >
      {{ cate.tenTheLoai }}
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  categories: Array,
})
</script>

<style scoped></style>
