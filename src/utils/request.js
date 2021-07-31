//封装axios请求
import axios from "axios";
import {MessageBox,Message} from "element-ui"
import store from "store";

import {getToken} from "utils/auth"
//创建实例
const service = axios.create({
    //请求的基本地址
    baseURL:process.env["VUE_APP_BASE_API "],
    //默认请求允许超时的时间
    timeout: 5000
})


//请求拦截器
service.interceptors.request.use(
    config => {
        //如果token存在就随着请求传回给后台
        if(store.getters.token){
            config.headers["X-header"]=getToken();
        }
        return config;
    }
);
//响应拦截器
service.interceptors.response.use(
    response => {
    //获取响应的数据
    const res=response.data;
    //todo:  自定义响应码
    //约定一些响应代码，这里使用大佬自定义的
    //逻辑判断，决定是否要返回数据，查看状态码
    if(res.code!=20000) {
        Message({
            message: res.message || "error",
            type: 'error',
            duration: 5 * 1000
        })
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            // to re-login
            MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                confirmButtonText: 'Re-Login',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            })
        }
        return Promise.reject(new Error(res.message || "error"));
    }
    else{
        return res;
    }
},
error=>{
    console.log(error.message);  //调试观测
    Message({
        message:error.message,
        type: 'error',
        duration:5*1000
    })
}
);

//导出
export default service

