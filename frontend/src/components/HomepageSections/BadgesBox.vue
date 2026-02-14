<template>
  <div
    class="badge flex flex-col justify-end items-start min-w-66 min-h-43 bg-(--bg-primary) px-5 py-7.5 border border-(--bg-secondary) cursor-pointer relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
  >
    <h3 class="text-2xl z-1 transition-colors duration-300 group-hover:text-white">{{ title }}</h3>
    <p
      class="text-(--subtext-color) z-1 text-[12px] transition-colors duration-300 group-hover:text-white"
    >
      {{ subtext }}
    </p>
  </div>
</template>
<script setup>
const { title, subtext } = defineProps({
  title: String,
  subtext: String,
})
</script>
<style scoped>
.badge::after {
  content: '';
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 0%;
  left: 50%;
  top: 50%;
  transition: 0.5s ease;
  transform: translate(-150%, -50%);
  background-color: var(--primary);
}
.badge:hover::after {
  height: 100%;
  transform: translate(-50%, -50%);
}
</style>
