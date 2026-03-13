<template>
  <div class="cart-page-container min-h-screen bg-(--bg-color)">
    <BreadcrumbComponent :title="title" :paths="paths" />

    <div class="max-w-4xl mx-auto py-10 px-6">
      <ElSteps :active="currentStep" align-center finish-status="success" class="custom-steps">
        <ElStep
          data-aos="flip-up"
          data-aos-delay="100"
          title="Kiểm tra"
          description="Giỏ hàng hiện tại"
        />
        <ElStep
          data-aos="flip-up"
          data-aos-delay="300"
          title="Phiếu mượn"
          description="Thông tin chi tiết phiếu"
        />
        <ElStep
          data-aos="flip-up"
          data-aos-delay="500"
          title="Hoàn tất"
          description="Chờ nhận sách"
        />
      </ElSteps>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue'
import { ElStep, ElSteps } from 'element-plus'

const route = useRoute()

const currentStep = computed(() => {
  if (route.path === '/cart') return 0
  if (route.path === '/cart/checkout') return 1
  return 0
})

let paths = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Giỏ hàng', path: '/cart' },
]

let title = 'Giỏ hàng'

if (route.fullPath == '/cart/checkout') {
  title = 'Lập phiếu mượn'
  paths.push({ label: 'Lập phiếu mượn', path: '/cart/checkout' })
}
</script>

<style scoped>
:deep(.el-step__title) {
  font-family: 'Newsreader', serif;
  font-weight: 500;
  font-size: 1.2rem;
}
:deep(.el-step__head.is-process) {
  color: var(--primary);
  border-color: var(--primary);
}
:deep(.el-step__title.is-process) {
  color: var(--primary);
}

:deep(.el-step__icon.is-text) {
  padding: 1rem;
  border-radius: 0;
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s ease;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
