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
  {
    path: "/search",
    component: () => import("@/views/search"),
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: () => import("@/views/article"),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
