import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import 'weui';
import weui from 'weui.js';
Vue.prototype.$weui = weui

import axios from 'axios'
axios.defaults.baseURL = 'https://wd8716077287svpjzp.wilddogio.com'
Vue.prototype.$http = axios

import date from './assets/index';
Vue.prototype.$date = date;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')