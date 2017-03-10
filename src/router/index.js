import Vue from 'vue'
import Router from 'vue-router'
import main from '../views/mainView'
import rankList from '../views/rankList'
import rankContent from '../views/rankContent'
import musicContent from '../components/musicContent'
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
    },
    {
      path: '/rankContent',
      name: 'rankContent',
      component: rankContent
    },
    {
      path: '/musicContent',
      name: 'musicContent',
      component: musicContent
    }
  ]
})
