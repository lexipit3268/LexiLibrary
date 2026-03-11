<template>
  <div class="min-h-120 bg-pattern py-16 px-4">
    <RouterView v-if="authStore.userRole !== 'staff'"></RouterView>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
if (authStore.userRole === 'staff') {
  router.push('/staff/me')
}
</script>
