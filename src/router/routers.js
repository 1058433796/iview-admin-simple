import Main from '@/components/main'
// import parentView from '@/components/parent-view'
// import { dynamicRouterAdd } from '@/libs/router-util'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      },
      {
        path: '/one',
        name: 'one',
        meta: {
          hideInMenu: false,
          icon: 'md-menu',
          title: '问题一'
        },
        component: () => import("@/view/single-page/one"),
      },
      {
        path: '/two',
        name: 'two',
        meta: {
          hideInMenu: false,
          icon: 'md-menu',
          title: '问题二'
        },
        component: () => import("@/view/single-page/two"),
      },
      {
        path: '/three',
        name: 'three',
        meta: {
          hideInMenu: false,
          icon: 'md-menu',
          title: '问题三'
        },
        component: () => import("@/view/single-page/three"),
      },
      {
        path: '/four',
        name: 'four',
        meta: {
          hideInMenu: false,
          icon: 'md-menu',
          title: '问题四'
        },
        component: () => import("@/view/single-page/four"),
      },
    ]
  },

  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
