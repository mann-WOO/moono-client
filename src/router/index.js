import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '@/views/Movies.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import Articles from '@/views/Articles.vue'
import ArticleNew from '@/views/ArticleNew.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import ArticleUpdate from '@/views/ArticleUpdate.vue'
import Profile from '@/views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  // Home
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Movies App
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movies/:id',
    name: 'MovieDetail',
    component: MovieDetail,
  },
  // Accounts App
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/accounts/:username',
    name: 'Profile',
    component: Profile
  },
  // Articles App
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/articles/new',
    name: 'ArticleNew',
    component: ArticleNew
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/articles/:id/update',
    name: 'ArticleUpdate',
    component: ArticleUpdate
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
