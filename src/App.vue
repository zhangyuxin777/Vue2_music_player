<style scoped>
  @import "css/app.css";
  @import "css/mui/mui.min.css";
</style>
<template>
  <div id="app">
    <play-bar></play-bar>
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
    <div style="height: 1.4rem"></div>
  </div>
</template>

<script>
  import playBar from './components/playBar'
  import playList from './components/playList'
  let player = null
  var urlError = false
  export default {
    name: 'app',
    components: {
      playBar,
      playList
    },
    computed: {
      mode () {
        if (player && player.currentSrc.length !== 0) {
          player.loop = (this.$store.state.play.status.mode === 0)
        }
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
        if (player && player.currentSrc.length !== 0) {
          if (!urlError) {
//            if (this.$store.state.play.status.playing) {
//              player.play()
//            } else {
//              player.pause()
//            }
          }
        }
        return this.$store.state.play.status.playing
      },
      isShow () {
        return this.$store.state.play.isShow
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
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Microsoft YaHei', 'Hiragino Sans GB', Helvetica, Arial, 'Lucida Grande', sans-serif;
    width: 6.4rem;
    margin: 0 auto;
    padding: 0;
    font-size: 0.24rem;
    -webkit-tap-highlight-color: transparent;
    background-color: white;
    color: #404040;
  }
</style>
