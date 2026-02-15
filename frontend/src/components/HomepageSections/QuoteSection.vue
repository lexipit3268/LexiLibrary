<script setup lang="ts">
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ElDivider } from 'element-plus'
</script>

<template>
  <div class="w-full h-185 py-25">
    <div class="overflow-hidden h-full relative">
      <img
        loading="lazy"
        src="../../../public/pexels-minan1398-1291486.jpg"
        alt=""
        class="object-cover h-full w-full object-center"
      />
      <div
        class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-12 backdrop-blur-xs backdrop-brightness-70"
      >
        <FontAwesomeIcon :icon="faQuoteLeft" class="text-white text-5xl" />
        <div class="text-white w-[75%] flex flex-col gap-4">
          <p class="newsreaderFont font-light text-5xl leading-14 text-center">
            Người ta chỉ có thể nhìn thấy rõ ràng bằng trái tim. Những gì cốt lõi nhất thì mắt
            thường không thể thấy được, nhưng có thể tìm thấy trong những trang sách.
          </p>
          <div class="flex items-center justify-end gap-6 w-full pr-25">
            <ElDivider class="w-90!" />
            <p>Antoine de Saint-Exupéry</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
