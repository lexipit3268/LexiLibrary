<script setup>
import {
  faArrowRightFromBracket,
  faBook,
  faChartBar,
  faClockRotateLeft,
  faHouse,
  faPeopleRoof,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  ElMessage.success('Đã đăng xuất khỏi hệ thống')
  router.push('/login')
}
</script>

<template>
  <div
    class="sticky top-0 min-w-66 max-w-66 h-screen bg-white flex flex-col justify-between shadow-sm border-r border-(--bg-tertiary)"
  >
    <!-- logo  -->
    <div class="text-center min-h-20 py-2 border-b border-(--bg-tertiary) shadow-xs">
      <router-link to="/">
        <h1 class="LexiLibrary text-(--primary)">Lexilibrary</h1>
      </router-link>
      <p class="staff-tag uppercase tracking-widest font-bold mt-1 opacity-70">
        Nhân viên thư viện
      </p>
    </div>

    <!--side menu -->
    <div class="flex flex-col justify-between h-full p-6">
      <div>
        <p class="menu-label font-bold uppercase tracking-[0.15em] mb-4 px-2 opacity-60">
          Menu chính
        </p>
        <div class="flex flex-col gap-1.5">
          <router-link to="/staff" v-slot="{ isExactActive, navigate }">
            <div @click="navigate" :class="['nav-item', isExactActive ? 'active' : '']">
              <FontAwesomeIcon :icon="faChartBar" class="w-5" />
              <p>Bảng điều khiển</p>
            </div>
          </router-link>

          <router-link to="/staff/book" v-slot="{ isActive, navigate }">
            <div @click="navigate" :class="['nav-item', isActive ? 'active' : '']">
              <FontAwesomeIcon :icon="faBook" class="w-5" />
              <p>Quản lý sách</p>
            </div>
          </router-link>

          <router-link to="/staff/publisher" v-slot="{ isExactActive, navigate }">
            <div @click="navigate" :class="['nav-item', isExactActive ? 'active' : '']">
              <FontAwesomeIcon :icon="faPeopleRoof" class="w-5" />
              <p>Nhà xuất bản</p>
            </div>
          </router-link>

          <router-link to="/staff/user" v-slot="{ isExactActive, navigate }">
            <div @click="navigate" :class="['nav-item', isExactActive ? 'active' : '']">
              <FontAwesomeIcon :icon="faUsers" class="w-5" />
              <p>Quản lý độc giả</p>
            </div>
          </router-link>
          <router-link to="/staff/borrowing-history" v-slot="{ isExactActive, navigate }">
            <div @click="navigate" :class="['nav-item', isExactActive ? 'active' : '']">
              <FontAwesomeIcon :icon="faClockRotateLeft" class="w-5" />
              <p>Lịch sử mượn</p>
            </div>
          </router-link>
        </div>
      </div>

      <div>
        <p class="menu-label font-bold uppercase tracking-[0.15em] mb-4 px-2 opacity-60">Khác</p>
        <div class="flex flex-col gap-1.5">
          <router-link to="/">
            <div class="nav-item">
              <FontAwesomeIcon :icon="faHouse" class="w-5" />
              <p>Trang chủ</p>
            </div>
          </router-link>
          <router-link to="/staff/me" v-slot="{ isExactActive, navigate }">
            <div @click="navigate" :class="['nav-item', isExactActive ? 'active' : '']">
              <FontAwesomeIcon :icon="faUser" class="w-5" />
              <p>Thông tin cá nhân</p>
            </div>
          </router-link>
          <button
            @click="handleLogout"
            class="logout-btn text-(--subtext-color) flex items-center gap-3 w-full px-4 py-3 transition-all duration-300 cursor-pointer"
          >
            <FontAwesomeIcon :icon="faArrowRightFromBracket" />
            <span class="font-bold text-sm">Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.LexiLibrary {
  font-size: 1.8rem;
}

.staff-tag {
  font-size: 10px;
  color: var(--subtext-color);
}

.menu-label {
  font-size: 11px;
  color: var(--subtext-color);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 300ms ease;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--subtext-color);
  background-color: transparent;
}

.nav-item:hover {
  background-color: var(--bg-primary);
  color: var(--primary);
}

.nav-item.active {
  background-color: var(--bg-primary);
  color: var(--primary);
  font-weight: 700;
  box-shadow: inset 4px 0 0 var(--primary);
}

.logout-btn {
  color: var(--subtext-color);
}

.logout-btn:hover {
  background-color: #fef2f2;
  color: #ef4444;
}
</style>
