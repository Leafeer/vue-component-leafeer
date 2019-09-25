/* eslint-disable quotes */
export default [
  
  // 模型管理
  {
    path: "/model",
    name: "model",
    component: () =>
      import("@/views/Model/Model")
    /*  children: [

   ] */
  },
  {
    path: "/modelAddNew",
    name: "modelAddNew",
    component: () =>
      import("@/views/Model/ModelAddNew"),
    redirect: "/modelBasic",
    children: [
      {
        path: "/modelBasic",
        name: "modelBasic",
        component: () =>
          import("@/views/Model/ModelBasic")
      },
      {
        path: "/modelField",
        name: "modelField",
        component: () =>
          import("@/views/Model/ModelField")
      },
      {
        path: "/modelIndex",
        name: "modelIndex",
        component: () =>
          import("@/views/Model/ModelIndex")
      },
      {
        path: "/modelMap",
        name: "modelMap",
        component: () =>
          import("@/views/Model/ModelMap")
      }
    ]
  }
  // 添加新路由引导主页
];
