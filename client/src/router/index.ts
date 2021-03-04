import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Info from "../views/Info.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/app",
    name: "Main",
    component: Main
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/onas",
    name: "About",
    component: About
  },
  {
    path: "/info",
    name: "Info",
    component: Info
  }
];
// which is lazy-loaded when the route is visited.
//    component: () =>
//      import(/* webpackChunkName: "about" */ "../views/About.vue")
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
