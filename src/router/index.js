import Vue from 'vue'
import Router from 'vue-router'
import main from '../views/mainView'
import rankList from '../views/rankList'
import rankContent from '../views/rankContent'
import singerContent from '../views/singerContent'
import albumContent from '../views/albumContent'
import dissContent from '../views/dissContent'
import myDissContent from '../views/myDissContent'
import mvContent from '../views/mvContent'
import musicContent from '../components/musicContent'
import searchList from '../views/searchList'
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
      path: '/singerContent',
      name: 'singerContent',
      component: singerContent
    },
    {
      path: '/albumContent',
      name: 'albumContent',
      component: albumContent
    },
    {
      path: '/dissContent',
      name: 'dissContent',
      component: dissContent
    },
    {
      path: '/myDissContent',
      name: 'myDissContent',
      component: myDissContent
    },
    {
      path: '/mvContent',
      name: 'mvContent',
      component: mvContent
    },
    {
      path: '/musicContent',
      name: 'musicContent',
      component: musicContent
    },
    {
      path: '/searchList',
      name: 'search',
      component: searchList
    },
    {
      path: '/infoContent',
      name: 'infoContent',
      component: searchList
    }
  ]
})
