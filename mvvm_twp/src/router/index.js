import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Modal from "../views/Modal.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/modal/:id",
    name: "Modal",
    component: Modal,
    props: (route) => {
      const card_id = route.params.id;
      return { card_id }
    },  
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

