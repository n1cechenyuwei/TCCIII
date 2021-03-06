import Vue from "vue";
import Router from "vue-router";
// import http from "@/components/vuexajax";
import { Message } from "element-ui";
const Login = () => import("@/views/Login.vue");
const Navigation = () => import("@/views/Navigation.vue");
const Task = () => import("@/views/tasks/Task.vue");
const Home = () => import("@/views/Home.vue");
const Project = () => import("@/views/project/Project.vue");
const MyTask = () => import("@/views/tasks/MyTask.vue");
const Tasked = () => import("@/views/tasks/Tasked.vue");
const Alltask = () => import("@/views/tasks/Alltask.vue");
const Configuration = () => import("@/views/tasks/Configuration.vue");
const Grn = () => import("@/views/tasks/Grn.vue");
const Outprint = () => import("@/views/tasks/outprint.vue");
const Putprint = () => import("@/views/tasks/putprint.vue");
const PutBoundOrder = () => import("@/views/tasks/putBoundOrder.vue");
const TaskStatistical = () => import("@/views/tasks/TaskStatistical.vue");
const TaskAllot = () => import("@/views/tasks/TaskAllot.vue");
const Equipment = () => import("@/views/equipment/equipment.vue");
const Goingproject = () => import("@/views/project/Goingproject.vue");
const Projected = () => import("@/views/project/Projected.vue");
const Projectdetails = () => import("@/views/project/Projectdetails.vue");
const ProjectStatistical = () =>
  import("@/views/project/ProjectStatistical.vue");
const Qianming = () => import("@/views/tasks/qianming.vue");
const System = () => import("@/views/system/system.vue");
const Personnel = () => import("@/views/system/Personnel.vue");
const Permissions = () => import("@/views/system/Permissions.vue");
const Logs = () => import("@/views/system/Logs.vue");
const Eqpis = () => import("@/views/equipment/eqpis.vue");
const Eqvms = () => import("@/views/equipment/eqvms.vue");
const Environmentconfig = () =>
  import("@/views/equipment/environmentconfig.vue");
const Workconfig = () => import("@/views/equipment/workconfig.vue");
const Simtools = () => import("@/views/equipment/simtools.vue");
const Simulationconfig = () => import("@/views/equipment/simulationconfig.vue");
const Pissimulationconfig = () =>
  import("@/views/equipment/pissimulationconfig.vue");
const Reports = () => import("@/views/reports/reports.vue");
const PisReportsfirstdraft = () =>
  import("@/views/reports/pisReportsfirstdraft.vue");
const PisReportsLatestdraft = () =>
  import("@/views/reports/pisReportsLatestdraft.vue");
const Pisentrust = () => import("@/views/reports/pisentrust.vue");
const Vmsentrust = () => import("@/views/reports/vmsentrust.vue");
const VmsReportsfirstdraft = () =>
  import("@/views/reports/vmsReportsfirstdraft.vue");
const VmsReportsLatestdraft = () =>
  import("@/views/reports/vmsReportsLatestdraft.vue");
