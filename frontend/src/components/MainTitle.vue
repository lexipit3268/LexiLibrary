<template>
  <div v-if="!type" class="flex flex-col justify-center items-center mt-4 mb-14 gap-4">
    <h3 class="newsreaderFont text-6xl">{{ title }}</h3>
    <ElDivider class="w-32! border-black! m-0!"></ElDivider>
  </div>
  <div v-else-if="type == 'row'" class="flex justify-start items-center gap-8">
    <ElDivider class="w-36! border-black! m-0!" />
    <div>
      <h3 class="newsreaderFont text-6xl">{{ title }}</h3>
      <p class="text-(--subtext-color) max-w-125">
        {{ subtext }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { ElDivider } from 'element-plus'
const { title, subtext, type } = defineProps({
  title: String,
  type: String,
  subtext: String,
})
</script>
