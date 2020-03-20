import Vue from "vue";
import Router from "vue-router";
import DashBoard from "@/views/DashBoard.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import NProgress from 'nprogress'
import MainLayout from '../Layout/Main'
import CompanySetting from "@/views/settings/company.vue";

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
      component: MainLayout,
      meta: {
        requiresAuth: true
      },
       children: [
         {
           path: "/",
           component: DashBoard,

         },
        {
          path: "company_settings",
          name: "company_settings",
          component: CompanySetting,
        
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