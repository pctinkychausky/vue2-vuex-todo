import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Completed from "../components/Completed.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/completed",
      name: "Completed",
      component: Completed,
    },
  ],
});
