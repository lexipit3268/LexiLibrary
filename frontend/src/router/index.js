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
      ],
    },
  ],
})

export default router
