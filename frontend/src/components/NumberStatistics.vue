<template>
  <div class="bg-pattern flex flex-row items-center justify-center bg-(--bg-secondary)">
    <div class="grid grid-cols-4 place-content-center items-center text-center h-40 min-w-250">
      <div
        v-for="(item, index) in transitionedItems"
        :key="index"
        class="newsreaderFont font-light"
      >
        <div class="text-[1.2rem]">{{ item.text }}</div>
        <div class="flex flex-row justify-center items-center">
          <ElStatistic :value="item.displayValue" :precision="0" />
          <p class="text-[3rem]">+</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElStatistic } from 'element-plus'
import { useTransition } from '@vueuse/core'

const items = [
  { text: 'Dấu ấn', number: 25 },
  { text: 'Tác giả', number: 120 },
  { text: 'Đối tác', number: 32 },
  { text: 'Thể loại', number: 68 },
]

const transitionedItems = items.map((item) => {
  const source = ref(0)
  const output = useTransition(source, { duration: 4000 })

  source.value = item.number

  return {
    ...item,
    displayValue: computed(() => Math.floor(output.value)),
  }
})
</script>

<style scoped>
:deep(.el-statistic__number) {
  font-size: 3rem !important;
}
</style>
