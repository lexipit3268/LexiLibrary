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
          component: () => import('../views/HomePage.vue'),
        },
        {
          path: 'book',
          children: [
            {
              path: '',
              name: 'book-page',
              component: () => import('../views/BookView.vue'),
              meta: { title: 'Sách - LexiLibrary' },
            },
            {
              path: ':id', //   /book/:id
              name: 'single-book',
              props: true,
              component: () => import('../views/SingleBook.vue'),
              meta: { title: 'Sách - LexiLibrary' },
            },
          ],
        },
        {
          path: 'cart',
          name: 'cart-page',
          component: () => import('../views/user/CartView.vue'),
          meta: { title: 'Giỏ mượn' },
          children: [
            {
              path: '',
              name: 'cart-list',
              component: () => import('../components/Cart/CartList.vue'),
            },
            {
              path: 'checkout',
              name: 'checkout-form',
              component: () => import('../components/Cart/CheckoutForm.vue'),
              meta: { title: 'Lập phiếu mượn' },
            },
            {
              path: 'finish',
              name: 'finish-page',
              component: () => import('../components/Cart/FinishPage.vue'),
              meta: { title: 'Mượn thành công' },
            },
          ],
        },
        {
          path: 'history',
          name: 'borrowing-history',
          component: () => import('../views/user/BorrowingHistory.vue'),
          meta: { title: 'Lịch sử mượn' },
        },
        {
          path: 'favorite',
          name: 'favorite-page',
          component: () => import('../views/user/FavoriteView.vue'),
          meta: { title: 'Danh sách yêu thích', requiresAuth: true, role: 'user' },
        },
        { path: 'contact', name: 'contact-us', component: () => import('../views/ContactUs.vue') },
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
          path: 'user',
          name: 'user-management',
          component: () => import('../components/StaffDashboard/UserManagement.vue'),
          meta: { title: 'Quản lý độc giả' },
        },
        {
          path: 'borrowing-management',
          name: 'borrowing-management',
          component: () => import('../components/StaffBorrowingManagement/BorrowingManagement.vue'),
          meta: { title: 'Quản lý mượn trả' },
        },
        {
          path: 'borrowing-management/:maPhieu',
          name: 'borrowing-details',
          component: () => import('../components/StaffBorrowingManagement/BorrowingDetails.vue'),
          meta: { title: 'Chi tiết phiếu mượn' },
          props: true,
        },

        {
          path: 'analytics',
          name: 'analytics-page',
          component: () => import('../components/StaffDashboard/AnalyticsPage.vue'),
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
    if (to.path === from.path) {
      return false
    }
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
    ElMessage({
      type: 'warning',
      message: 'Bạn không có quyền truy cập vào khu vực này!',
      offset: 100,
    })
    return next('/')
  }

  next()
})

export default router
