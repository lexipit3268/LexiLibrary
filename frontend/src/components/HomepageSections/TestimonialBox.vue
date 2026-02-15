<template>
  <div class="flex flex-col bg-white w-95.25 h-94.75 p-10 gap-4 shadow-md">
    <FontAwesomeIcon :icon="faQuoteLeft" class="text-4xl text-(--secondary)" />
    <div class="flex flex-col px-1.5 h-full">
      <p class="newsreaderFont text-[20px] flex-1 place-content-center">{{ comment }}</p>
      <div class="flex justify-start items-center gap-4">
        <img v-if="avatar" :src="avatar" alt="" class="w-19.25 h-19.25 rounded-full" />
        <div
          v-else
          class="w-19.25 h-19.25 flex justify-center items-center bg-gray-200 rounded-full"
        >
          <FontAwesomeIcon :icon="faUser" class="text-3xl" />
        </div>
        <div>
          <p class="newsreaderFont text-lg">{{ name }}</p>
          <p class="text-xs">{{ infor }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { avatar, name, infor, comment } = defineProps({
  avatar: String,
  name: String,
  infor: String,
  comment: String,
})
</script>
