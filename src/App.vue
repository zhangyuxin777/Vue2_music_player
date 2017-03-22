<style scoped>
  /*@import "css/mui/mui.min.css";*/
  @import "css/app.css";
  @import "css/animate.css";
  @import "css/magic.css";
</style>
<template>
  <div id="app">
    <transition name="play-bar-tran" enter-active-class="animated slideInUp fast"
                leave-active-class="animated slideOutDown fast" mode="out-in">
      <play-bar v-show="!showMusicContent"></play-bar>
    </transition>
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
    <div style="height: 1.4rem;background: transparent"></div>
    <transition name="music-con-tran" enter-active-class="animated slideInUp"
                leave-active-class="animated slideOutDown fast" mode="out-in">
      <music-content v-show="showMusicContent"></music-content>
    </transition>
  </div>
</template>

<script>
  import playBar from './components/playBar'
  import playList from './components/playList'
  import musicContent from './components/musicContent'
  import {mapState} from 'vuex'
  import $ from 'jquery'
  import Common from './js/rock'
  let player = null
  let urlError = false
  export default {
    name: 'app',
    components: {
      playBar,
      playList,
      musicContent
    },
    computed: {
      ...mapState({
        mode: state => state.play.status.mode,
        current: state => state.play.current,
        playing: state => state.play.status.playing,
        isShow: state => state.play.isShow,
        showMusicContent: state => state.play.showMusicContent,
        listLength: state => state.play.list.length,
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
    mounted () {
      player = document.getElementById('player')
      this.$store.dispatch('setFontSize', $('html').css('font-size').split('px')[0])
      let _this = this
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
          player.volume = (_this.$store.state.play.status.volume > 0.9 ? 1 : _this.$store.state.play.status.volume += 0.1)
          event.stopPropagation()
          event.preventDefault()
        } else if (event && event.keyCode === 40) {
          player.volume = (_this.$store.state.play.status.volume < 0.1 ? 0 : _this.$store.state.play.status.volume -= 0.1)
          event.stopPropagation()
          event.preventDefault()
        }
      }
      window.onresize = function () {
        $('html').css('background', Common.isPC() ? 'aliceblue' : 'white')
      }
      window.onresize()
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
      listLength (length) {
        player.loop = (this.$store.state.play.status.mode === 0) || (length === 1 && this.$store.state.play.status.mode === 1)
      }
    }
  }
</script>
