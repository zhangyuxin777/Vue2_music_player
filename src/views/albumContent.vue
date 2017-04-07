<style scoped>
  @import "css/rankContent.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="rank-content">
      <div class="banner">
        <img :src="getBanner" id="banImg" v-if="getBanner">
      </div>
      <ul class="list">
        <li v-for="(item,index) in list" class="item" @click="playSong(item)" track-by="item.data.songid">
          <div class="i-title" :class="{red : index<3}">
            <span class="sprites ic_menu" :class="{hide : !isCurrent(item.data.songid)}"></span>
            <span :class="{hide : isCurrent(item.data.songid)}">{{index+1}}</span>
          </div>
          <div class="i-content">
            <div class="songname">{{item.data.songname}}</div>
            <div class="singername">{{item.data.singer[0].name}} - {{item.data.albumname}}</div>
          </div>
          <div class="more sprites ic_more" @click="toMore(item)"></div>
          <div class="clear"></div>
          <span class="split-line"></span>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import API from '../js/api'
  export default{
    data () {
      return {
        topList: [],
        topid: this.$route.query.id,
        topinfo: ''
      }
    },
    methods: {
      playSong (item) {
        this.$store.dispatch('playSong', item)
      },
      isCurrent (id) {
        return id === this.$store.state.play.current.data.songid
      },
      toMore (item) {
        this.$store.dispatch('switchInfo', {
          current: item,
          isMusicContent: false
        })
        event.stopPropagation()
      }
    },
    computed: {
      list () {
        return this.topList
      },
      getBanner () {
        return this.topinfo.pic_h5
      }
    },
    beforeMount () {
      let _this = this
      API.rankDetail(this.topid, function (response) {
        _this.topList = response.data.songlist
        _this.topinfo = response.data.topinfo
      })
      document.body.scrollTop = 0

      /***
       * 专辑列表
       */
//      API.albumList('0000mFvh1jtLcz', function (response) {
//        console.log(response)
//      })
      /***
       * 专辑详情
       */
//      API.albumDetail('003wYYY91FstKX', function (response) {
//        console.log(response)
//      })
      /***
       * 歌手详情 以及热门歌曲
       */
//      API.singerDetail('0000mFvh1jtLcz', function (response) {
//        console.log(response)
//      })
      /***
       * 相似歌手
       */
//      API.similarSinger('0000mFvh1jtLcz', function (response) {
//        console.log(response)
//      })
      /***
       * mv 列表
       */
//      API.mvList('0000mFvh1jtLcz', function (response) {
//        console.log(response)
//      })
      /**
       * mv 详情
       */
//      API.mvDetail('d0012yal7fi', function (response) {
//        console.log(response)
//      })
      API.mvList(function (response) {
        console.log(response)
      })
    }
  }

</script>
