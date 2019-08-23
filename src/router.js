import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import DemoModal from './components/DemoModal.vue'
import DateHourGrids from './components/DateHourGrids.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/demoModal',
      name: 'demoModal',
      component: DemoModal
    },
    {
      path: '/dateHourGrids',
      name: 'dateHourGrids',
      component: DateHourGrids
    }
  ]
})
