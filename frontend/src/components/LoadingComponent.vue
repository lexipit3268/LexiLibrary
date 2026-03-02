<template>
  <div
    :class="[
      props.type === 'fixed' ? 'fixed' : 'absolute',
      'inset-0 bg-black/30 z-50 flex items-center justify-center',
    ]"
    :style="{
      minWidth: `calc(100% - ${minusW}px)`,
      minHeight: `calc(100% - ${minusH}px)`,
    }"
  >
    <span class="loader"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'fixed',
  },
  minusH: { type: Number, default: 0 },
  minusW: { type: Number, default: 0 },
})
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';
  width: 48px;
  height: 48px;
  border: 4px solid #fff;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  animation: rotation 2s ease-in-out infinite;
}
.loader::after {
  /* Đảm bảo --primary đã được định nghĩa ở global CSS hoặc thay bằng mã màu (vd: #ff0000) */
  border-color: var(--primary, #3b82f6);
  animation-delay: 1s;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
