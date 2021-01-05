import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  { //这里把根目录导航到个人中心
    path: '/',
    component: Layout,
    redirect: '/profile',
    children: [{
      path: 'profile',
      component: () => import('@/views/profile/index'),
      name: 'Profile',
      meta: {
        title: 'profile',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  { //1级路由
    path: "/system",
    name: "System",
    redirect: "/dictionary",
    component: Layout,
    meta: {
      title: "系统管理",
      icon: "table"
    },
    children: [{ //二级路由
        path: "/ai",
        name: "Ai",
        component: () => import('@/views/system/ai/index'),
        redirect: "/systemModule",
        meta: {
          title: "智能开发",
          icon: "table",
        },
        children: [ //三级路由最少2个才能显示2他们的父级路由
          { //3级路由
            path: "/systemModule",
            name: 'SystemModule',
            component: () => import('@/views/system/ai/systemModule/index'),
            meta: {
              title: '系统模块',
              icon: 'table'
            }
          },
          { //3级路由
            path: "/systemLog",
            name: 'SystemLog',
            component: () => import('@/views/system/ai/systemLog/index'),
            meta: {
              title: '系统日志',
              icon: 'table'
            }
          }
        ]
      },
      { //2级路由
        path: "/dictionary",
        name: "Dictionary",
        component: () => import('@/views/system/dictionary/index'),
        meta: {
          title: "字典管理",
          icon: "table",
        }
      },
    ]
  },
  //基础资料 ：1级路由
  {
    path: "/baseData",
    redirect: "/roles",
    component: Layout,
    meta: {
      title: "基础资料",
      icon: "table"
    },
    children: [{
        path: "/roles",
        name: "roles",
        component: () => import('@/views/baseData/roles/index'),
        meta: {
          title: "角色管理",
          icon: "table"
        }
      },
      {
        path: "/adminstractor",
        name: "adminstractor",
        component: () => import('@/views/baseData/adminstractor/index'),
        meta: {
          title: "用户管理",
          icon: "table"
        },
      },
      {
        path: "/department",
        name: "department",
        component: () => import('@/views/baseData/department/index'),
        meta: {
          title: "部门管理",
          icon: "table",
        }
      },
      {
        path: "/company",
        name: "Company",
        component: () => import('@/views/baseData/company/index'),
        meta: {
          title: "单位管理",
          icon: "clipboard"
        },
      }
    ]
  },
  //网站管理 1级路由
  {
    path: "/webManage",
    name: "WebManage",
    redirect: "/column",
    component: Layout,
    meta: {
      title: "网站管理",
      icon: "table"
    },
    children: [{ //二级路由
        path: "/column",
        name: "Column",
        component: () => import('@/views/webManage/column/index'),
        meta: {
          title: "内容目录",
          icon: "table",
        },
      },
      { //二级路由
        path: "/content",
        name: "Content",
        component: () => import('@/views/webManage/content/index'),
        meta: {
          title: "内容管理",
          icon: "table",
        },
      },
      {
        path: "/interact",
        name: "Interact",
        component: () => import("@/views/webManage/interact/index"),
        meta: {
          title: "互动管理",
          icon: "table"
        }
      },
      {
        path: "/picture",
        name: "Picture",
        component: () => import('@/views/webManage/picture/index'),
        meta: {
          title: "图片明细",
          icon: "table"
        }
      },
      {
        path: "/resume",
        name: "Resume",
        component: () => import('@/views/webManage/resume/index'),
        meta: {
          title: "简历管理",
          icon: "table"
        }
      },
      {
        path: "/file",
        name: "File",
        component: () => import("@/views/webManage/file/index"),
        meta: {
          title: "附件管理",
          icon: "table"
        }
      },
      {
        path: "/fileicon",
        name: "Fileicon",
        component: () => import("@/views/webManage/fileicon/index"),
        meta: {
          title: "文件图标",
          icon: "table"
        }
      },
      {
        path: "/shortMessage",
        name: "ShortMessage",
        component: () => import('@/views/webManage/shortMessage/index'),
        meta: {
          title: "短信管理",
          icon: "clipboard"
        },
      }
    ]
  },
  //其他
  {
    path: "/other",
    name: "Other",
    redirect: "/recipe",
    component: Layout,
    meta: {
      title: "其他",
      icon: "table"
    },
    children: [{ //二级路由
        path: "/recipe",
        name: "Recipe",
        component: () => import('@/views/other/recipe/index'),
        meta: {
          title: "方剂管理",
          icon: "table",
        },
      },
      { //二级路由
        path: "/botany",
        name: "Botany",
        component: () => import('@/views/other/botany/index'),
        meta: {
          title: "蒙医药用数据库管理",
          icon: "table",
        },
      },
      {
        path: "/literature",
        name: "Literature",
         component:()=>import("@/views/other/literature/index") ,
        meta: {
          title: "文献管理",
          icon: "table",
        },
      },
    ]
  },
  
  {
    path:"*",
    component: () => import('@/views/error-page/404'),
  }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes,
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
