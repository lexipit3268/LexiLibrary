<template>
  <div class="bg-pattern flex flex-row items-center justify-center bg-(--bg-secondary) flex-1">
    <div class="grid grid-cols-4 place-content-center items-center text-center min-h-40 min-w-250">
      <div v-for="(item, index) in items" :key="index" class="newsreaderFont font-light">
        <div class="text-[1.2rem]">{{ item.text }}</div>
        <div class="flex flex-row justify-center items-center">
          <CountUp
            :from="item.number"
            :to="685"
            :duration="4"
            delay="0"
            direction="down"
            class="text-[3rem] font-normal"
          />
          <span class="text-[3rem] font-normal">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CountUp from '@/components/vuebits/CountUp/CountUp.vue'

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
