import Vue from "vue";
import Router from "vue-router";
import DashBoard from "@/views/DashBoard.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import NProgress from "nprogress";
import MainLayout from "../Layout/Main";
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
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
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
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              }
            ]
          }
        }
      ]
    },
    {
      path: "/settings",
      component: MainLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/",
          component: DashBoard
        },
        {
          path: "company",
          name: "company_settings",
          component: CompanySetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "บริษัท",
                link: "/settings/company"
              }
            ]
          }
        },
        {
          path: "branch",
          name: "branch_settings",
          component: BranchSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "สาขา",
                link: "/settings/branch"
              }
            ]
          }
        },
        {
          path: "department",
          name: "department_settings",
          component: DepartmentSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "แผนก",
                link: "/settings/department"
              }
            ]
          }
        },
        {
          path: "articles",
          name: "articles_settings",
          component: ArticlesSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "กลุ่มครุภัณฑ์",
                link: "/settings/articles"
              }
            ]
          }
        },
        {
          path: "building",
          name: "building_settings",
          component: BuildingSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "อาคาร",
                link: "/settings/building"
              }
            ]
          }
        },
        {
          path: "floor",
          name: "floor_settings",
          component: FloorSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "ชั้น",
                link: "/settings/floor"
              }
            ]
          }
        },
        {
          path: "room",
          name: "room_settings",
          component: RoomSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "ห้อง",
                link: "/settings/room"
              }
            ]
          }
        },
        {
          path: "venue",
          name: "venue_settings",
          component: VenueSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า",
                link: "/settings"
              },
              {
                name: "สถานที่",
                link: "/settings/venue"
              }
            ]
          }
        },
        {
          path: "brand",
          name: "brand_settings",
          component: BrandSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "ยี่ห้อ",
                link: "/settings/brand"
              }
            ]
          }
        },
        {
          path: "model",
          name: "model_settings",
          component: ModelSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "โมเดลรุ่น/แบบ/สี",
                link: "/settings/model"
              }
            ]
          }
        },
        {
          path: "dealer",
          name: "dealer_settings",
          component: DealerSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "ผู้จัดจำหน่าย",
                link: "/settings/dealer"
              }
            ]
          }
        },
        {
          path: "status",
          name: "status_settings",
          component: StatusSetting,
          meta: {
            breadcrumb: [
              {
                name: "หน้าหลัก",
                link: "/dashboard"
              },
              {
                name: "ตั้งค่า"
                // link: "/settings"
              },
              {
                name: "สถานะ",
                link: "/settings/status"
              }
            ]
          }
        }
      ]
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
          name: "permission_settings",
          component: PermissionSetting,
          meta: {
            breadcrumb: [
              {
                name: "ตั้งค่าผู้ใช้งาน",
                link: "/users/permission"
              }
            ]
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next("/");
  }
  next();
  NProgress.done(); //test axios
});

export default router;
