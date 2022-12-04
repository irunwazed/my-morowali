import { createRouter, createWebHistory } from "vue-router";
import PageIndex from "../views/PageIndex.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: PageIndex,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/AboutView.vue"),
  },
  {
    path: "/entri-data",
    name: "entri-data",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/ViewPenduduk.vue"),
  },
  {
    path: "/data-penyakit",
    name: "data-penyakit",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/ViewPenyakit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
