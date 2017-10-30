<template>
  <div id="app">
    <play-bar></play-bar>
    <info-list></info-list>
    <play-list></play-list>
    <router-view></router-view>
    <audio id="player"
           autoplay="autoplay"
           :src="url"
           @timeupdate="updateProgress"
           @ended="complete"
           @play="playEvent"
           @pause="pauseEvent"
           @error="error"
           @stalled="stalled">
    </audio>
    <div style="clear: both"></div>
  </div>
</template>

<script type="text/ecmascript-6">

  import playBar from './components/PlayBar'
  import infoList from './components/InfoList'
  import playList from './components/PlayList'
  import {mapState} from 'vuex'
  import $ from 'jquery'
  import storage from './js/storage'
  import Common from './js/rock'
  let player = null
  let urlError = false

  export default {
    name: 'app',

    components: {
      playBar,
      playList,
      infoList
    },

    beforeMount () {
      // 根据不同平台展示不同样式
      if (Common.system().weixin) {
        if (Common.system().android) {
          $('body').addClass('weixin-android')
        } else if (Common.system().ios) {
          $('body').addClass('weixin-ios')
        }
      }

      // pc 情况下显示切换背景色 突出边际
      $('html').css('background-color', (Common.system().android || Common.system().ios) ? '#f0f4f3' : '#add8e6')
    },

    mounted () {
      let _this = this

      _this.$store.dispatch('updateTitle', 'vue_music')
      player = document.getElementById('player')
      _this.$store.dispatch('setFontSize', $('html').css('font-size').split('px')[0])

      // 从local 读取历史数据 保存到 vuex
      _this.$store.dispatch('init', {
        playList: storage.getL('playList'),
        playCurrent: storage.getL('playCurrent'),
        playStatus: storage.getL('playStatus'),
        likeList: storage.getL('likeList'),
        myDissList: storage.getL('myDissList')
      })

      // 非cd页  更新标志
      if (window.location.hash.indexOf('musicContent') < 0) {
        this.$store.dispatch('switchMusicContent', false)
      }

      // 键盘事件监听
      document.onkeydown = function (event) {
        // 空格切换播放状态
        if (event && event.keyCode === 32) {
          _this.$store.dispatch('switchPlayerStatus')
          event.stopPropagation()
          event.preventDefault()
        } else if (event && event.keyCode === 37) { // 上下切换歌曲
          _this.$store.dispatch('lastSong')
          event.stopPropagation()
          event.preventDefault()
        } else if (event && event.keyCode === 39) {
          _this.$store.dispatch('nextSong')
          event.stopPropagation()
          event.preventDefault()
        } else if (event && event.keyCode === 38) { // 左右更改音量
          _this.$store.dispatch('setVolume', _this.$store.state.play.status.volume > 0.9 ? 1 : _this.$store.state.play.status.volume += 0.1)
          event.stopPropagation()
          event.preventDefault()
        } else if (event && event.keyCode === 40) {
          _this.$store.dispatch('setVolume', _this.$store.state.play.status.volume < 0.1 ? 0 : _this.$store.state.play.status.volume -= 0.1)
          event.stopPropagation()
          event.preventDefault()
        }
      }
    },

    methods: {
      // audio 进度事件 并更新进度条数据
      updateProgress () {
        this.$store.dispatch('progress', {total: player.duration, position: player.currentTime})
      },
      // 播放完成触发事件
      complete () {
        console.log('complete')
        this.$store.dispatch('nextSong')
        this.$store.dispatch('switchRotate', false)
      },
      // 播放状态触发事件
      playEvent () {
        urlError = false
        this.$store.dispatch('switchRotate', true)
      },
      // 暂停状态切换事件
      pauseEvent () {
        urlError = false
      },
      stalled () {
        console.log('stalled')
      },
      error () {
        urlError = true
        console.log('error')
      }
    },

    computed: {
      ...mapState({
        playList: state => state.play.list,
        playStatus: state => state.play.status,
        playCurrent: state => state.play.current,
        autoplay: state => state.play.status.autoPlay,
        likeList: state => state.like.list,
        mode: state => state.play.status.mode,
        current: state => state.play.current,
        playing: state => state.play.status.playing,
        isShow: state => state.play.isShow,
        showMusicContent: state => state.play.showMusicContent,
        listLength: state => state.play.list.length,
        volume: state => state.play.status.volume,
        url: state => {
          if (state.play.current.data && state.play.current.data.songid) {
            return 'http://ws.stream.qqmusic.qq.com/' + state.play.current.data.songid + '.m4a?fromtag=46'
          }
        }
      })
    },

    watch: {

      // 播放状态监听 并更改player
      playing (val) {
        if (player && player.currentSrc.length !== 0 && !urlError) {
          if (val) {
            player.play()
          } else {
            player.pause()
          }
        }
      },

      // 模式切换监听 并更新player
      mode (mode) {
        player.loop = (mode === 0 || (mode === 1 && this.$store.state.play.list.length === 1))
      },

      // 自动播放监听 用于单曲循环模式
      autoplay (autoplay) {
        player.autoplay = autoplay
      },

      // 列表长度监听
      listLength (length) {
        player.loop = (this.$store.state.play.status.mode === 0) || (length === 1 && this.$store.state.play.status.mode === 1)
      },

      // 音量监听
      volume (volume) {
        player.volume = volume
      },

      // 播放列表变化监听  更新到local
      playList (list) {
        storage.setL('playList', list)
      },

      // 喜欢列表监听 更新到local
      likeList (list) {
        storage.setL('likeList', list)
      },

      // 播放列表监听  变化时更新到local
      playCurrent (current) {
        storage.setL('playCurrent', current)
        storage.setL('playStatus', this.$store.state.play.status)
      }
    }
  }
</script>

<style scoped>
  /*@import "css/mui/mui.min.css";*/
  @import "css/app.css";
  @import "css/animate.css";
  @import "css/magic.css";
</style>
