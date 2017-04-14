<style scoped>
  @import "css/mainView.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="main">
      <div class="tab">
        <div class="bar" :class="{'active-bar':barStatus === 0}" @click="switchBar(0)">推荐</div>
        <div class="bar" :class="{'active-bar':barStatus === 1}" @click="switchBar(1)">歌手</div>
        <div class="bar" :class="{'active-bar':barStatus === 2}" @click="switchBar(2)">排行榜</div>
        <div class="bar" :class="{'active-bar':barStatus === 3}" @click="switchBar(3)">专辑</div>
        <div class="bar" :class="{'active-bar':barStatus === 4}" @click="switchBar(4)">歌单</div>
        <div class="bar" :class="{'active-bar':barStatus === 5}" @click="switchBar(5)">MV</div>
        <span style="clear: both"></span>
      </div>
      <div class="content">
        <singerList :class="{'hide':barStatus !== 1}"></singerList>
        <rankList :class="{'hide':barStatus !== 2}"></rankList>
        <albumList :class="{'hide':barStatus !== 3}"></albumList>
        <dissList :class="{'hide':barStatus !== 4}"></dissList>
        <mvList :class="{'hide':barStatus !== 5}"></mvList>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import API from '../js/api'
  import Common from '../js/rock'
  import rankList from './rankList'
  import singerList from './singerList'
  import dissList from './dissList'
  import albumList from './albumList'
  import mvList from './MVList'
  import {mapState} from 'vuex'
  export default{
    data () {
      return {
        isLoading: false,
        page: {
          0: 2,
          1: 2,
          2: 2,
          3: 2,
          4: 2,
          5: 2
        }
      }
    },
    components: {
      rankList,
      singerList,
      dissList,
      albumList,
      mvList
    },
    computed: {
      ...mapState({
        barStatus: state => state.barStatus
      })
    },
    methods: {
      switchBar (barStatus) {
        this.$store.dispatch('switchBar', barStatus)
      },
      loadMore () {
        let _this = this
        switch (this.$store.state.barStatus) {
          case 0:
            break
          case 1:
            console.log('loading singer')
            API.singerList(_this.page[1], function (response) {
              _this.$store.dispatch('addMainList', {
                name: 'singer',
                list: response.data.data.list
              })
              if (response.data.data.list.length !== 0) {
                _this.page[1] += 1
              }
              _this.isLoading = false
            })
            break
          case 2:
            break
          case 3:
            console.log('loading album')
            API.albumList(_this.page[3], function (response) {
              _this.$store.dispatch('addMainList', {
                name: 'album',
                list: response.data.data.albumlist
              })
              if (response.data.data.albumlist.length !== 0) {
                _this.page[3] += 1
              }
              _this.isLoading = false
            })
            break
          case 4:
            break
          case 5:
            console.log('loading mv')
            API.mvList(_this.page[5], function (response) {
              _this.$store.dispatch('addMainList', {
                name: 'mv',
                list: response.data.data.mvlist
              })
              if (response.data.data.mvlist.length !== 0) {
                _this.page[5] += 1
              }
              _this.isLoading = false
            })
            break
        }
      }
    },
    mounted () {
      if (window.location.hash.indexOf('musicContent') < 0) {
        this.$store.dispatch('switchMusicContent', false)
      }
      let _this = this
      window.onscroll = function () {
        if (!_this.isLoading && window.location.hash.indexOf('#/') >= 0) {
          if (Common.scroll.getScrollTop() + Common.scroll.getClientHeight() >= Common.scroll.getScrollHeight() - 10) {
            _this.isLoading = true
            _this.loadMore()
          }
        }
      }
      setTimeout(function () {
        switch (_this.$store.state.barStatus) {
          case 0:
            break
          case 1:
            document.body.scrollTop = parseInt(sessionStorage.getItem('singerListScrollTop'))
            break
          case 2:
            document.body.scrollTop = parseInt(sessionStorage.getItem('rankListScrollTop'))
            break
          case 3:
            document.body.scrollTop = parseInt(sessionStorage.getItem('albumListScrollTop'))
            break
          case 4:
            document.body.scrollTop = parseInt(sessionStorage.getItem('dissListScrollTop'))
            break
          case 5:
            document.body.scrollTop = parseInt(sessionStorage.getItem('mvListScrollTop'))
            break
        }
      }, 700)
    }
  }
</script>
