<style scoped>
  @import "css/mainView.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="main">
      <div class="title-bar">
        <span class="sprites menu"></span>
        <span class="title">musicPlayer</span>
        <span class="sprites search" @click="toSearch"></span>
      </div>
      <div class="tab">
        <div class="bar" :class="{'active-bar':barStatus === 2}" @click="switchBar(2)">排行榜</div>
        <div class="bar" :class="{'active-bar':barStatus === 1}" @click="switchBar(1)">歌手</div>
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
  import $ from 'jquery'
  import rankList from './rankList'
  import singerList from './singerList'
  import dissList from './dissList'
  import albumList from './albumList'
  import mvList from './mvList'
  import {mapState} from 'vuex'
  export default{
    data () {
      return {
        isLoading: false,
        isSwitching: false,
        page: {
          0: 0,
          1: 1,
          2: 0,
          3: 0,
          4: 2,
          5: 0,
          6: 1
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
        barStatus: state => state.barStatus,
        singerList: state => state.list.singer,
        albumList: state => state.list.album,
        mvList: state => state.list.mv
      })
    },
    methods: {
      switchBar (barStatus) {
        let _this = this
        console.log('from: ' + this.$store.state.barStatus)
        switch (_this.$store.state.barStatus) {
          case 1:
            sessionStorage.setItem('singerListScrollTop', document.body.scrollTop)
            break
          case 2:
            sessionStorage.setItem('rankListScrollTop', document.body.scrollTop)
            break
          case 3:
            sessionStorage.setItem('albumListScrollTop', document.body.scrollTop)
            break
          case 4:
            sessionStorage.setItem('dissListScrollTop', document.body.scrollTop)
            break
          case 5:
            sessionStorage.setItem('mvListScrollTop', document.body.scrollTop)
            break
        }
        let scrollTopBefore = document.body.scrollTop
        let scrollTopAfter = 0
        _this.$store.dispatch('switchBar', barStatus)
        switch (_this.$store.state.barStatus) {
          case 1:
            scrollTopAfter = parseFloat(sessionStorage.getItem('singerListScrollTop'))
            break
          case 2:
            scrollTopAfter = parseFloat(sessionStorage.getItem('rankListScrollTop'))
            break
          case 3:
            scrollTopAfter = parseFloat(sessionStorage.getItem('albumListScrollTop'))
            break
          case 4:
            scrollTopAfter = parseFloat(sessionStorage.getItem('dissListScrollTop'))
            break
          case 5:
            scrollTopAfter = parseFloat(sessionStorage.getItem('mvListScrollTop'))
            break
        }
        if (scrollTopBefore > scrollTopAfter) {
          document.body.scrollTop = scrollTopAfter
        } else {
          $('body').animate({scrollTop: scrollTopAfter + 'px'}, 500)
        }
        _this.isSwitching = true
        setTimeout(function () {
          _this.isSwitching = false
        }, 500)
      },
      toSearch () {
        this.$router.push({
          name: 'search'
        })
      },
      loadMore () {
        let _this = this
        switch (this.$store.state.barStatus) {
          case 1:
            _this.isLoading = true
            console.log('loading singer page:' + _this.page[1])
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
          case 3:
            _this.isLoading = true
            console.log('loading album page:' + _this.page[3])
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
          case 5:
            _this.isLoading = true
            console.log('loading mv page:' + _this.page[5])
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
    beforeMount () {
      let _this = this
      if (_this.singerList.length === 0) {
        console.log('loading singer first')
        _this.isLoading = true
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
      }
      if (_this.albumList.length === 0) {
        console.log('loading album first')
        _this.isLoading = true
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
      }
      if (_this.mvList.length === 0) {
        console.log('loading mv first')
        _this.isLoading = true
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
      }
    },
    mounted () {
      this.$store.dispatch('updateTitle', '首页')
      if (window.location.hash.indexOf('musicContent') < 0) {
        this.$store.dispatch('switchMusicContent', false)
      }
      let _this = this
      window.onscroll = function () {
        if (!_this.isSwitching && !_this.isLoading && window.location.hash.split('#/')[1].length === 0) {
          if (Common.scroll.getScrollTop() + Common.scroll.getClientHeight() >= Common.scroll.getScrollHeight() - 10) {
            _this.loadMore()
          }
        }
      }
      setTimeout(function () {
        switch (_this.$store.state.barStatus) {
          case 1:
            document.body.scrollTop = parseFloat(sessionStorage.getItem('singerListScrollTop'))
            break
          case 3:
            document.body.scrollTop = parseFloat(sessionStorage.getItem('albumListScrollTop'))
            break
          case 5:
            document.body.scrollTop = parseFloat(sessionStorage.getItem('mvListScrollTop'))
            break
        }
      }, 200)
    }
  }
</script>
