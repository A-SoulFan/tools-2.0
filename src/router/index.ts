import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/randomVideo',
  },
  {
    path: '/randomVideo',
    name: 'randomVideo',
    component: () =>
      import(/* webpackChunkName: "RandomVideo" */ '../views/RandomVideo.vue'),
  },
  {
    path: '/duplicateChecking',
    name: 'duplicateChecking',
    component: () =>
      import(
        /* webpackChunkName: "DuplicateChecking" */ '../views/DuplicateChecking.vue'
      ),
  },
  {
    path: '/zhijiangDict',
    name: 'zhijiangDict',
    component: () =>
      import(
        /* webpackChunkName: "ZhijiangDict" */ '../views/ZhijiangDict.vue'
      ),
  },
  {
    path: '/emojicollect',
    name: 'emojicollect',
    component: () =>
      import(
        /* webpackChunkName: "Emojicollect" */ '../views/EmojiCollection.vue'
      ),
  },
  {
    path: '/ingredientChecking',
    name: 'ingredientChecking',
    component: () =>
      import(
        /* webpackChunkName: "IngredientChecking" */ '../views/IngredientChecking.vue'
      ),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
