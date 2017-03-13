<style scoped>
  @import "css/playBar.css";
</style>

<template>
  <div class="play-bar">
    <div class="cycle">
      <img :src="songImg" :class="{'ani':rotate}" @click="toContent" id="album">
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
<script>
  export default {
    computed: {
      current () {
        return this.$store.state.play.current
      },
      songImg () {
        if (this.$store.state.play.current.data.albummid) {
          return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + this.$store.state.play.current.data.albummid + '.jpg'
        }
      },
      progress () {
        return (this.$store.state.play.status.position / parseFloat(this.$store.state.play.status.total) * 100)
      },
      playing () {
        if (document.getElementById('album')) {
          document.getElementById('album').style.webkitAnimationPlayState = this.$store.state.play.status.playing ? 'running' : 'paused'
          document.getElementById('album').style.animationPlayState = this.$store.state.play.status.playing ? 'running' : 'paused'
        }
        return this.$store.state.play.status.playing
      },
      rotate () {
        return this.$store.state.play.status.rotate
      }
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
          this.$store.dispatch('switchMusicContent', true)
        }
      }
    }
  }
</script>
