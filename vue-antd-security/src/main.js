import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// 引用antd
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
// 引用axios
import axios from 'axios'
Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
