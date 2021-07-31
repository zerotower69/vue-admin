//使用路由
import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from "layout"


Vue.use(VueRouter);
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
export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: "/dashboard",
        //子路由
        children: [
            {
                path: "/dashboard",
                name: 'Dashboard',
                component: () => import("views/dashboard/index"),
                meta: {title: 'dashboard', icon: 'dashboard'}
            }
        ]
    },
    {
        path: '/icons',
        redirect: '/icons',
        component: Layout,
        children: [
            {
                path: "/",
                name: 'Icons',
                component: () => import("@/views/icons/index"),
                meta: {
                    title: 'icons',
                    icon: 'icon'
                }
            }
        ]
    },
    // login
    {
        path: "/login",
        component: () => import("@/views/login"),
        name: 'Login'
    },
//    404
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404')
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),  //滚动条到首页
    routes: constantRoutes
})

const router = createRouter();

//让新的路由生效，实现动态路由
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
