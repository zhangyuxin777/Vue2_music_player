<style scoped>
  @import "css/rankContent.css";
  @import "css/singerContent.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="rank-content singer-Content">
      <div class="banner">
        <img :src="getBanner" id="banImg" class="singer-img" v-if="getBanner">

      </div>
      <ul class="list">
        <li v-for="(item,index) in list" class="item" @click="playSong(item)" track-by="item.musicData.songid">
          <div class="i-title">
            <span class="sprites ic_menu" :class="{hide : !isCurrent(item.musicData.songid)}"></span>
            <span :class="{hide : isCurrent(item.musicData.songid)}">{{index+1}}</span>
          </div>
          <div class="i-content">
            <div class="songname">{{item.musicData.songname}}</div>
            <div class="singername">{{item.musicData.singer[0].name}} - {{item.musicData.albumname}}</div>
          </div>
          <div class="more sprites ic_more" @click="toMore(item)"></div>
          <div class="clear"></div>
          <span class="split-line"></span>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import API from '../js/api'
  export default{
    data () {
      return {
        infoList: [],
        _id: this.$route.query.id,
        info: ''
      }
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
      }
    },
    computed: {
      list () {
        return this.infoList
      },
      getBanner () {
        return '//y.gtimg.cn/music/photo_new/T001R150x150M000' + this.$route.query.id + '.jpg?max_age=2592000'
      }
    },
    beforeMount () {
      let _this = this
      API.singerDetail(this.$route.query.id, function (response) {
        _this.infoList = response.data.data.list
      })
      document.body.scrollTop = 0
    }
  }

</script>
