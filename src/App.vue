<style scoped>
  @import "css/mui/mui.min.css";
  @import "css/app.css";
  @import "css/animate.css";
  @import "css/magic.css";
</style>
<template>
  <div id="app">
    <transition name="play-bar-tran" enter-active-class="animated slideInUp fast"
                leave-active-class="animated slideOutDown fast" mode="out-in">
      <play-bar v-show="!showContent"></play-bar>
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
      <music-content v-show="showContent"></music-content>
    </transition>
  </div>
</template>

<script>
  import playBar from './components/playBar'
  import playList from './components/playList'
  import musicContent from './components/musicContent'
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
      mode () {
        return this.$store.state.play.status.mode
      },
      current () {
        return this.$store.state.play.current
      },
      url () {
        if (this.$store.state.play.current.data && this.$store.state.play.current.data.songid) {
          return 'http://ws.stream.qqmusic.qq.com/' + this.$store.state.play.current.data.songid + '.m4a?fromtag=46'
        }
      },
      playing () {
        return this.$store.state.play.status.playing
      },
      isShow () {
        return this.$store.state.play.isShow
      },
      showContent () {
        return this.$store.state.play.showMusicContent
      }
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
//      let mode = this.$store.state.play.status.mode
//      player.loop = (mode === 0 || (mode === 1 && this.$store.state.play.list.length === 1))
//      console.log((mode === 0 || (mode === 1 && this.$store.state.play.list.length === 1)))
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
//        let mode = this.$store.state.play.status.mode
//        player.loop = (mode === 0 || (mode === 1 && this.$store.state.play.list.length === 1))
      },
      mode (val) {
        player.loop = (val === 0 || (val === 1 && this.$store.state.play.list.length === 1))
      }
    }
  }
</script>
