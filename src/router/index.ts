import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/randomVideo",
    name: "randomVideo",
    component: () =>
      import(/* webpackChunkName: "RandomVideo" */ "../views/RandomVideo.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
