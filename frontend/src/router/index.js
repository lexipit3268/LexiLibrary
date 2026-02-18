import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  next()
})

export default router
