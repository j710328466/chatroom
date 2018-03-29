// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import Vuex from 'vuex'
import museUI from 'muse-ui'
import moment from 'moment'
import 'muse-ui/dist/muse-ui.css'

Vue.use(vueAxios, axios)
Vue.use(Vuex)
Vue.use(museUI)

// 本地化，中文时间显示
moment.locale('zh-cn')

Vue.prototype.moment = moment

Vue.prototype.random = n => Math.floor(n * Math.random())

const store = new Vuex.Store({
  state: {
    avatarUrl: `http://omratag7g.bkt.clouddn.com/icon-avatar${Vue.prototype.random(21)}.svg`,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
