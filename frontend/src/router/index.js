import LoginForm from '@/components/AccessForm/LoginForm.vue'
import RegisterForm from '@/components/AccessForm/RegisterForm.vue'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // client
    {
      path: '/',
      name: 'home',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home-page',
          component: () => import('../views/user/HomePage.vue'),
        },
        {
          path: 'book',
          children: [
            {
              path: '',
              name: 'book-page',
              component: () => import('../views/user/BookView.vue'),
              meta: { title: 'Sách - LexiLibrary' },
            },
            {
              path: ':id', //   /book/:id
              name: 'single-book',
              component: () => import('../views/user/SingleBook.vue'),
              meta: { title: 'Sách - LexiLibrary' },
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/AccessForm.vue'),
      props: {
        formType: LoginForm,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/AccessForm.vue'),
      props: {
        formType: RegisterForm,
      },
    },
    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'LexiLibrary'
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    ElMessage.warning('Vui lòng đăng nhập để tiếp tục')
    next('/login')
  } else if (to.meta.role && authStore.userRole !== to.meta.role) {
    ElMessage.error('Bạn không có quyền truy cập vào khu vực này!')
    next('/')
  } else {
    next()
  }
})

export default router
