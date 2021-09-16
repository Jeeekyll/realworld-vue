import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register'
import Login from "../views/Login";
import GlobalFeed from "../views/GlobalFeed";
import YourFeed from "../views/YourFeed";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: GlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: GlobalFeed
  },
  {
    path: '/profile/:slug',
    name: 'profile',
    component: GlobalFeed
  }

]

const router = new VueRouter({
  routes
})

export default router
