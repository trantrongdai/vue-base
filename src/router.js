import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/read",
    alias: "/read",
    name: "read api example",
    component: () => import("./components/Read"),
  },

  {
    path: "/read",
    alias: "/create",
    name: "create api example",
    component: () => import("./components/Create"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
