<style scoped>
  @import "css/infoList.css";
</style>

<template>
  <div>
    <div class="box-bg" :class="{'bg-pop':pop}" @click="toDown"></div>
    <div class="info-pop-box" :class="{'play-pop':pop,'info-min-size':isMusicContent}">
      <div class="title-box">
        <div class="title left">歌曲：</div>
        <div class="songname">{{current.data.songname}}</div>
      </div>
      <ul class="list">
        <li class="info-item" v-show="!isMusicContent">
          <div class="sprites ic_next"></div>
          <div class="con">下一首播放</div>
        </li>
        <li class="info-item">
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
        <li class="info-item">
          <div class="sprites ic_cd"></div>
          <div class="con">专辑：{{current.data.albumname}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
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
      }
    },
    methods: {
      toDown () {
        this.$store.dispatch('switchInfo', null)
      },
      toSinger (id) {
        this.$router.push({
          name: 'singerContent',
          query: {id: id}
        })
        this.$store.dispatch('switchInfo', null)
        this.$store.dispatch('switchMusicContent', false)
      }
    }
  }

</script>
