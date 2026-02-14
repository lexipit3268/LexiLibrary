<script setup lang="ts">
import MainTitle from '../MainTitle.vue'
import CategoriesSilder from './CategoriesSlider.vue'
</script>

<template>
  <div class="py-10 h-fit">
    <MainTitle
      class="pl-18"
      type="row"
      title="Thể loại"
      subtext="Đa dạng chủ đề, phong phú lựa chọn."
    />
    <div class="flex relative overflow-hidden min-h-110 py-8">
      <div class="w-4xl"></div>
      <img
        src="../../../public/reading_singleline.svg"
        alt=""
        class="absolute left-6 top-20 w-139"
      />
      <CategoriesSilder />
    </div>
  </div>
</template>
