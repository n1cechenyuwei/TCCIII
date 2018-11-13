import Vue from "vue";
import Router from "vue-router";
const Login = () => import("@/views/Login.vue");
const Home = () => import("@/views/Home.vue");
const Task = () => import("@/views/tasks/Task.vue");
const First = () => import("@/views/First.vue");
const Project = () => import("@/views/Project.vue");
const MyTask = () => import("@/views/tasks/MyTask.vue");
const Tasked = () => import("@/views/tasks/Tasked.vue");
const Applyfor = () => import("@/views/tasks/Applyfor.vue");
const ApprovalContract = () => import("@/views/tasks/ApprovalContract.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "login",
      path: "/",
      component: Login
    },
    {
      name: "home",
      path: "/home",
      component: Home,
      children: [
        {
          name: "first",
          path: "/first",
          component: First
        },
        {
          name: "task",
          path: "/task",
          component: Task,
          children: [
            {
              name: "mytask",
              path: "/mytask",
              component: MyTask,
              children: [
                {
                  name: "applyfor",
                  path: "/applyfor",
                  component: Applyfor
                },
                {
                  name: "approvalcontract",
                  path: "/approvalcontract",
                  component: ApprovalContract
                }
              ]
            },
            {
              name: "tasked",
              path: "/tasked",
              component: Tasked
            }
          ]
        },
        {
          name: "project",
          path: "/project",
          component: Project
        }
      ]
    }
  ]
});
