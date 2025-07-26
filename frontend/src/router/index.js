import Vue from "vue";
import Router from "vue-router";
import LoginPage from "@/pages/Pages/LoginPage.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/",
      redirect: "/dashboard", // ✅ redirect to dashboard
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("@/pages/Pages/DashboardPage.vue"),
        },
        {
          path: "users",
          name: "Users",
          component: () => import("@/views/UserPage.vue"),
        },
        {
          path: "users/create",
          name: "CreateUser",
          component: () => import("@/views/UserDetailPage.vue"),
        },
        {
          path: "users/:id",
          name: "EditUser",
          component: () => import("@/views/UserDetailPage.vue"),
        },
      ],
    },
    {
      path: "*",
      redirect: "/dashboard", // optional: catch-all
    },
  ],
});

// ✅ Navigation guard for auth
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // Redirect to login if trying to access protected route without token
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next({ name: "Login" });

    // If already logged in, redirect away from login page
  } else if (to.name === "Login" && token) {
    next({ name: "Dashboard" });
  } else {
    next(); // continue as normal
  }
});

export default router;
