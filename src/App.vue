<style scoped>
  /*@import "css/mui/mui.min.css";*/
  @import "css/app.css";
  @import "css/animate.css";
  @import "css/magic.css";
</style>
<template>
  <div id="app">
    <play-bar></play-bar>
    <info-list></info-list>
    <play-list></play-list>
    <router-view></router-view>
    <audio id="player" autoplay="autoplay"
           :src="url"
           @timeupdate="updateProgress"
           @ended="complete"
           @play="playEvent"
           @pause="pauseEvent"
           @error="error"
           @stalled="stalled">
    </audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import playBar from './components/playBar'
  import infoList from './components/infoList'
  import playList from './components/playList'
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
    methods: {
      updateProgress () {
        this.$store.dispatch('progress', {total: player.duration, position: player.currentTime})
      },
      complete () {
        console.log('complete')
        this.$store.dispatch('nextSong')
        this.$store.dispatch('switchRotate', false)
      },
      playEvent () {
        urlError = false
        this.$store.dispatch('switchRotate', true)
      },
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
    beforeMount () {
      if (Common.system().android) {
        $('body').addClass('weixin-android')
      } else if (Common.system().ios) {
        $('body').addClass('weixin-ios')
      }
      if (Common.system().weixin) {

      }
    },
    mounted () {
      let _this = this
      _this.$store.dispatch('updateTitle', 'vue_music')
      player = document.getElementById('player')
      _this.$store.dispatch('setFontSize', $('html').css('font-size').split('px')[0])
      _this.$store.dispatch('init', {
        playList: storage.getL('playList'),
        playCurrent: storage.getL('playCurrent'),
        playStatus: storage.getL('playStatus'),
        likeList: storage.getL('likeList')
      })
      if (window.location.hash.indexOf('musicContent') < 0) {
        this.$store.dispatch('switchMusicContent', false)
      }
      document.onkeydown = function (event) {
        if (event && event.keyCode === 32) {
          _this.$store.dispatch('switchPlayerStatus')
          event.stopPropagation()
          event.preventDefault()
        } else if (event && event.keyCode === 37) {
          _this.$store.dispatch('lastSong')
          event.stopPropagation()
          event.preventDefault()
        } else if (event && event.keyCode === 39) {
          _this.$store.dispatch('nextSong')
          event.stopPropagation()
          event.preventDefault()
        } else if (event && event.keyCode === 38) {
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
    watch: {
      playing (val) {
        if (player && player.currentSrc.length !== 0 && !urlError) {
          if (val) {
            player.play()
          } else {
            player.pause()
          }
        }
      },
      mode (mode) {
        player.loop = (mode === 0 || (mode === 1 && this.$store.state.play.list.length === 1))
      },
      autoplay (autoplay) {
        player.autoplay = autoplay
      },
      listLength (length) {
        player.loop = (this.$store.state.play.status.mode === 0) || (length === 1 && this.$store.state.play.status.mode === 1)
      },
      volume (volume) {
        player.volume = volume
      },
      playList (list) {
        storage.setL('playList', list)
      },
      likeList (list) {
        storage.setL('likeList', list)
      },
      playCurrent (current) {
        storage.setL('playCurrent', current)
        storage.setL('playStatus', this.$store.state.play.status)
      }
    }
  }
</script>
