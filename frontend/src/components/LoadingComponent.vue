<template>
  <div
    class="fixed inset-0 min-w-[calc(100%-264px)] min-h-[calc(100%-80px)] bg-black/30 z-50 flex items-center justify-center"
  >
    <span class="loader"></span>
  </div>
</template>
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
  border-color: var(--primary);
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
