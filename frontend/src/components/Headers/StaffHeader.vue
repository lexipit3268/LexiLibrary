<template>
  <div
    class="sticky top-0 z-50 w-full h-20 flex items-center justify-between px-6 border-b border-(--bg-tertiary) bg-white/70 backdrop-blur-md"
  >
    <div>
      <h3 class="text-2xl" v-if="route.name === 'staff-dashboard'">
        Chào mừng trở lại, <span class="font-semibold">{{ staff.name }}</span
        >!
      </h3>

      <h3
        class="text-2xl font-semibold"
        v-else-if="
          ['books-management-main', 'book-details-management', 'create-book', 'edit-book'].includes(
            route.name,
          )
        "
      >
        Quản lý sách
      </h3>

      <h3 class="text-2xl font-semibold" v-else-if="route.name === 'publishers-management'">
        Nhà xuất bản
      </h3>

      <h3 class="text-2xl font-semibold" v-else-if="route.name === 'borrowing-management'">
        Lịch sử mượn
      </h3>

      <h3 class="text-2xl font-semibold" v-else-if="route.name === 'staff-profile'">
        Thông tin cá nhân
      </h3>
    </div>

    <div class="flex items-center gap-6">
      <div class="flex items-center gap-4">
        <ElBadge :value="32" type="primary" :offset="[-2, 2]">
          <ElTooltip content="Xem thư">
            <div class="staff-header-icon">
              <FontAwesomeIcon :icon="faEnvelope" /></div
          ></ElTooltip>
        </ElBadge>

        <ElBadge :value="68" type="primary" :offset="[-2, 2]">
          <ElTooltip content="Thông báo">
            <div class="staff-header-icon">
              <FontAwesomeIcon :icon="faBell" /></div
          ></ElTooltip>
        </ElBadge>
      </div>
      <!-- staff infor -->
      <div class="flex items-center gap-2">
        <div
          class="flex items-center justify-center h-fit w-fit place-items-center rounded-full border-2 border-(--secondary)"
        >
          <ElAvatar :src="staff.image" :size="42" />
        </div>
        <div class="text-xs">
          <p class="">{{ staff.name }}</p>
          <p class="capitalize text-(--subtext-color)">{{ staff.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth'
import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ElAvatar, ElBadge, ElTooltip } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()
const staff = authStore.user
</script>
