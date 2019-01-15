import Vue from "vue";
import Router from "vue-router";
import { Message } from "element-ui";
const Login = () => import("@/views/Login.vue");
const Navigation = () => import("@/views/Navigation.vue");
const Task = () => import("@/views/tasks/Task.vue");
const Home = () => import("@/views/Home.vue");
const Project = () => import("@/views/project/Project.vue");
const MyTask = () => import("@/views/tasks/MyTask.vue");
const Tasked = () => import("@/views/tasks/Tasked.vue");
const Alltask = () => import("@/views/tasks/Alltask.vue");
const TaskStatistical = () => import("@/views/tasks/TaskStatistical.vue");
const TaskAllot = () => import("@/views/tasks/TaskAllot.vue");
const Equipment = () => import("@/views/equipment/equipment.vue");
const Goingproject = () => import("@/views/project/Goingproject.vue");
const Projected = () => import("@/views/project/Projected.vue");
const Projectdetails = () => import("@/views/project/Projectdetails.vue");
const ProjectStatistical = () =>
  import("@/views/project/ProjectStatistical.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "login",
      path: "/",
      component: Login
    },
    {
      name: "navigation",
      path: "/navigation",
      component: Navigation,
      children: [
        {
          name: "home",
          path: "/home",
          component: Home
        },
        {
          name: "task",
          path: "/task",
          component: Task,
          children: [
            {
              name: "mytask",
              path: "/mytask",
              component: MyTask
            },
            {
              name: "tasked",
              path: "/tasked",
              component: Tasked
            },
            {
              name: "alltask",
              path: "/alltask",
              component: Alltask
            },
            {
              name: "taskStatistical",
              path: "/taskStatistical",
              component: TaskStatistical
            },
            {
              name: "taskallot",
              path: "/taskallot",
              component: TaskAllot
            }
          ]
        },
        {
          name: "project",
          path: "/project",
          component: Project,
          children: [
            {
              name: "goingproject",
              path: "/goingproject",
              component: Goingproject
            },
            {
              name: "projectdetails",
              path: "/projectdetails",
              component: Projectdetails
            },
            {
              name: "projected",
              path: "/projected",
              component: Projected
            },
            {
              name: "projectStatistical",
              path: "/projectStatistical",
              component: ProjectStatistical
            }
          ]
        },
        {
          name: "equipment",
          path: "/equipment",
          component: Equipment
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log(to, from);
  // 判断当前访问的路由是否是login，如果是login直接next
  if (to.name === "login") {
    next();
  } else {
    // 判断有没有token
    const token = sessionStorage.getItem("token");
    if (!token) {
      // 跳转到登录页面
      router.push({ name: "login" });
      // 提示
      Message.warning("请登录");
      return;
    }
    next();
  }
});

export default router;
