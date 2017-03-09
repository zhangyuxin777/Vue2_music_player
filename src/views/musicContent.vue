<style scoped>
  @import "css/musicContent.css";
</style>
<template>
  <div class="music-content">
    <div class="bg-op">
      <img :src="songImg" class="bg blur" alt="">
      <div class="mask"></div>
    </div>
    <div class="header">
      <div class="back">
        <div class="sprites ic_back"></div>
      </div>
      <div class="title">
        <div class="songname"></div>
        <div class="singername"></div>
      </div>
    </div>
    <div class="cd"></div>
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
      playSong (item) {
        this.$store.dispatch('playSong', item)
      },
      isCurrent (id) {
        return id === this.$store.state.play.current.data.songid
      }
    },
    computed: {
      songImg () {
        if (this.$store.state.play.current.data.albummid) {
          return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + this.$store.state.play.current.data.albummid + '.jpg'
        }
      },
      list () {
        return this.topList
      },
      getBanner () {
        return this.topinfo.pic_h5
      }
    },
    beforeMount () {
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
        params: {
          topid: this.topid,
          format: 'jsonp',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'yqq',
          needNewCode: 0
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        this.topList = response.data.songlist
        this.topinfo = response.data.topinfo
      })
    }
  }

</script>
