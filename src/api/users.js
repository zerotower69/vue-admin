//用户api
import request from "@/utils/request";
//这种写法就是典型的闭包写法
//登录
export function login(data){
    return request({
        url:'/vue-admin-template/user/login',
        method:'post',
        data
    })
}

//获取用户信息
export function getInfo(token){
    return request({
        url:'/vue-admin-template/user/info',
        method:'get',
        params:{token}
    })
}

//登出
export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}