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
    <div class="voice-box" v-show="showLyric">
      <span class="sprites ic_voice"></span>
      <input id="volume" class="range" type="range" min="0" max="100" @input="volumeChange" v-model="value">
    </div>
    <div class="lyric-box" id="lyricBox" v-show="showLyric" @click="switchLyric">
      <ul class="lyric-list" id="lyricList">
        <li v-for="(item,index) in list" class="item lyricItem">
          <div class="text" :id="item.id">
            {{item.text}}
          </div>
        </li>
      </ul>
    </div>
    <div class="cd-box" v-show="!showLyric" @click="switchLyric">
      <div class="cd" :class="{'ani':rotate}" id="record">
        <div class="cd-side"></div>
        <img :src="songImg" class="cd-img" alt="">
      </div>
      <div class="needle" :class="{'needle_play' : playing}"></div>
      <div class="needle_2"></div>
    </div>
    <div class="click-box" v-show="!showLyric">
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
  import Common from '../js/rock'
  import $ from 'jquery'
  import storage from '../js/storage'
  import {mapState} from 'vuex'
  export default{
    data () {
      return {
        lyricList: {},
        currentLyric: null,
        index: 0,
        value: 0
      }
    },
    computed: {
      ...mapState({
        progress: state => (state.play.status.position / parseFloat(state.play.status.total) * 100),
        mode: state => state.play.status.mode,
        current: state => state.play.current,
        playing: state => state.play.status.playing,
        rotate: state => state.play.status.rotate,
        showLyric: state => state.play.status.showLyric,
        volume: state => state.play.status.volume,
        isLike: state => {
          let isExist = false
          for (let item of state.like.list) {
            if (item.data.songid === state.play.current.data.songid) {
              isExist = true
              break
            }
          }
          return isExist
        },
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
            m: isNaN(parseInt(state.play.status.total / 60)) ? 0 : parseInt(state.play.status.total / 60),
            s: isNaN(parseInt(state.play.status.total % 60)) ? 0 : num
          }
        },
        songImg: state => {
          if (state.play.current.data.albummid) {
            return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + state.play.current.data.albummid + '.jpg'
          }
        },
        list () {
          return this.lyricList
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
      switchLyric () {
        this.$store.dispatch('switchLyric')
      },
      toPop () {
        this.$store.dispatch('togglePopList', true)
      },
      isCurrent (id) {
        return id === this.$store.state.play.current.data.songid
      },
      back () {
        this.$store.dispatch('switchMusicContent', false)
      },
      volumeChange () {
        this.$store.dispatch('setVolume', event.target.value / parseFloat(event.target.getAttribute('max')))
      }
    },
    watch: {
      current (curr) {
        this.lyricList = {}
        this.$http.jsonp('https://api.darlin.me/music/lyric/' + curr.data.songid, {
          jsonp: 'callback'
        }).then(function (response) {
          let sss = Base64.decode(response.data.lyric)
          try {
            document.getElementById(this.currentLyric).classList.remove('current')
          } catch (e) {
          }
          this.currentLyric = null
          sss.split('[').slice(5).map((item) => {
            let time = item.split(']')[0]
            this.lyricList[(parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]))] = {
              id: this.current.data.songid.toString() + '_' + (parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])),
              time: time,
              text: item.split(']')[1]
            }
          })
        })
        this.value = parseInt(document.getElementById('volume').getAttribute('max')) * this.$store.state.play.status.volume
      },
      playing (playing) {
        if (document.getElementById('record')) {
          document.getElementById('record').style.webkitAnimationPlayState = playing ? 'running' : 'paused'
          document.getElementById('record').style.animationPlayState = playing ? 'running' : 'paused'
        }
      },
      progress (pro) {
        let time = parseInt(this.currentTime.m) * 60 + parseInt(this.currentTime.s)
        let id = this.current.data.songid.toString() + '_' + time.toString()
        if (this.lyricList.hasOwnProperty(time) && id !== this.currentLyric) {
          try {
            let ele = $('#lyricBox').find('.current')
            $('#lyricBox').animate({'scrollTop': $('#lyricBox').scrollTop() + ele.offset().top - $('#lyricBox').offset().top - this.$store.state.fontSize * 0.1 * 35 + 35}, 350)
          } catch (e) {
          }
          if (Common.trim(this.lyricList[time].text).length !== 0) {
            try {
              document.getElementById(id).classList.add('current')
              document.getElementById(this.currentLyric).classList.remove('current')
            } catch (e) {
            }
            this.currentLyric = id
          }
        }
      },
      volume (volume) {
        this.value = parseInt(document.getElementById('volume').getAttribute('max')) * volume
      },
      isLike () {
        storage.setL('likeList', this.$store.state.like.list)
      }
    }
  }
</script>
