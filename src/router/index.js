import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Story from '@/components/Story'
import Theme from '@/components/Theme'
import Home from '@/components/HelloFromVux'

Vue.use(Router)

var router = new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Index
  }, {
    path: '/story/:id',
    name: 'story',
    component: Story
  }, {
    path: '/theme/:id',
    name: 'theme',
    component: Theme
  }, {
    path: '/home',
    name: 'home',
    component: Home
  }]
})

export default router
