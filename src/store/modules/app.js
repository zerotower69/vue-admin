const Cookies= require("js-cookie");

const state={
    //侧边栏
    sidebar:{
        //Cookie.get()返回字符串，+变成了数字，!+当数字为 0 或者 NaN 时返回 true !!+应该是false
        //参考：https://www.zhihu.com/question/268784799/answer/342121526
        opened:Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        //animation动画配置
        withoutAnimation: false
    },
    device: 'desktop'
}

const mutations={
    //切换侧边栏
    TOGGLE_SIDEBAR:state=>{
        state.sidebar.opened=!state.sidebar.opened;
        state.sidebar.withoutAnimation = false
        //状态存入Cookie
        if(state.sidebar.opened) {
            Cookies.set("sidebarStatus", 1);
        }
        else{
            Cookies.set("sidebarStatus",0);
        }
    },
    //关闭侧边栏
    CLOSE_SIDEBAR: (state,withoutAnimation)=> {
        Cookies.set("sidebarStatus",0);
        state.sidebar.opened=false;
        state.sidebar.withoutAnimation=withoutAnimation
    },
    //切换设备
    TOGGLE_DEVICE:(state,device)=>{
        state.device=device;
    }
}

//actions
const actions ={
    toggleSideBar({commit}){
        commit("TOGGLE_SIDEBAR");
    },
    closeSideBar({commit},{withoutAnimation}){
        commit("CLOSE_SIDEBAR",withoutAnimation)
    },
    toggleDevive({commit},device){
        commit("TOGGLE_DEVICE",device);
    }

}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}