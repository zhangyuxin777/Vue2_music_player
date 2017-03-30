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
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
        params: {
          topid: this.topid,
          format: 'jsonp',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'yqq',
          needNewCode: 0
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        this.topList = response.data.songlist
        this.topinfo = response.data.topinfo
      })
      document.body.scrollTop = 0
      /***
       * 专辑详情
       */
//      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
//        params: {
//          albummid: '003wYYY91FstKX',
//          g_tk: 5381,
//          loginUin: 0,
//          hostUin: 0,
//          format: 'jsonp',
//          inCharset: 'utf8',
//          outCharset: 'utf-8',
//          notice: 0,
//          platform: 'yqq',
//          needNewCode: 0
//        },
//        jsonp: 'jsonpCallback'
//      }).then(function (response) {
//        console.log(response)
//      })
      /***
       * 歌手详情 以及热门歌曲
       */
//      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
//        params: {
//          g_tk: 5381,
//          loginUin: 0,
//          hostUin: 0,
//          format: 'jsonp',
//          inCharset: 'utf-8',
//          outCharset: 'utf-8',
//          notice: 0,
//          platform: 'yqq',
//          needNewCode: 0,
//          singermid: '0000mFvh1jtLcz',
//          order: 'listen',
//          begin: 0,
//          num: 30,
//          from: 'h5',
//          songstatus: 1,
//          _: new Date().getTime()
//        },
//        jsonp: 'jsonpCallback'
//      }).then(function (response) {
//        console.log(response)
//      })
      /***
       * 专辑列表
       */
//      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg', {
//        params: {
//          g_tk: 5381,
//          loginUin: 0,
//          hostUin: 0,
//          format: 'jsonp',
//          inCharset: 'utf-8',
//          outCharset: 'utf-8',
//          notice: 0,
//          platform: 'yqq',
//          needNewCode: 0,
//          singermid: '0000mFvh1jtLcz',
//          order: 'time',
//          begin: 0,
//          num: 6,
//          from: 'h5',
//          songstatus: 1
//        },
//        jsonp: 'jsonpCallback'
//      }).then(function (response) {
//        console.log(response)
//      })
      /***
       * 相似歌手
       */
//      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg', {
//        params: {
//          utf8: 1,
//          g_tk: 5381,
//          loginUin: 0,
//          hostUin: 0,
//          format: 'jsonp',
//          inCharset: 'utf-8',
//          outCharset: 'utf-8',
//          notice: 0,
//          platform: 'yqq',
//          needNewCode: 0,
//          singer_mid: '0000mFvh1jtLcz',
//          start: 0,
//          num: 6,
//          from: 'h5',
//          songstatus: 1
//        },
//        jsonp: 'jsonpCallback'
//      }).then(function (response) {
//        console.log(response)
//      })
      /***
       * mv 列表
       */
//      this.$http.jsonp('https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg', {
//        params: {
//          cid: 205360581,
//          g_tk: 5381,
//          loginUin: 0,
//          hostUin: 0,
//          format: 'jsonp',
//          inCharset: 'utf-8',
//          outCharset: 'utf-8',
//          notice: 0,
//          platform: 'yqq',
//          needNewCode: 0,
//          singermid: '0000mFvh1jtLcz',
//          order: 'listen',
//          begin: 0,
//          num: 6,
//          from: 'h5',
//          songstatus: 1
//        },
//        jsonp: 'jsonpCallback'
//      }).then(function (response) {
//        console.log(response)
//      })
      /**
       * mv 详情
       */
      this.$http.jsonp('https://c.y.qq.com/mv/fcgi-bin/fcg_getmvinfo.fcg', {
        params: {
          g_tk: 5381,
          uin: 0,
          format: 'jsonp',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          vid: 'd0012yal7fi',
          _: new Date().getTime()
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        console.log(response)
      })
    }
  }

</script>
