import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: `/news/${window.localStorage.getItem('defaultCategory') || '1'}`
    },
    {
      path: '/news/:catId',
      component: Home,
      props: true
    }
  ]
})
