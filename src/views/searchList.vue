<style scoped>
  @import "css/searchList.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="search-list">
      <div class="header title-bar">
        <div class="back" @click="back">
          <div class="sprites ic_back"></div>
        </div>
        <form action="javascrpit:void(0)" @submit.prevent="search" class="search-form">
          <input class="search-input" v-model="keyword" type="text" placeholder="搜索音乐/歌手" autocomplete="off">
        </form>
      </div>
      <ul class="list">
        <div class="zhida" @click="toSinger" :class="{'hide':zhida.mid.length===0}">
          <img class="pic" :src="zhida.pic" alt="">
          <span class="singer">歌手: <span class="name">{{zhida.singerName}}</span></span>
        </div>
        <li v-for="(item,index) in list" class="item" @click="playSong(item)" track-by="item.songid">
          <div class="i-content">
            <div class="songname">{{item.songname}}</div>
            <div class="singername">{{item.singer[0].name}} - {{item.albumname}}</div>
          </div>
          <div class="more sprites ic_more" @click="toMore(item)"></div>
          <div class="clear"></div>
          <span class="split-line"></span>
        </li>
      </ul>
      <div class="position" :class="{hide : list.length <= 0}"></div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import API from '../js/api'
  export default{
    data () {
      return {
        infoList: [],
        page: 1,
        keyword: '',
        zhida: {
          pic: '',
          singerName: '',
          id: '',
          mid: ''
        }
      }
    },
    methods: {
      playSong (item) {
        let currItem = {
          data: item
        }
        this.$store.dispatch('playSong', currItem)
      },
      isCurrent (id) {
        return id === this.$store.state.play.current.data.songid
      },
      toMore (item) {
        let currItem = {
          data: item
        }
        this.$store.dispatch('switchInfo', {
          current: currItem,
          isMusicContent: false
        })
        event.stopPropagation()
      },
      back () {
        window.history.back()
        this.$store.dispatch('switchMusicContent', false)
      },
      search () {
        let _this = this
        if (_this.keyword.length === 0) {
          return
        }
        _this.page = 1
        API.search(_this.keyword, _this.page, function (response) {
          console.log(response)
          _this.infoList = response.data.data.song.list
          if (response.data.data.zhida.hasOwnProperty('zhida_singer')) {
            _this.zhida.id = response.data.data.zhida.zhida_singer.singerID
            _this.zhida.mid = response.data.data.zhida.zhida_singer.singerMID
            _this.zhida.pic = '//y.gtimg.cn/music/photo_new/T001R150x150M000' + _this.zhida.mid + '.jpg?max_age=2592000'
            _this.zhida.singerName = response.data.data.zhida.zhida_singer.singerName
          } else {
            _this.zhida.mid = ''
          }
          _this.page += 1
        })
        console.log('search')
      },
      toSinger () {
        if (this.zhida.mid.length === 0) {
          return
        }
        this.$router.push({
          name: 'singerContent',
          query: {id: this.zhida.mid}
        })
      }
    },
    computed: {
      list () {
        return this.infoList
      }
    },
    beforeMount () {
      document.body.scrollTop = 0
    },
    mounted () {
      this.$store.dispatch('updateTitle', '搜索')
      if (window.location.hash.indexOf('musicContent') < 0) {
        this.$store.dispatch('switchMusicContent', false)
      }
    }
  }

</script>
