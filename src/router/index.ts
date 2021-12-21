import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/ingredientChecking"
  },
  {
    path: "/randomVideo",
    name: "randomVideo",
    component: () => import(/* webpackChunkName: "RandomVideo" */ "../views/RandomVideo.vue")
  },
  {
    path: "/duplicateChecking",
    name: "duplicateChecking",
    component: () => import(
      /* webpackChunkName: "DuplicateChecking" */ "../views/DuplicateChecking.vue"
    )
  },
  {
    path: "/zhijiangDict",
    name: "zhijiangDict",
    component: () => import(
      /* webpackChunkName: "ZhijiangDict" */ "../views/ZhijiangDict.vue"
    )
  },
  {
    path: "/emojicollect",
    name: "emojicollect",
    component: () => import(
      /* webpackChunkName: "Emojicollect" */ "../views/EmojiCollection.vue"
    )
  },
  {
    path: "/ingredientChecking",
    name: "ingredientChecking",
    component: () => import(
      /* webpackChunkName: "IngredientChecking" */ "../views/IngredientChecking.vue"
    )
  },
  {
    path: "/ZhijiangDebts",
    name: "ZhijiangDebts",
    component: () => import(
      /* webpackChunkName: "ZhijiangDebts" */ "../views/ZhijiangDebts.vue"
    )
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
