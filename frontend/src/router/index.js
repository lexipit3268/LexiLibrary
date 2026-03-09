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
      alias: '/home',
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
              props: true,
              component: () => import('../views/user/SingleBook.vue'),
              meta: { title: 'Sách - LexiLibrary' },
            },
          ],
        },
        {
          path: 'cart',
          name: 'cart-page',
          component: () => import('../views/user/CartView.vue'),
          meta: { title: 'Giỏ hàng' },
        },
        {
          path: 'me',
          name: 'user-profile',
          component: () => import('../views/user/UserProfile.vue'),
          meta: { title: 'Thông tin cá nhân', requiresAuth: true },
          children: [
            {
              path: '',
              name: 'public-profile',
              component: () => import('../components/UserProfile/MainProfile.vue'),
            },
            {
              path: 'edit',
              name: 'edit-profile',
              component: () => import('../components/UserProfile/EditProfile.vue'),
              meta: { title: 'Chỉnh sửa thông tin cá nhân' },
            },
            {
              path: 'edit/password',
              name: 'edit-password',
              component: () => import('../components/UserProfile/EditPassword.vue'),
              meta: { title: 'Thay đổi mật khẩu' },
            },
          ],
        },
      ],
    },

    // Staff
    {
      path: '/staff',
      name: 'staff-homepage',
      component: () => import('../layouts/StaffLayout.vue'),
      meta: {
        title: 'Nhân viên - LexiLibrary',
        requiresAuth: true,
        role: 'staff',
      },
      children: [
        {
          path: '',
          name: 'staff-dashboard',
          component: () => import('../views/staff/StaffDashboard.vue'),
        },
        {
          path: 'book',
          name: 'books-management',
          component: () => import('../components/StaffBooksManagement/BookManagementLayout.vue'),
          meta: { title: 'Quản lý sách' },
          children: [
            {
              path: '',
              name: 'books-management-main',
              component: () => import('../components/StaffBooksManagement/BooksManagement.vue'),
            },
            {
              path: 'create',
              name: 'create-book',
              component: () => import('../components/StaffBooksManagement/BookForm.vue'),
            },
            {
              path: 'edit/:maSach',
              name: 'edit-book',
              component: () => import('../components/StaffBooksManagement/BookForm.vue'),
              props: true,
            },
            {
              path: ':maSach',
              name: 'book-details-management',
              component: () => import('../components/StaffBooksManagement/StaffBookDetails.vue'),
              props: true,
            },
          ],
        },

        {
          path: 'publisher',
          name: 'publishers-management',
          component: () => import('../components/StaffPublishersMng/PublishersManagement.vue'),
          meta: { title: 'Quản lý nhà xuất bản' },
        },
        {
          path: 'borrowing-history',
          name: 'borrowing-management',
          component: () => import('../components/StaffDashboard/BorrowingManagement.vue'),
          meta: { title: 'Quản lý nhà mượn trả' },
        },
        {
          path: 'me',
          name: 'staff-profile',
          component: () => import('../views/staff/StaffProfile.vue'),
          meta: { title: 'Trang nhân viên' },
        },
      ],
    },

    //auth
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/AccessForm.vue'),
      props: {
        formType: LoginForm,
      },
      meta: { guestOnly: true },
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
    return next('/login')
  }

  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return next('/')
  }

  if (to.meta.role && authStore.userRole !== to.meta.role) {
    ElMessage.error('Bạn không có quyền truy cập vào khu vực này!')
    return next('/')
  }

  next()
})

export default router
