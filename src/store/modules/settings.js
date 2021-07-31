import defaultSettings from '@/settings';
import variables from '@/styles/element-variables.scss'

const {title,showSettings,fixedHeader,sidebarLogo,tagsView} =defaultSettings;

const state={
    //主题
    theme:variables.theme,
    //标题
    title:title,
    //tag头部显示
    tagsView:tagsView,
    //显示设置
    showSettings:showSettings,
    //导航栏是否吸顶
    fixedHeader:fixedHeader,
    //是否展示logo
    sidebarLogo: sidebarLogo
}

const mutations = {
    //更改设置
    CHANGE_SETTING:(state,{key,value})=>{
        // eslint-disable-next-line no-prototype-builtins
        if(state.hasOwnProperty(key)){
            state[key]=value;
        }
    }
}

const actions = {
    changeSetting({commit},data){
        commit("CHANGE_SETTING",data);
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}
