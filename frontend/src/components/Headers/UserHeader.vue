<template>
  <header
    class="sticky top-0 z-50 w-full shadow-sm flex items-center justify-center bg-white/70 backdrop-blur-md"
  >
    <div class="px-18 flex flex-row justify-between w-full max-w-380 min-h-20">
      <nav class="flex flex-row items-center gap-4 text-base flex-1">
        <div>
          <router-link to="/" v-slot="{ isExactActive }">
            <a href="/" :class="['isActive', isExactActive ? 'router-link-active' : '']">
              Trang chủ
            </a>
          </router-link>
        </div>

        <div>
          <router-link to="/book" class="isActive">Sách</router-link>
        </div>
        <div>
          <router-link to="/history" class="isActive">Lịch sử</router-link>
        </div>
        <div>
          <a href="#">Liên hệ</a>
        </div>
      </nav>

      <div class="flex flex-row justify-center items-center">
        <RouterLink to="/"> <h1 class="LexiLibrary">Lexilibrary</h1></RouterLink>
      </div>

      <div class="flex flex-row justify-end items-center gap-6 text-xl flex-1">
        <div>
          <router-link to="/book"><FontAwesomeIcon :icon="faSearch"></FontAwesomeIcon></router-link>
        </div>
        <div class="w-fit h-fit rounded-full">
          <el-dropdown placement="bottom">
            <el-button class="w-fit! h-fit! rounded-full! bg-transparent! mt-0.5">
              <el-avatar v-if="userRole !== 'guest'" :size="32" :src="userAvatar" fit="cover" />
              <FontAwesomeIcon v-else :icon="faUser" class="text-xl text-black"></FontAwesomeIcon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <template v-if="userRole === 'guest'">
                  <el-dropdown-item
                    ><router-link to="/login">Đăng nhập</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item
                    ><router-link to="/register">Đăng ký</router-link>
                  </el-dropdown-item>
                </template>

                <template v-else-if="userRole === 'user'">
                  <el-dropdown-item
                    ><router-link to="/me">Thông tin cá nhân</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>Sách đã mượn</el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout" class="logoutBtn"
                    >Đăng xuất
                  </el-dropdown-item>
                </template>

                <!-- <template v-else-if="userRole === 'staff'">
                  <el-dropdown-item divided @click="handleLogout" class="logoutBtn"
                    >Đăng xuất
                  </el-dropdown-item>
                </template> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div>
          <router-link to="/cart">
            <FontAwesomeIcon :icon="faCartShopping"></FontAwesomeIcon>
          </router-link>
        </div>
        <div>
          <a href="">
            <FontAwesomeIcon :icon="faBell"></FontAwesomeIcon>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.router-link-active.isActive {
  position: relative;
}

.router-link-active.isActive::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  width: 60%;
  height: 2px;
}
.el-button {
  width: fit-content;
  height: fit-content;
  padding: 0;
  border: none;
  border-radius: unset;
  outline: none;
}
.el-button:hover {
  background: transparent;
}

/* logout btn */
:deep(.el-dropdown-menu__item.logoutBtn) {
  color: #ef4444 !important;
  transition: all 0.2s ease;
}
:deep(.el-dropdown-menu__item.logoutBtn:hover) {
  background-color: #fef2f2 !important;
  color: #dc2626 !important;
}
</style>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartShopping, faSearch, faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()
const router = useRouter()

const userRole = computed(() => authStore.userRole)
const userAvatar = computed(() => {
  const hinhAnh = authStore.user?.image

  if (!hinhAnh) {
    return 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }

  return hinhAnh
})
const handleLogout = () => {
  authStore.logout()
  ElMessage.success('Đã đăng xuất khỏi hệ thống')
  router.push('/login')
}
</script>
