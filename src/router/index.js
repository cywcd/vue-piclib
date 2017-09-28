import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

import CommonView from '@/views/commonView'
import Splash from '@/views/splash'
import Index from '@/views/index'
import Video from '@/views/video'
import Find from '@/views/find'
import MySelf from '@/views/mySelf'
import picList from '@/views/piclist'
import articleShow from '@/views/articleShow'

require('es6-promise').polyfill()

Vue.use(Router)
Vue.use(Vuex)

//路由配置
const vueRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'splash',
      component: Splash
    },
    {
      path: '/commonView',
      name: 'commonView',
      component: CommonView,
      children:[
      	{
		      path: '/index',
		      name: 'index',
		      component: Index
		    },
		    {
		      path: '/video',
		      name: 'video',
		      component: Video
		    },
		    {
		      path: '/find',
		      name: 'find',
		      component: Find
		    },
		    {
		      path: '/mySelf',
		      name: 'mySelf',
		      component: MySelf
		    },
		    {
		      path: '/picList/:catId',
		      name: 'picList',
		      component: picList
		    },
		    {
		      path: '/articleShow/:id',
		      name: 'articleShow',
		      component: articleShow
		    }
      ]
    }
    
  ]
})

let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    showBack: true,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateShowBack (state, showBack) {
      state.showBack = showBack
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

Vue.use(vuexI18n.plugin, store)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

vueRouter.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

vueRouter.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  if (process.env.NODE_ENV === 'production') {
    ga && ga('set', 'page', to.fullPath)
    ga && ga('send', 'pageview')
  }
})


/**
 * 定义全局公用方法
 */
Vue.prototype.http = function (opts) {
  let vue = this
  vue.$vux.loading.show({
    text: 'Loading'
  })

  vue.$http({
    method: opts.method,
    url: apiPrefix + opts.url,
    headers: opts.headers || {},
    params: opts.params || {},
    data: opts.data || {}
  }).then(function (response) {
    vue.$vux.loading.hide()

    opts.success(response.data.data)
  }).catch(function (error) {
    vue.$vux.loading.hide()

    if (!opts.error) {
      let response = error.response
      let errorMessage = '请求失败'

      if (response && response.data) {
        if (response.data.code === loginTimeOutErrorCode) {
          window.location.href = '/'
        }
        errorMessage = response.data.message
      }

      vue.$vux.alert.show({
        title: '提示',
        content: errorMessage
      })
    } else {
      opts.error(error.response.data.data)
    }
  })
}

Vue.prototype.get = function (opts) {
  opts.method = 'get'
  this.http(opts)
}

Vue.prototype.post = function (opts) {
  opts.method = 'post'
  this.http(opts)
}

Vue.prototype.put = function (opts) {
  opts.method = 'put'
  this.http(opts)
}

Vue.prototype.delete = function (opts) {
  opts.method = 'delete'
  this.http(opts)
}

Vue.prototype.valid = function (opts) {
  let vue = this
  let valid = true

  if (opts.ref && !opts.ref.valid) {
    valid = false
  }

  if (opts.ignoreRefs) {
    let newRefs = []
    for (let i in opts.refs) {
      let ref = opts.refs[i]
      for (let j in opts.ignoreRefs) {
        let ignoreRef = opts.ignoreRefs[j]
        if (ref !== ignoreRef) {
          newRefs.push(ref)
        }
      }
    }
    opts.refs = newRefs
  }

  for (let i in opts.refs) {
    if (!opts.refs[i].valid) {
      valid = false
      break
    }
  }

  if (valid) {
    opts.success()
  } else if (opts.error) {
    opts.error()
  } else {
    vue.$vux.toast.show({
      text: '请检查输入'
    })
  }
}

Vue.prototype.closeShowBack = function () {
  this.$store.commit('updateShowBack', false)
}
/*import objectAssign from 'object-assign'

const vuxLocales = require('json-loader!yaml-loader!vux/src/locales/all.yml')
const componentsLocales = require('json-loader!yaml-loader!src/locales/components.yml')

const finalLocales = {
  'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
  'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

const nowLocale = Vue.locale.get()
if (/zh/.test(nowLocale)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}*/

sync(store, vueRouter)

export default vueRouter;