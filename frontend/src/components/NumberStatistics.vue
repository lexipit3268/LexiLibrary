<template>
  <div class="bg-pattern flex flex-row items-center justify-center bg-(--bg-secondary) flex-1">
    <div class="grid grid-cols-4 place-content-center items-center text-center min-h-40 min-w-250">
      <div v-for="(item, index) in items" :key="index" class="newsreaderFont font-light">
        <div class="text-[1.2rem]">{{ item.text }}</div>
        <div class="flex flex-row justify-center items-center">
          <Vue3Autocounter
            :startAmount="0"
            :endAmount="item.number"
            suffix="+"
            :duration="4"
            class="text-[3rem] font-normal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Vue3Autocounter from 'vue3-autocounter'

const items = [
  { text: 'Dấu ấn', number: 25 },
  { text: 'Tác giả', number: 120 },
  { text: 'Đối tác', number: 32 },
  { text: 'Thể loại', number: 68 },
]
</script>

<style scoped>
:deep(.el-statistic__number) {
  font-size: 3rem !important;
}
</style>
