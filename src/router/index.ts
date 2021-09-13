import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   redirect: "/randomVideo",
  // },
  {
    path: "/randomVideo",
    name: "randomVideo",
    component: () =>
      import(/* webpackChunkName: "RandomVideo" */ "../views/RandomVideo.vue"),
  },
  {
    path: "/duplicateChecking",
    name: "duplicateChecking",
    component: () => import("../views/DuplicateChecking.vue"),
  },
  {
    path: "/zhijiangDict",
    name: "zhijiangDict",
    component: () => import("../views/ZhijiangDict.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
