// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './../static/css/weui.min.css'
import './../static/css/common.css'


import {AjaxPlugin,LoadingPlugin,ToastPlugin} from 'vux'

//阻止 vue 在启动时生成生产日志提示
Vue.config.productionTip = false

//注册组件
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

const store = new Vuex.Store({})
store.registerModule('vux', {
  state: {
    loading: false,
    showBack: true,
    direction: 'forward',
    title: ''
  },
  mutations: {
    updateLoadingStatus (state, loading) {
      state.loading = loading
    },
    updateShowBack (state, showBack) {
      state.showBack = showBack
    },
    updateTitle (state, title) {
      state.title = title
    }
  }
})

//用于消除在移动浏览器上触发click事件与一个物理Tap(敲击)之间的300延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
