<template>
  <div v-if="image" class="w-full min-h-72 max-h-72 border overflow-hidden relative">
    <img
      :src="image"
      class="absolute w-full h-full object-cover object-center"
      alt=""
      loading="lazy"
    />
    <div
      class="h-full w-full flex flex-col justify-center items-center gap-2 absolute top-0 left-0 backdrop-brightness-70 backdrop-blur-sm"
    >
      <h3 class="text-5xl text-white font-light newsreaderFont">{{ title }}</h3>
      <ElBreadcrumb>
        <ElBreadcrumbItem v-for="(item, index) in paths" :key="index" :to="item.path" class="">
          <span class="text-white hover:text-(--primary) transition-colors duration-200">{{
            item.label
          }}</span>
        </ElBreadcrumbItem>
      </ElBreadcrumb>
    </div>
  </div>

  <div v-else class="w-full min-h-50 max-h-50 border overflow-hidden relative">
    <img
      src="../../public/breadcrumb.png"
      class="absolute w-full h-full object-cover object-center"
      alt=""
      loading="lazy"
    />
    <div
      class="h-full w-full flex flex-col justify-center items-center gap-2 absolute top-0 left-0 backdrop-brightness-70 backdrop-blur-sm"
    >
      <h3 class="text-5xl text-white font-light newsreaderFont">{{ title }}</h3>
      <ElBreadcrumb>
        <ElBreadcrumbItem v-for="(item, index) in paths" :key="index" :to="item.path" class="">
          <span class="text-white hover:text-(--primary) transition-colors duration-200">{{
            item.label
          }}</span>
        </ElBreadcrumbItem>
      </ElBreadcrumb>
    </div>
  </div>
</template>
<script setup>
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

const { title, paths } = defineProps({
  title: String,
  image: String,
  paths: Array,
  // [
  //   { label: 'Trang chủ', path: '/' },
  //   { label: 'Sách', path: '/book' },
  // ]
})
</script>
