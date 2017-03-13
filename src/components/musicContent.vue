<style scoped>
  @import "css/musicContent.css";
</style>
<template>
  <div class="music-content">
    <div class="bg-op">
      <img :src="songImg" class="bg blur" alt="">
      <div class="mask"></div>
      <div class="gradient"></div>

    </div>
    <div class="header">
      <div class="back" @click="back">
        <div class="sprites ic_back"></div>
      </div>
      <div class="title">
        <div class="songname">{{current.data.songname}}</div>
        <div class="singername">{{current.data.singer[0].name}}</div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="cd" :class="{'ani':rotate}" id="record">
      <div class="cd-side"></div>
      <img :src="songImg" class="cd-img" alt="">
    </div>
    <div class="needle"></div>
    <div class="progress-box"></div>
    <div class="control-box">
      <div class="sprites mode" @click="switchMode"
           :class="{'m_0' : mode===0 ,'m_1' : mode===1 ,'m_2' : mode===2}"></div>
      <div class="sprites last-song" @click="last"></div>
      <div class="sprites play" @click="playClick" :class="{'pause' : playing ,'play' : !playing}"></div>
      <div class="sprites next-song" @click="next"></div>
      <div class="sprites menu" @click="toPop"></div>
    </div>
  </div>
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
      playClick () {
        this.$store.dispatch('switchPlayerStatus')
      },
      next () {
        this.$store.dispatch('nextSong')
      },
      last () {
        this.$store.dispatch('lastSong')
      },
      switchMode () {
        this.$store.dispatch('switchMode')
      },
      toPop () {
        this.$store.dispatch('togglePopList', true)
      },
      isCurrent (id) {
        return id === this.$store.state.play.current.data.songid
      },
      back () {
        this.$store.dispatch('switchMusicContent', false)
      }
    },
    computed: {
      current () {
        return this.$store.state.play.current
      },
      progress () {
        return (this.$store.state.play.status.position / parseFloat(this.$store.state.play.status.total) * 100)
      },
      playing () {
        return this.$store.state.play.status.playing
      },
      rotate () {
        if (document.getElementById('record')) {
          document.getElementById('record').style.webkitAnimationPlayState = this.$store.state.play.status.playing ? 'running' : 'paused'
          document.getElementById('record').style.animationPlayState = this.$store.state.play.status.playing ? 'running' : 'paused'
        }
        return this.$store.state.play.status.rotate
      },
      songImg () {
        if (this.$store.state.play.current.data.albummid) {
          return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + this.$store.state.play.current.data.albummid + '.jpg'
        }
      },
      mode () {
        return this.$store.state.play.status.mode
      }
    },
    beforeMount () {

    }
  }

</script>
