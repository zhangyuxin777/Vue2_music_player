<style scoped>
  @import "css/musicContent.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="music-content op-show">
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
        <div class="cd" id="record">
          <div class="cd-side"></div>
          <img :src="songImg" class="cd-img" alt="">
        </div>
        <div class="needle" :class="{'needle_play' : playing}"></div>
        <div class="needle_2"></div>
      </div>
      <div class="click-box" v-show="!showLyric">
        <div class="sprites like" :class="{'like-do' : isLike}" @click="switchLike"></div>
        <div class="sprites download" @click="toDown"></div>
        <div class="sprites more" @click="toMore"></div>
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
      <a id="download" :href="url" download="music.mp3"></a>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import API from '../js/api'
  import Base64 from '../js/base64'
  import Common from '../js/rock'
  import $ from 'jquery'
  import storage from '../js/storage'
  import {mapState} from 'vuex'
  import mui from '../js/mui.all'
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
        showMusicContent: state => state.play.showMusicContent,
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
        },
        url: state => {
          if (state.play.current.data && state.play.current.data.songid) {
            return 'http://ws.stream.qqmusic.qq.com/' + state.play.current.data.songid + '.m4a?fromtag=46'
          }
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
        window.history.back()
        this.$store.dispatch('switchMusicContent', false)
      },
      volumeChange () {
        this.$store.dispatch('setVolume', event.target.value / parseFloat(event.target.getAttribute('max')))
      },
      toMore () {
        this.$store.dispatch('switchInfo', {
          current: this.$store.state.play.current,
          isMusicContent: true
        })
        event.stopPropagation()
      },
      toDown () {
        if (Common.system().android) {
          document.getElementById('download').click()
        } else if (Common.system().ios) {
          mui.alert('ios系统不支持下载')
        }
        event.stopPropagation()
      }
    },
    mounted () {
      let _this = this
      setTimeout(function () {
        if (_this.$store.state.play.status.playing) {
          console.log('ing')
          document.getElementById('record').style.transition = 'none'
          document.getElementById('record').style.webkitTransition = 'none'
          document.getElementById('record').style.transform = 'rotate(' + _this.$store.state.play.status.position * 5 + 'deg)'
          document.getElementById('record').style.webkitTransition = 'rotate(' + _this.$store.state.play.status.position * 5 + 'deg)'
          setTimeout(function () {
            document.getElementById('record').style.transition = 'all ' + (_this.$store.state.play.status.total - _this.$store.state.play.status.position) + 's linear'
            document.getElementById('record').style.webkitTransition = 'all ' + (_this.$store.state.play.status.total - _this.$store.state.play.status.position) + 's linear'
            document.getElementById('record').style.transform = 'rotate(' + _this.$store.state.play.status.total * 5 + 'deg)'
            document.getElementById('record').style.webkitTransition = 'rotate(' + _this.$store.state.play.status.total * 5 + 'deg)'
          }, 300)
        } else {
          console.log('no')
          document.getElementById('record').style.transition = 'none'
          document.getElementById('record').style.webkitTransition = 'none'
          document.getElementById('record').style.transform = 'rotate(' + _this.$store.state.play.status.position * 5 + 'deg)'
          document.getElementById('record').style.webkitTransition = 'rotate(' + _this.$store.state.play.status.position * 5 + 'deg)'
        }
      }, 500)
      this.$store.dispatch('switchMusicContent', true)
      this.$store.dispatch('updateTitle', this.$store.state.play.current.data.songname + '-' + this.$store.state.play.current.data.singer[0].name)
    },
    watch: {
      current (curr) {
        let _this = this
        if (_this.$store.state.play.status.playing) {
          document.getElementById('record').style.transition = 'none'
          document.getElementById('record').style.webkitTransition = 'none'
          document.getElementById('record').style.transform = 'rotate(0deg)'
          document.getElementById('record').style.webkitTransition = 'rotate(0deg)'
          setTimeout(function () {
            document.getElementById('record').style.transition = 'all ' + (_this.$store.state.play.status.total - _this.$store.state.play.status.position) + 's linear'
            document.getElementById('record').style.webkitTransition = 'all ' + (_this.$store.state.play.status.total - _this.$store.state.play.status.position) + 's linear'
            document.getElementById('record').style.transform = 'rotate(' + _this.$store.state.play.status.total * 5 + 'deg)'
            document.getElementById('record').style.webkitTransition = 'rotate(' + _this.$store.state.play.status.total * 5 + 'deg)'
          }, 500)
        }
        this.lyricList = {}
        if (!curr.data.songid) {
          return
        }
        try {
          let _this = this
          API.getLyric(curr.data.songid, function (response) {
            let sss = Base64.decode(response.data.lyric)
            try {
              document.getElementById(this.currentLyric).classList.remove('current')
            } catch (e) {
            }
            _this.currentLyric = null
            sss.split('[').slice(5).map((item) => {
              let time = item.split(']')[0]
              _this.lyricList[(parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]))] = {
                id: _this.current.data.songid.toString() + '_' + (parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])),
                time: time,
                text: item.split(']')[1]
              }
            })
          }, function (response) {
            console.log('获取歌词失败')
            let myArray = [0, 1, 2, 3, 4, 5, 6, 7]
            for (let item of myArray) {
              if (item === 7) {
                _this.lyricList[item] = {
                  id: item,
                  time: item,
                  text: '暂无歌词'
                }
              } else {
                _this.lyricList[item] = {
                  id: item,
                  time: item,
                  text: ''
                }
              }
            }
          })
        } catch (e) {
          console.log(e)
        }
        this.value = parseInt(document.getElementById('volume').getAttribute('max')) * this.$store.state.play.status.volume
      },
      playing (playing) {
        if (!document.getElementById('record')) {
          return
        }
        if (playing) {
          document.getElementById('record').style.transition = 'all ' + (this.$store.state.play.status.total - this.$store.state.play.status.position) + 's linear'
          document.getElementById('record').style.webkitTransition = 'all ' + (this.$store.state.play.status.total - this.$store.state.play.status.position) + 's linear'
          document.getElementById('record').style.transform = 'rotate(' + this.$store.state.play.status.total * 5 + 'deg)'
          document.getElementById('record').style.webkitTransition = 'rotate(' + this.$store.state.play.status.total * 5 + 'deg)'
        } else {
          document.getElementById('record').style.transition = 'none'
          document.getElementById('record').style.webkitTransition = 'none'
          document.getElementById('record').style.transform = 'rotate(' + this.$store.state.play.status.position * 5 + 'deg)'
          document.getElementById('record').style.webkitTransition = 'rotate(' + this.$store.state.play.status.position * 5 + 'deg)'
        }
      },
      progress (pro) {
        let time = 0
        let id = null
        try {
          time = parseInt(this.currentTime.m) * 60 + parseInt(this.currentTime.s)
          id = this.current.data.songid.toString() + '_' + time.toString()
        } catch (e) {

        }
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
      },
      showLyric () {
        storage.setL('playStatus', this.$store.state.play.status)
      }
    }
  }
</script>
