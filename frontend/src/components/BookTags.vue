<template>
  <div class="flex flex-wrap gap-2 max-w-120">
    <ElTag
      v-for="(cate, index) in props.categories"
      :key="index"
      effect="light"
      class="text-(--subtext-color)! bg-amber-600/20! border-amber-600/20! cursor-pointer"
    >
      {{ cate }}</ElTag
    >
  </div>
</template>
<script setup>
import { ElTag } from 'element-plus'

const props = defineProps({
  categories: Array,
})
</script>
