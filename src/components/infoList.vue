<style scoped>
  @import "css/infoList.css";
</style>

<template>
  <div>
    <div class="box-bg" :class="{'bg-pop':pop}" @click="toDown"></div>
    <div class="info-pop-box" :class="{'play-pop':pop,'info-min-size':isMusicContent,'info-sec-size':isCurrent}">
      <div class="title-box">
        <div class="title left">歌曲：</div>
        <div class="songname">{{current.data.songname}}</div>
      </div>
      <ul class="list">
        <li class="info-item" v-show="!isMusicContent&&!isCurrent" @click="toAddNext">
          <div class="sprites ic_next"></div>
          <div class="con">下一首播放</div>
        </li>
        <li class="info-item" @click="toAddMyDiss">
          <div class="sprites ic_add"></div>
          <div class="con">收藏到歌单</div>
        </li>
        <li class="info-item" v-show="!isMusicContent">
          <div class="sprites ic_download"></div>
          <div class="con">下载</div>
        </li>
        <li class="info-item" @click="toSinger(current.data.singer[0].mid)">
          <div class="sprites ic_singer"></div>
          <div class="con">歌手：{{current.data.singer[0].name}}</div>
        </li>
        <li class="info-item" @click="toAlbum(current.data.albummid)">
          <div class="sprites ic_cd"></div>
          <div class="con">专辑：{{current.data.albumname}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import storage from '../js/storage'
  export default{
    computed: {
      ...mapState({
        list: state => state.play.list,
        pop: state => state.play.info.show,
        current: state => state.play.info.current,
        isMusicContent: state => state.play.info.isMusicContent
      }),
      isCurrent () {
        return this.$store.state.play.info.current.data.songid === this.$store.state.play.current.data.songid
      },
      inMyDiss () {
        for (let item of this.$store.state.myDiss.list) {
          if (item.data.songid === this.$store.play.info.current.data.songid) {
            return true
          }
        }
        return false
      }
    },
    methods: {
      toDown () {
        this.$store.dispatch('switchInfo', null)
      },
      toAddNext () {
        this.$store.dispatch('switchInfo', null)
        this.$store.dispatch('addNext', this.$store.state.play.info.current)
      },
      toAddMyDiss () {
        this.$store.dispatch('switchInfo', null)
        this.$store.dispatch('addMyDiss', this.$store.state.play.info.current)
        storage.setL('myDissList', this.$store.state.myDiss.list)
      },
      toSinger (id) {
        if (window.location.hash.indexOf('singerContent') >= 0) {
          this.$router.replace({
            name: 'singerContent',
            query: {id: id}
          })
        } else {
          this.$router.push({
            name: 'singerContent',
            query: {id: id}
          })
        }
        this.$store.dispatch('switchInfo', null)
        this.$store.dispatch('switchMusicContent', false)
      },
      toAlbum (id) {
        if (window.location.hash.indexOf('albumContent') >= 0) {
          this.$router.replace({
            name: 'albumContent',
            query: {id: id}
          })
        } else {
          this.$router.push({
            name: 'albumContent',
            query: {id: id}
          })
        }
        this.$store.dispatch('switchInfo', null)
        this.$store.dispatch('switchMusicContent', false)
      }
    }
  }

</script>
