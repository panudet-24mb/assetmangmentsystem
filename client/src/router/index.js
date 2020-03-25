import Vue from "vue";
import Router from "vue-router";
import DashBoard from "@/views/DashBoard.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import NProgress from 'nprogress'
import MainLayout from '../Layout/Main'
import CompanySetting from "@/views/settings/company.vue";
import BranchSetting from "@/views/settings/branch.vue";
import DepartmentSetting from "@/views/settings/department.vue";
import ArticlesSetting from "@/views/settings/articles.vue";
import BuildingSetting from "@/views/settings/building.vue";
import FloorSetting from "@/views/settings/floor.vue";
import RoomSetting from "@/views/settings/room.vue";
import VenueSetting from "@/views/settings/venue.vue";
import BrandSetting from "@/views/settings/brand.vue";
import ModelSetting from "@/views/settings/model.vue";
import DealerSetting from "@/views/settings/dealer.vue";
import StatusSetting from "@/views/settings/status.vue";
import PermissionSetting from "@/views/users/permission.vue";

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
        requiresAuth: true,
      },
       children: [
         {
           path: "/",
           component: DashBoard,
             meta: {
               breadcrumb: [{
                   name: 'หน้าหลัก',
                   link: '/dashboard'
                 },
                 
               ]
             }

         },
      ],
    },
     {
       path: "/settings",
       component: MainLayout,
       meta: {
         requiresAuth: true,
       },
       children: [{
           path: "/",
         component: DashBoard,

         },
         {
           path: "company",
           name: "company_settings",
           component: CompanySetting,
           meta: {
             breadcrumb: [
               { name: 'หน้าหลัก' ,  link: '/dashboard'},
               { name: 'ตั้งค่า' },
               { name: 'บริษัท' }
             ]
           }

         },
           {
             path: "branch",
             name: "branch_settings",
             component: BranchSetting,
              meta: {
                breadcrumb: [{
                    name: 'หน้าหลัก',
                    link: '/dashboard'
                  },
                  {
                    name: 'ตั้งค่า'
                  },
                  {
                    name: 'สาขา'
                  }
                ]
              }

         },
         {
          path: "branch",
          name: "branch_settings",
          component: BranchSetting,

        },
        {
          path: "department",
          name: "department_settings",
          component: DepartmentSetting,

        },
        {
          path: "articles",
          name: "articles_settings",
          component: ArticlesSetting,

        },
        {
          path: "building",
          name: "building_settings",
          component: BuildingSetting,

        },
        {
          path: "floor",
          name: "floor_settings",
          component: FloorSetting,

        },
        {
          path: "room",
          name: "room_settings",
          component: RoomSetting,

        },
        {
          path: "venue",
          name: "venue_settings",
          component: VenueSetting,

        },
        {
          path: "brand",
          name: "brand_settings",
          component: BrandSetting,

        },
        {
          path: "model",
          name: "model_settings",
          component: ModelSetting,

        },
        {
          path: "dealer",
          name: "dealer_settings",
          component: DealerSetting,

        },
        {
          path: "status",
          name: "status_settings",
          component: StatusSetting,

        }

       ],
     },
     {
      path: "/users",
      component: MainLayout,
      meta: {
        requiresAuth: true
      },
       children: [
         {
           path: "/users/permission",
           component: PermissionSetting,

         },
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