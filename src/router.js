import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/Login'
// const Login = () => import('./components/Login.vue')
import Home from './components/Home'
// const Home = () => import('./components/Home.vue')
import Welcome from './components/Welcome'
// const Welcome = () => import('./components/Welcome.vue')

import Users from './components/Users'
// const Users = () => import('./components/user/Users.vue')
import Rights from './components/Permissions/Rights'
// const Rights = () => import('./components/power/Rights.vue')
import Roles from './components/Permissions/Roles'
// const Roles = () => import('./components/power/Roles.vue')

import Categories from './components/Goods/Categories'
// const Cate = () => import('./components/goods/Cate.vue')
import Params from './components/Goods/Params'
// const Params = () => import('./components/goods/Params.vue')

import GoodsList from './components/Goods/GoodsList'
// const GoodsList = () => import('./components/goods/List.vue')
import AddGoods from './components/Goods/GoodsList/AddGoods'
// const Add = () => import('./components/goods/Add.vue')

import Order from './components/Order'
// const Order = () => import('./components/order/Order.vue')
import Report from './components/Report'
// const Report = () => import('./components/report/Report.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Categories },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: AddGoods },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report }
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问登录页，直接放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果没有token信息，强制跳转登录
  if (!tokenStr) return next('/login')
  // 如果有token信息，可以登录
  next()
})

export default router
