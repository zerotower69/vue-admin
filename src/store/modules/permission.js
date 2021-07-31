import { asyncRoutes, constantRoutes } from '@/router'


/**
 * 判断用户是否有访问某个路由的权限
 * @param {Array} roles
 * @param {Object} route
 */
function hasPermission(roles,route){
    if(route.meta && route.meta.roles){
        return roles.some(role=>route.meta.roles.includes(role))
    }
    else{
        return true; //说明这个路由没有权限要求
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                // 递归了
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state={
    routes:[],
    //添加的路由
    addRoutes:[]
};

const mutations={
    //设置路由
    /**
     *
     * @param state  状态
     * @param routes 改变后的动态路由
     * @constructor
     */
    SET_ROUTES(state,routes){
        state.addRoutes=routes;
        //动态常量路由拼接
        state.routes=constantRoutes.concat(routes);
    }
};

const actions={
    generateRoutes({commit},roles){
        //返回的时Promise对象，因为计算路由是异步操作
        return new Promise(resolve =>{
            let accessRoutes;
            //超级管理员拥有所有的权限
            if(roles.includes('admin')){
                accessRoutes=asyncRoutes ||[];
            }
            else{
                accessRoutes=filterAsyncRoutes(asyncRoutes,roles);
            }
            //路由提交到状态管理
            commit("SET_ROUTES",accessRoutes);
            //也同时返回可进入的路由，用于后续的生成导航菜单
            resolve(accessRoutes);
        })
    }
};

export default{
    namespaced:true,
    state,
    mutations,
    actions
}