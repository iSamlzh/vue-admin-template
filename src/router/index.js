import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '后台管理', icon: 'dashboard' }
    }]
  },

  {
    path: '/shop',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '商家管理',
        component: () => import('@/views/shop/index'),
        meta: { title: '商家管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    name: '文章管理',
    meta: { title: '文章管理', icon: 'form' },
    children: [
      {
        name: '生活指南-文章管理',
        path: 'index',
        component: () => import('@/views/article/index'),
        meta: { title: '写文章', icon: 'form' }
      },
      {
        name: '生活指南-新增文章',
        path: 'list',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/classify',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '分类信息',
        component: () => import('@/views/classify/index'),
        meta: { title: '分类信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/city',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '城市信息',
        component: () => import('@/views/city/index'),
        meta: { title: '城市信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/rank',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '排行榜',
        component: () => import('@/views/rank/index'),
        meta: { title: '排行榜', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/applylist',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: '入驻线索',
  //       component: () => import('@/views/applylist/index'),
  //       meta: { title: '入驻线索', icon: 'form' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
