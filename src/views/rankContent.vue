<style scoped>
  @import "css/rankContent.css";
</style>
<template>
  <div class="rank-content">
    <div class="banner">
      <img :src="getBanner" id="banImg">
    </div>
    <ul class="list">
      <li v-for="(item,index) in list" class="item" @click="playSong(item)">
        <div class="i-title" :class="{red : index<3}">{{index+1}}</div>
        <div class="i-content">
          <div class="songname">{{item.data.songname}}</div>
          <div class="singername">{{item.data.singer[0].name}} - {{item.data.albumname}}</div>
        </div>
        <div class="more"></div>
        <div class="clear"></div>
        <span class="split-line"></span>
      </li>
    </ul>
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
      }
    },
    computed: {
      list () {
        return this.topList
      },
      getBanner () {
        return this.topinfo.pic_h5
      }
    },

    mounted () {
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
