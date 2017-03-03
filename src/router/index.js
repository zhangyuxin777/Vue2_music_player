import Vue from 'vue'
import Router from 'vue-router'
import main from '../views/mainView'
import rankList from '../views/rankList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/rankList',
      name: 'rankList',
      component: rankList
    }
  ]
})
