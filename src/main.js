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

import { Toast, NavBar } from 'vant';
Vue.use(Toast);
Vue.use(NavBar);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')