import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/index'
import Demo from '../ourPlayer/demo/demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
  ]
})
