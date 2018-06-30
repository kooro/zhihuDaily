import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'

import {
  sync
} from 'vuex-router-sync'
import store from './store/index'

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach((to, from, next) => {
  console.log('to ' + to.path)
  console.log('from ' + from.path)
  if (to.name === 'story') {
    var storyid = to.params.id
    store.dispatch('requestDetails', storyid)
  }

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {
        direction: 'forward'
      })
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {
          direction: ''
        })
      } else {
        store.commit('updateDirection', {
          direction: 'reverse'
        })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {
      direction: 'forward'
    })
  }
  if (to.path === '/' && from.name === 'theme') {
    store.commit('updateDirection', {
      direction: 'forward'
    })
  }

  console.log(store.state.direction)
  next()
})

FastClick.attach(document.body)

Vue.config.productionTip = false

sync(store, router) //将 router 同步到 vuex的state中 （store.state.route.path ）

// google统计

router.afterEach(function (to) {
  if (window.ga) {
    window.ga('set', 'page', to.name) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
    window.ga('send', 'pageview')
  }
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
