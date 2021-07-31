import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//use Element-UI
import ElementUI from "element-ui";
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss' // global css
import store from "store";
import router from "router";
import '@/icons';

//import router
import '@/permission'

const { mockXHR } = require('../mock')
mockXHR()

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
