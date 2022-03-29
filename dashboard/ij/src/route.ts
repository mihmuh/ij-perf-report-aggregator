import { MenuItem } from "primevue/menuitem"
import { ParentRouteRecord } from "shared/src/route"
import IntelliJDashboard from "./IntelliJDashboard.vue"
import IntelliJExplore from "./IntelliJExplore.vue"
import IntelliJPulse from "./IntelliJPulse.vue"
import ModuleLoading from "./ModuleLoading.vue"
import ProgressOverTime from "./ProgressOverTime.vue"
import SharedIndexesDashboard from "./SharedIndexesDashboard.vue"

export function getIjItems(): Array<MenuItem> {
  return [
    {
      label: "IJ",
      items: [
        {
          to: "/ij/pulse",
          label: "Pulse",
        },
        {
          to: "/ij/progressOverTime",
          label: "Progress Over Time",
        },
        {
          to: "/ij/moduleLoading",
          label: "Module Loading",
        },
        {
          to: "/ij/explore",
          label: "Explore",
        },
      ],
    },
    {
      label: "Shared Indexes",
      to: "/sharedIndexes/dashboard",
    },
    {
      label: "Integration Performance",
      to: "/performanceIntegration/dashboard",
    },
    {
      label: "RubyMine Integration Performance",
      to: "/rubyMinePerformanceIntegration/dashboard",
    },
  ]
}

export function getIjRoutes(): Array<ParentRouteRecord> {
  return [
    {
      children: [
        {
          path: "/ij",
          component: () => IntelliJDashboard,
          children: [
            {
              path: "/ij/dashboard",
              redirect: "/ij/pulse",
            },
            {
              path: "/ij/pulse",
              component: () => IntelliJPulse,
              meta: {pageTitle: "IJ - Pulse"},
            },
            {
              path: "/ij/progressOverTime",
              component: () => ProgressOverTime,
              meta: {pageTitle: "IJ - Progress Over Time"},
            },
            {
              path: "/ij/moduleLoading",
              component: () => ModuleLoading,
              meta: {pageTitle: "IJ - Module Loading"},
            },
          ],
        },
        {
          path: "/ij/explore",
          component: () => IntelliJExplore,
          meta: {pageTitle: "IJ Explore"},
        },
      ]
    },
    {
      children: [
        {
          path: "/sharedIndexes/dashboard",
          component: () => import("./SharedIndexesDashboard.vue"),
          props: {
            dbName: "sharedIndexes",
            defaultMeasures: [],
          },
          meta: {pageTitle: "Shared Indexes Dashboard"},
        },
      ]
    },
    {
      children: [
        {
          path: "/performanceIntegration/dashboard",
          component: () => import("./SharedIndexesDashboard.vue"),
          props: {
            dbName: "perfint",
            defaultMeasures: [],
          },
          meta: {pageTitle: "Integration Performance Dashboard"},
        },
      ]
    },
    {
      children: [
        {
          path: "/rubyMinePerformanceIntegration/dashboard",
          component: () => SharedIndexesDashboard,
          props: {
            dbName: "rubymineperfint",
            defaultMeasures: [],
          },
          meta: {pageTitle: "RubyMine Integration Performance Dashboard"},
        },
      ]
    },
  ]
}
