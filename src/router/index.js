// import { createRouter, createWebHashHistory } from 'vue-router'
import * as VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const ShopCart = () => import('views/shopcart/ShopCart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/category', component: Category },
  { path: '/shopcart', component: ShopCart },
  { path: '/profile', component: Profile },
  { path: '/detail/:iid', component: Detail }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

export default router