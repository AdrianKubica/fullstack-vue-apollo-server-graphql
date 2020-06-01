import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Home from "../components/Home.vue"

import AddPost from "../components/posts/AddPost.vue"
import Posts from "../components/posts/Posts.vue"

import Profile from "../components/auth/Profile.vue"
import Signup from "../components/auth/Signup.vue"
import Signin from "../components/auth/Signin.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/posts",
    name: "posts",
    component: Posts,
  },
  {
    path: "/posts/add",
    name: "postsadd",
    component: AddPost,
  },
  // {
  //   path: "/about",
  //   name: "About",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () =>
  //   import(/* webpackChunkName: "about" */ "../views/About.vue")
  // },
]

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
})

export default router
