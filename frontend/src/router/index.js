import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        { path: '', name: 'homePage', component: () => import('../views/user/HomePage.vue') },
        { path: 'book', name: 'bookPage', component: () => import('../views/user/BookView.vue') },
      ],
    },
  ],
})

export default router
