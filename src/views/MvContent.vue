<style scoped lang="scss" type="text/css">
  @import "css/mvContent.scss";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="mv-content">
      <div class="header">
        <div class="back" @click="back">
          <div class="sprites ic_back"></div>
        </div>
        <div class="title">
          <div class="singername">{{getInfo.mvname}}</div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="video-box">
        <video class="video" :src="getUrl" width="100%" height="100%" x-webkit-airplay="true" webkit-playsinline=""
               playsinline="true" preload="none"
               controls="controls"></video>
      </div>
      <div class="info">
        <div class="mv-name">{{getInfo.mvname}}</div>
        <div class="singer" @click="toSinger">歌手:{{getInfo.singer.name}}&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <span class="line">|</span>
        <div class="listenCount">&nbsp;&nbsp;&nbsp;&nbsp;播放:{{(getInfo.listennum/10000).toFixed(0)}}万</div>
        <div class="pub-time">发行时间:{{getInfo.pubdate}}</div>
        <div class="detail">{{getInfo.desc}}</div>
      </div>
      <div class="position"></div>
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
        vKey: '',
        info: {
          singer: {
            name: ''
          }
        }
      }
    },
    methods: {
      playSong (item) {
        this.$store.dispatch('playSong', item)
      },
      isCurrent (id) {
        return id === this.$store.state.play.current.data.songid
      },
      toSinger () {
        this.$router.push({
          name: 'singerContent',
          query: {id: this.info.singers[0].mid}
        })
      },
      back () {
        window.history.back()
      }
    },
    computed: {
      list () {
        return this.topList
      },
      getUrl () {
        return 'http://111.202.117.154/music.qqvideo.tc.qq.com/' + this.$route.query.id + '.mp4?vkey=' + this.vKey
      },
      getBanner () {
        return 'https://shp.qpic.cn/qqvideo/0/' + this.$route.query.id + '/0'
      },
      getInfo () {
        return this.info
      }
    },
    beforeMount () {
      let _this = this
      API.mvDetail(this.$route.query.id, function (response) {
        _this.info = response.data.data
        _this.$store.dispatch('updateTitle', _this.info.mvname)
      })
      API.mvInfo(this.$route.query.id, function (response) {
        _this.vKey = response.data.vl.vi[0].fvkey
      })
      document.body.scrollTop = 0
    },
    mounted () {
      if (window.location.hash.indexOf('musicContent') < 0) {
        this.$store.dispatch('switchMusicContent', false)
      }
    }
  }

</script>
