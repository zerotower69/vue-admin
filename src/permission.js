import router from '@/router';
import store from '@/store';
import {Message} from 'element-ui';
import getPageTitle from "@/utils/get-page-title";
import {getToken} from "@/utils/auth";
//import nprogress
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

Nprogress.configure({showSpinner: false});  //Nprogress configuration

//路由检验白名单
const whiteList = ['/login', 'redirect-auth', 'logup'];

//路由跳转前
router.beforeEach(async (to, from, next) => {
//进度条开始
    Nprogress.start();
//设置页面的标题
    document.title = getPageTitle();
    //用户登录
    const hasToken = getToken();
    console.log(hasToken);
    // make sure every if...else... statement has executed the 'next' method!
    if (hasToken) {
        // if is logged in, redirect to the home page
        if (to.path === '/login') {
            next({path: '/'});
            Nprogress.done();
        }
        else {
            //get use roles
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next();
            } else {
                try {
                    //get user info
                    //get roles
                    const {roles} = await store.dispatch("user/getInfo");
                    // generate accessible routes map based on roles
                    const accessRoutes = await store.dispatch("permission/generateRoutes",roles);
                    // dynamically add accessible routes
                    router.addRoutes(accessRoutes);
                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({...to,replace:true})
                } catch (e) {
                    //发生错误时要求重新登录
                    await store.dispatch("user/resetToken");  //移除token
                    Message.error(e.message||'error');  //显示这个错误
                    next(`/login?redirect=${to.path}`);   //跳转到登陆页面并保证之后还能跳转回来
                    Nprogress.done()
                }
            }
        }
    }
    else {
        // without token,
        //if route in whiteList, you can enter the route you want
        if(whiteList.includes(to.path)){
            next();
        }
        else{
            //go to the login page and make sure you can return the page wanted.
            next({to:`/login?redirect=${to.path}`});
            Nprogress.done();
        }
    }
})

//路由跳转后,进度条停止加载
router.afterEach(() => {
    Nprogress.done();
})