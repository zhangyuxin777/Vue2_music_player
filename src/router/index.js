import Vue from 'vue'
import Router from 'vue-router'
import main from '../views/MainView'
import rankList from '../views/RankList'
import rankContent from '../views/RankContent'
import singerContent from '../views/SingerContent'
import albumContent from '../views/AlbumContent'
import dissContent from '../views/DissContent'
import myDissContent from '../views/MyDissContent'
import mvContent from '../views/MvContent'
import musicContent from '../components/MusicContent'
import searchList from '../views/SearchList'
import myInfo from '../views/MyInfo.vue'
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
      path: '/myInfo',
      name: 'myInfo',
      component: myInfo
    }
  ]
})
