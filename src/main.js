import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// Vue.use(MintUI)
import {
  Indicator
} from 'mint-ui';
import 'weui';
import weui from 'weui.js';
Vue.prototype.$weui = weui

import axios from 'axios'
axios.defaults.baseURL = 'https://wd8716077287svpjzp.wilddogio.com'
Vue.prototype.$http = axios
// 请求拦截
axios.interceptors.request.use(
  config => {
    // if (config.method == 'post') {
    //   config.data = qs.stringify(config.data);
    // }

    // 加载动画
    Indicator.open();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    // 错误提醒
    Indicator.close();
    return Promise.reject(error);
  }
);

// mpvue里面自带的
import date from './assets/index';
Vue.prototype.$date = date;

// 根元素字体大小
import 'amfe-flexible'

// 有赞
import { Toast, NavBar } from 'vant';
Vue.use(Toast);
Vue.use(NavBar);

// 全局
import global from './Global.vue'//引用文件
Vue.prototype.GLOBAL = global //挂载到Vue实例上面
Vue.prototype.changeData = function () {//changeData是函数名
  console.log('全局函数');
}
import MyComponent from '@/components/MyComponent.vue'; // 导入自己写的组件文件
Vue.use(MyComponent); // 自定义全局组件的时候需要Vue.use();
Vue.component('my-component', MyComponent); //初始化组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')