import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  /* webpackChunkName: "about" */
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  { path: '/test', name: 'test', component: () => import('@/views/test.vue') },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  }
]

const router = createRouter({
  // mode: 'history', // require service support
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
