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
    <div class="lyric-box"></div>
    <div class="cd-box">
      <div class="cd" :class="{'ani':rotate}" id="record">
        <div class="cd-side"></div>
        <img :src="songImg" class="cd-img" alt="">
      </div>
      <div class="needle" :class="{'needle_play' : playing}"></div>
      <div class="needle_2"></div>
    </div>
    <div class="click-box">
      <div class="sprites like" :class="{'like-do' : isLike}" @click="switchLike"></div>
      <div class="sprites download"></div>
      <div class="sprites more"></div>
    </div>
    <div class="progress-box">
      <span class="current_time">{{currentTime.m}}:{{currentTime.s}}</span>
      <div class="progress-bar">
        <div class="progress" :style="{width:progress+'%'}"></div>
        <div class="point" :style="{left:progress+'%'}"></div>
      </div>
      <div class="total_time">{{totalTime.m}}:{{totalTime.s}}</div>
    </div>
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
  import Base64 from '../js/base64'
  import {mapState} from 'vuex'
  export default{
    computed: {
      ...mapState({
        progress: state => (state.play.status.position / parseFloat(state.play.status.total) * 100),
        mode: state => state.play.status.mode,
        current: state => state.play.current,
        playing: state => state.play.status.playing,
        rotate: state => state.play.status.rotate,
        currentTime: state => {
          let num = (Array(2).join('0') + parseInt(state.play.status.position % 60)).slice(-2)
          return {
            m: parseInt(state.play.status.position / 60),
            s: num
          }
        },
        totalTime: state => {
          let num = (Array(2).join('0') + parseInt(state.play.status.total % 60)).slice(-2)
          return {
            m: parseInt(state.play.status.total / 60),
            s: num
          }
        },
        songImg: state => {
          if (state.play.current.data.albummid) {
            return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + state.play.current.data.albummid + '.jpg'
          }
        },
        isLike: state => {
          return state.like.list.indexOf(state.play.current) >= 0
        }
      })
    },
    methods: {
      playClick () {
        this.$store.dispatch('switchPlayerStatus')
      },
      switchLike () {
        this.$store.dispatch('switchLike', this.$store.state.play.current)
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
    watch: {
      current (curr) {
        console.log('current')
        this.$http.jsonp('https://api.darlin.me/music/lyric/' + curr.data.songid, {
          jsonp: 'callback'
        }).then(function (response) {
          console.log(Base64.decode(response.data.lyric))
        })
      },
      playing (playing) {
        if (document.getElementById('record')) {
          document.getElementById('record').style.webkitAnimationPlayState = playing ? 'running' : 'paused'
          document.getElementById('record').style.animationPlayState = playing ? 'running' : 'paused'
        }
      }
    }
  }
</script>
