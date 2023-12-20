export default [
  {
    path: "/",
    name: "players",
    meta: {
      title: "Lista de Players",
      requiresAuth: false,
    },
    component: () => import("@/views/listPlayers.vue"),
  },
];
