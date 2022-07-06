import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/demo",
    component: () => import("@/views/demo"),
  },
  {
    path: "/",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
