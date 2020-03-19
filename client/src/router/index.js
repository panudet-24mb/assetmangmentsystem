import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/DashBoard.vue";
import Home from "@/views/Home.vue";
import NProgress from 'nprogress'
import MainLayout from '../Layout/Main'



Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
     
    },
     {
       path: "/login",
       name: "Login",
       component: Login,
      
     },
    {
      path: "/dashboard",
      name: "dashboard",
      component: MainLayout,
      children: [
        {
          path: "",
          component: Dashboard,
          meta: {
            requiresAuth: true
          }

        }
      ],
    },
 
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
   NProgress.done() //test axios
})


export default router;