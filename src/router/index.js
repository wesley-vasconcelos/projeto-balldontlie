import { createRouter, createWebHistory } from "vue-router";
import playersRouters from "./playersRouters.js";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...playersRouters,
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "404",
    //   meta: {
    //     title: "Players - Not Found",
    //     requiresAuth: true,
    //   },
    //   component: () => import("@/views/404.vue"),
    // },
  ],
  scrollBehavior() {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth",
    };
  },
});

// router.beforeResolve(async to => {

// })

export default router;
