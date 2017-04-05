<style scoped>
  @import "css/mvList.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="mv-list">
      <div class="title">全部MV</div>
      <ul class="list">
        <li v-for="(item,index) in list" class="item" @click="toContent(item.id)">
          <img :src="item.picurl"/>
          <div class="album-name">{{item.mvtitle}}</div>
          <div class="singer">{{item.singername}}</div>
        </li>
      </ul>
      <div style="height: 1.4rem;background: transparent"></div>
    </div>

  </transition>
</template>
<script type="text/ecmascript-6">
  import API from '../js/api'
  import Common from '../js/rock'
  export default{
    data () {
      return {
        infoList: [],
        page: 1,
        isLoading: false
      }
    },
    methods: {
      toContent (id) {
        sessionStorage.setItem('singerListScrollTop', document.body.scrollTop)
        this.$router.push({
          name: 'rankContent',
          query: {id: id}
        })
      },
      picUrl (item) {
        return '//y.gtimg.cn/music/photo_new/T002R300x300M000' + item.album_mid + '.jpg?max_age=2592000'
      },
      loadMore () {
        let _this = this
        API.mvList(_this.page, function (response) {
          response.data.data.mvlist.map(function (item) {
            _this.infoList.push(item)
          })
          console.log(_this.infoList.length)
          if (response.data.data.mvlist.length !== 0) {
            _this.page += 1
          }
          _this.isLoading = false
        })
      }
    },
    computed: {
      list () {
        return this.infoList
      }
    },
    beforeMount () {
      let _this = this
      API.mvList(_this.page, function (response) {
        _this.infoList = response.data.data.mvlist
        if (response.data.data.mvlist.length !== 0) {
          _this.page += 1
        }
      })
    },
    mounted () {
      let _this = this
      setTimeout(function () {
        document.body.scrollTop = parseInt(sessionStorage.getItem('singerListScrollTop'))
      }, 1000)
      window.onscroll = function () {
        if (!_this.isLoading && _this.$store.state.barStatus === 3) {
          if (Common.scroll.getScrollTop() + Common.scroll.getClientHeight() >= Common.scroll.getScrollHeight() - 10) {
            console.log('loadingAlbum')
            _this.isLoading = true
            _this.loadMore()
          }
        }
      }
    }
  }

</script>
