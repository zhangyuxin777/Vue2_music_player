<style scoped>
  @import "css/playBar.css";
</style>

<template>
  <div class="play-bar" :class="{'play-bar-down':showMusicContent}">
    <div class="cycle">
      <img :src="songImg" @click="toContent" id="album">
    </div>
    <div class="panel">
      <div class="box">
        <div class="progress-bar">
          <div class="progress" :style="{width:progress+'%'}"></div>
          <div class="point" :style="{left:progress+'%'}"></div>
        </div>
        <div class="song">
          <div class="song-name">{{current.data.songname}}</div>
          <div class="singer-name">{{current.data.singer[0].name}}</div>
        </div>
        <div class="control">
          <div class="sprites" @click="playClick" :class="{'ic_pause':playing , 'ic_play' : !playing}"></div>
          <div class="sprites ic_next" @click="next"></div>
          <div class="sprites ic_menu" @click="toPop"></div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        progress: state => (state.play.status.position / parseFloat(state.play.status.total) * 100),
        mode: state => state.play.status.mode,
        current: state => state.play.current,
        playing: state => state.play.status.playing,
        rotate: state => state.play.status.rotate,
        showMusicContent: state => state.play.showMusicContent,
        songImg: state => {
          if (state.play.current.data.albummid) {
            return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + state.play.current.data.albummid + '.jpg'
          }
        }
      })
    },
    methods: {
      playClick () {
        this.$store.dispatch('switchPlayerStatus')
      },
      next () {
        this.$store.dispatch('nextSong')
      },
      toPop () {
        this.$store.dispatch('togglePopList', true)
      },
      toContent () {
        if (this.$store.state.play.current.data.songid) {
          this.$router.push({
            name: 'musicContent'
          })
          this.$store.dispatch('switchMusicContent', true)
        }
      }
    },
    mounted () {
      if (window.location.hash.indexOf('musicContent') >= 0) {
        this.$store.dispatch('switchMusicContent', true)
      }
    },
    watch: {
      playing (playing) {
        if (!document.getElementById('album')) {
          return
        }
        if (playing) {
          document.getElementById('album').style.transition = 'all ' + (this.$store.state.play.status.total - this.$store.state.play.status.position) + 's linear'
          document.getElementById('album').style.webkitTransition = 'all ' + (this.$store.state.play.status.total - this.$store.state.play.status.position) + 's linear'
          document.getElementById('album').style.transform = 'rotate(' + this.$store.state.play.status.total * 5 + 'deg)'
          document.getElementById('album').style.webkitTransition = 'rotate(' + this.$store.state.play.status.total * 5 + 'deg)'
        } else {
          document.getElementById('album').style.transition = 'none'
          document.getElementById('album').style.webkitTransition = 'none'
          document.getElementById('album').style.transform = 'rotate(' + this.$store.state.play.status.position * 5 + 'deg)'
          document.getElementById('album').style.webkitTransition = 'rotate(' + this.$store.state.play.status.position * 5 + 'deg)'
        }
      },
      current () {
        let _this = this
        document.getElementById('album').style.transition = 'none'
        document.getElementById('album').style.webkitTransition = 'none'
        document.getElementById('album').style.transform = 'rotate(0deg)'
        document.getElementById('album').style.webkitTransition = 'rotate(0deg)'
        setTimeout(function () {
          document.getElementById('album').style.transition = 'all ' + (_this.$store.state.play.status.total - _this.$store.state.play.status.position) + 's linear'
          document.getElementById('album').style.webkitTransition = 'all ' + (_this.$store.state.play.status.total - _this.$store.state.play.status.position) + 's linear'
          document.getElementById('album').style.transform = 'rotate(' + _this.$store.state.play.status.total * 5 + 'deg)'
          document.getElementById('album').style.webkitTransition = 'rotate(' + _this.$store.state.play.status.total * 5 + 'deg)'
        }, 500)
      }
    }
  }
</script>
