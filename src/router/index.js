import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Übersicht" },
  },
  {
    path: "/packaging/specification",
    name: "Specification",
    component: () => import(/* webpackChunkName: "specification" */ "../views/Specification.vue"),
    meta: { title: "Spezifikationen" },
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: () => import(/* webpackChunkName: "imprint" */ "../views/provider/Imprint.vue"),
    meta: { title: "Impressum" },
  },
  {
    path: "/datenschutz",
    name: "Datenschutz",
    component: () => import(/* webpackChunkName: "dataProtection" */ "../views/provider/DataProtection.vue"),
    meta: { title: "Datenschutz" },
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue"),
    meta: { title: "Seite nicht gefunden" },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

const DEFAULT_TITLE = "Homepage";

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
