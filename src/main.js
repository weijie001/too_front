// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import api from './http'
import store from './store'
import global from '@/utils/global'
import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(api)
Vue.use(VueClipboard)
Vue.prototype.global = global // 挂载全局配置模块
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
