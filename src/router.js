import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import DemoModal from './views/DemoModal.vue'
import DateHour from './views/DateHour.vue'

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
      path: '/dateHour',
      name: 'dateHour',
      component: DateHour
    }
  ]
})
