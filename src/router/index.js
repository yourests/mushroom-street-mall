// import { createRouter, createWebHashHistory } from 'vue-router'
import * as VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const ShopCart = () => import('views/shopcart/ShopCart')
const Profile = () => import('views/profile/Profile')

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', meta: { title: '主页' }, component: Home },
  { path: '/category', meta: { title: '分类' }, component: Category },
  { path: '/shopcart', component: ShopCart },
  { path: '/profile', component: Profile }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

export default router