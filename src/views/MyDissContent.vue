<style scoped lang="scss" type="text/css">
  @import "css/albumContent.scss";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="rank-content album-content">
      <div class="header">
        <div class="back" @click="back">
          <div class="sprites ic_back"></div>
        </div>
        <div class="title">
          <div class="singername">歌单</div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="banner">
        <img :src="getBanner" id="banImg" class="singer-img blur" v-if="getBanner">
        <div class="float-div"></div>
        <div class="info">
          <img :src="getBanner" class="album-pic" alt="">
          <img src="http://on7hxaasw.bkt.clouddn.com/album_cover.png" class="album-back" alt="">
          <div class="detail">
            <div class="album-name">{{getDissName}}</div>
            <div class="singer"><span class="sprites ic_poster"></span> {{getPosterName}}</div>
            <div class="date"><span class="sprites ic_music_count"></span>{{list.length}}</div>
          </div>
        </div>
      </div>
      <ul class="list con">
        <li v-for="(item,index) in list" class="item" @click="playSong(item)" track-by="item.data.songid">
          <div class="i-title">
            <span class="sprites ic_menu" :class="{hide : !isCurrent(item.data.songid)}"></span>
            <span :class="{hide : isCurrent(item.data.songid)}">{{index+1}}</span>
          </div>
          <div class="i-content">
            <div class="songname">{{item.data.songname}}</div>
            <div class="singername">{{item.data.singer[0].name}} - {{item.data.albumname}}</div>
          </div>
          <div class="more sprites ic_more" @click="toMore(item)"></div>
          <div class="clear"></div>
          <span class="split-line"></span>
        </li>
      </ul>
      <div class="position"></div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {}
    },
    methods: {
      playSong (item) {
        this.$store.dispatch('playSong', item)
      },
      isCurrent (id) {
        return id === this.$store.state.play.current.data.songid
      },
      toMore (item) {
        this.$store.dispatch('switchInfo', {
          current: item,
          isMusicContent: false
        })
        event.stopPropagation()
      },
      back () {
        window.history.back()
      }
    },
    computed: {
      list () {
        if (this.$route.query.id === 0 || this.$route.query.id === '0') {
          return this.$store.state.like.list
        } else if (this.$route.query.id === 1 || this.$route.query.id === '1') {
          return this.$store.state.myDiss.list
        }
      },
      getId () {
        return this.$route.query.id
      },
      getBanner () {
        if (this.$route.query.id === 0 || this.$route.query.id === '0') {
          return this.$store.state.like.list.length !== 0 ? 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + this.$store.state.like.list[0].data.albummid + '.jpg' : ''
        } else if (this.$route.query.id === 1 || this.$route.query.id === '1') {
          return this.$store.state.myDiss.list.length !== 0 ? 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + this.$store.state.myDiss.list[0].data.albummid + '.jpg' : ''
        }
      },
      getDissName () {
        if (this.$route.query.id === 0 || this.$route.query.id === '0') {
          return '我喜欢的音乐'
        } else if (this.$route.query.id === 1 || this.$route.query.id === '1') {
          return '新建歌单'
        }
      },
      getPosterName () {
        return 'myself'
      },
      getDate () {
        return this.date
      }
    },
    beforeMount () {
      document.body.scrollTop = 0
    },
    mounted () {
      if (window.location.hash.indexOf('musicContent') < 0) {
        this.$store.dispatch('switchMusicContent', false)
      }
    }
  }

</script>
