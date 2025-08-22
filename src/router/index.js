import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: { guest: true },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('../views/TodoListView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/todos/new',
    name: 'TodoCreate',
    component: () => import('../views/TodoEditView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/todos/:id',
    name: 'TodoEdit',
    component: () => import('../views/TodoEditView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: () => import('../views/Page404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.guest && auth.isAuthenticated) {
    // Redirect to /todos after login
    next({ name: 'Todos' })
  } else {
    next()
  }
})

export default router
