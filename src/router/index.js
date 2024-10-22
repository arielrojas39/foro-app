import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import store from '@/store'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requirestAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  const requirestAuth = to.matched.some(record => record.meta.requirestAuth)
  const isAuthenticated = store.getters.isAuth

  if(requirestAuth && !isAuthenticated){
    next('/login')
  }else{
     next()
  }
})
export default router
