import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import DocCreate from "../components/DocCreate.vue";
import Calendar from "../views/Calendar.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/doc-create",
    name: "DocCreate",
    component: DocCreate,
  },
  {
    path: "/documents",
    name: "Documents",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Documents.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
