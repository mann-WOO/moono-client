import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '@/views/Movies.vue'
import MovieDetail from '@/views/MovieDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movies/:id',
    name: 'MovieDetail',
    component: MovieDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
