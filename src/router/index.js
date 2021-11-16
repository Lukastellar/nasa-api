import { createRouter, createWebHistory } from 'vue-router'
import Apod from '../views/Apod.vue'
import Calculator from '../views/Calculator.vue'
import Welcome from '../components/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/apod',
    name: 'Apod',
    component: Apod
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router