import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/layout/index'

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  name: 'home',
  component: HomeView
},

  {
    path: '/edit',
    name: 'edit',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/editor/index')
  },
    {
    path: '/view',
    name: 'view',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/viewer/index')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes

})

export default router
