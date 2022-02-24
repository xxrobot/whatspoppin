import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import List from "@/components/List";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/places",
    name: "placesIndex",
    component: List,
    props: true
  },
  {
    path: "/places/:places",
    name: "places",
    component: List,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