const Contract = () => import("@/views/contract/contract.vue");
const PisContract = () => import("@/views/contract/pisContract.vue");
const VmsContract = () => import("@/views/contract/vmsContract.vue");
const Company = () => import("@/views/company/company.vue");
const Examine = () => import("@/views/company/examine.vue");
const Inspection = () => import("@/views/company/inspection.vue");
const Cases = () => import("@/views/cases/cases.vue");
const Inforelease = () => import("@/views/inforelease/inforelease.vue");
const Waterdisplay = () => import("@/views/inforelease/waterdisplay.vue");
const Screendisplay = () => import("@/views/inforelease/screendisplay.vue");
const Piscases = () => import("@/views/cases/piscases.vue");
const Pisconfigcase = () => import("@/views/cases/pisconfigcase.vue");
const Vmscases = () => import("@/views/cases/vmscases.vue");
const Vmsconfigcase = () => import("@/views/cases/vmsconfigcase.vue");
const Document = () => import("@/views/document/document.vue");
const Commondocument = () => import("@/views/document/commondocument.vue");
const Pisdocument = () => import("@/views/document/pisdocument.vue");
const Vmsdocument = () => import("@/views/document/vmsdocument.vue");
const Docleveltwo = () => import("@/views/document/docleveltwo.vue");
const Doclevelthree = () => import("@/views/document/doclevelthree.vue");
const Knowledge = () => import("@/views/knowledge/knowledge.vue");
const Defects = () => import("@/views/knowledge/defects.vue");
const Nodefects = () => import("@/views/knowledge/nodefects.vue");
const Training = () => import("./views/knowledge/training.vue");
const Vmsdetection = () => import("@/views/display/vmsdetection.vue");
const Welcome = () => import("@/views/display/welcome.vue");
const Nodetection = () => import("@/views/display/nodetection.vue");
const PisStaffInfo = () => import("@/views/inforelease/pisStaffInfo.vue");
const PisTestingProcess = () => import("@/views/inforelease/pisTestingProcess.vue");
const PisTestingProgress = () => import("@/views/inforelease/pisTestingProgress.vue");
const ProjectInfo = () => import("@/views/inforelease/projectInfo.vue");
const PvprojectStatistical = () => import("@/views/inforelease/pvprojectStatistical.vue");
const VmsStaffInfo = () => import("@/views/inforelease/vmsStaffInfo.vue");
const VmsTestingProcess = () => import("@/views/inforelease/vmsTestingProcess.vue");
const VmsTestingProgress = () => import("@/views/inforelease/vmsTestingProgress.vue");
const pisSRF = () => import("@/views/reports/pisSRF.vue");
const pisSRL = () => import("@/views/reports/pisSRL.vue");
const vmsSRF = () => import("@/views/reports/vmsSRF.vue");
const vmsSRL = () => import("@/views/reports/vmsSRL.vue");

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
          component: Equipment,
          children: [
            {
              name: "eqpis",
              path: "/eqpis",
              component: Eqpis
            },
            {
              name: "eqvms",
              path: "/eqvms",
              component: Eqvms
            },
            {
              name: "environmentconfig",
              path: "/environmentconfig",
              component: Environmentconfig
            },
            {
              name: "workconfig",
              path: "/workconfig",
              component: Workconfig
            },
            {
              name: "simtools",
              path: "/simtools",
              component: Simtools
            },
            {
              name: "simulationconfig",
              path: "/simulationconfig",
              component: Simulationconfig
            },
            {
              name: "pissimulationconfig",
              path: "/pissimulationconfig",
              component: Pissimulationconfig
            }
          ]
        },
        {
          name: "system",
          path: "/system",
          component: System,
          children: [
            {
              name: "permissions",
              path: "/permissions",
              component: Permissions
            },
            {
              name: "personnel",
              path: "/personnel",
              component: Personnel
            },
            {
              name: "logs",
              path: "/logs",
              component: Logs
            }
          ]
        },
        {
          name: "reports",
          path: "/reports",
          component: Reports,
          children: [
            {
              name: "pisReportsfirstdraft",
              path: "/pisReportsfirstdraft",
              component: PisReportsfirstdraft
            },
            {
              name: "pisReportsLatestdraft",
              path: "/pisReportsLatestdraft",
              component: PisReportsLatestdraft
            },
            {
              name: "pisentrust",
              path: "/pisentrust",
              component: Pisentrust
            },
            {
              name: "vmsentrust",
              path: "/vmsentrust",
              component: Vmsentrust
            },
            {
              name: "vmsReportsfirstdraft",
              path: "/vmsReportsfirstdraft",
              component: VmsReportsfirstdraft
            },
            {
              name: "vmsReportsLatestdraft",
              path: "/vmsReportsLatestdraft",
              component: VmsReportsLatestdraft
            },
            {
              name: "pisSRF",
              path: "/pisSRF",
              component: pisSRF
            },
            {
              name: "pisSRL",
              path: "/pisSRL",
              component: pisSRL
            },
            {
              name: "vmsSRF",
              path: "/vmsSRF",
              component: vmsSRF
            },
            {
              name: "vmsSRL",
              path: "/vmsSRL",
              component: vmsSRL
            }
          ]
        },
        {
          name: "contract",
          path: "/contract",
          component: Contract,
          children: [
            {
              name: "pisContract",
              path: "/pisContract",
              component: PisContract
            },
            {
              name: "vmsContract",
              path: "/vmsContract",
              component: VmsContract
            }
          ]
        },
        {
          name: "company",
          path: "/company",
          component: Company,
          children: [
            {
              name: "examine",
              path: "/examine",
              component: Examine
            },
            {
              name: "inspection",
              path: "/inspection",
              component: Inspection
            }
          ]
        },
        {
          name: "cases",
          path: "/cases",
          component: Cases,
          children: [
            {
              name: "piscases",
              path: "/piscases",
              component: Piscases
            },
            {
              name: "pisconfigcase",
              path: "/pisconfigcase",
              component: Pisconfigcase
            },
            {
              name: "vmscases",
              path: "/vmscases",
              component: Vmscases
            },
            {
              name: "vmsconfigcase",
              path: "/vmsconfigcase",
              component: Vmsconfigcase
            }
          ]
        },
        {
          name: "document",
          path: "/document",
          component: Document,
          children: [
            {
              name: "commondocument",
              path: "/commondocument",
              component: Commondocument
            },
            {
              name: "pisdocument",
              path: "/pisdocument",
              component: Pisdocument
            },
            {
              name: "vmsdocument",
              path: "/vmsdocument",
              component: Vmsdocument
            },
            {
              name: "docleveltwo",
              path: "/docleveltwo",
              component: Docleveltwo
            },
            {
              name: "doclevelthree",
              path: "/doclevelthree",
              component: Doclevelthree
            }
          ]
        },
        {
          name: "knowledge",
          path: "/knowledge",
          component: Knowledge,
          children: [
            {
              name: "defects",
              path: "/defects",
              component: Defects
            },
            {
              name: "nodefects",
              path: "/nodefects",
              component: Nodefects
            },
            {
              name: "training",
              path: "/training",
              component: Training
            }
          ]
        },
        {
          name: "inforelease",
          path: "/inforelease",
          component: Inforelease,
          children: [
            {
              name: "waterdisplay",
              path: "/waterdisplay",
              component: Waterdisplay
            },
            {
              name: "screendisplay",
              path: "/screendisplay",
              component: Screendisplay
            }
          ]
        }
      ]
    },
    {
      name: "configuration",
      path: "/configuration",
      component: Configuration
    },
    {
      name: "GRN",
      path: "/GRN",
      component: Grn
    },
    {
      name: "outprint",
      path: "/outprint",
      component: Outprint
    },
    {
      name: "putprint",
      path: "/putprint",
      component: Putprint
    },
    {
      name: "putBoundOrder",
      path: "/putBoundOrder",
      component: PutBoundOrder
    },
    {
      name: "qianming",
      path: "/qianming",
      component: Qianming
    },
    {
      name: "vmsdetection",
      path: "/vmsdetection",
      component: Vmsdetection
    },
    {
      name: "welcome",
      path: "/welcome",
      component: Welcome
    },
    {
      name: "nodetection",
      path: "/nodetection",
      component: Nodetection
    },
    {
      name: "pisStaffInfo",
      path: "/pisStaffInfo",
      component: PisStaffInfo
    },
    {
      name: "pisTestingProcess",
      path: "/pisTestingProcess",
      component: PisTestingProcess
    },
    {
      name: "pisTestingProgress",
      path: "/pisTestingProgress",
      component: PisTestingProgress
    },
    {
      name: "projectInfo",
      path: "/projectInfo",
      component: ProjectInfo
    },
    {
      name: "pvprojectStatistical",
      path: "/pvprojectStatistical",
      component: PvprojectStatistical
    },
    {
      name: "vmsStaffInfo",
      path: "/vmsStaffInfo",
      component: VmsStaffInfo
    },
    {
      name: "vmsTestingProcess",
      path: "/vmsTestingProcess",
      component: VmsTestingProcess
    },
    {
      name: "vmsTestingProgress",
      path: "/vmsTestingProgress",
      component: VmsTestingProgress
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  // 判断当前访问的路由是否是login，如果是login直接next
  if (
    to.name === "login" ||
    to.name === "vmsdetection" ||
    to.name === "nodetection" ||
    to.name === "welcome" ||
    to.name === "pvprojectStatistical" ||
    to.name === "vmsTestingProgress" ||
    to.name === "vmsTestingProcess" ||
    to.name === "vmsStaffInfo" ||
    to.name === "projectInfo" ||
    to.name === "pisTestingProgress" ||
    to.name === "pisTestingProcess" ||
    to.name === "pisStaffInfo"
  ) {
    next();
  } else {
    // 判断有没有token
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push({ name: "login" });
      Message.warning("请登录");
      return;
    }
    next();
  }
});

export default router;
