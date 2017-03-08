<style scoped>
  @import "css/playList.css";
</style>

<template>
  <div>
    <div class="box-bg" :class="{'bg-pop':pop}" @click="toDown"></div>
    <div class="play-pop-box" :class="{'play-pop':pop}">
      <div class="title-box">
        <div class="cleanList left opacity0">清空</div>
        <div class="title">播放列表 <span class="count">({{list.length}}首)</span></div>
        <div class="cleanList right" @click="clean">清空</div>
      </div>
      <span class="split-line"></span>
      <ul class="list">
        <li class="playing-item" @click="clickItem(data)" v-for="(data,index) in list">
          <div class="playing-song" :class="{'hide':current.data.songid!==data.data.songid}">
            <div class="sprites ic_menu"></div>
          </div>
          <div class="song-name"
               :class="{'red':current.data.songid===data.data.songid,'playing-name':current.data.songid===data.data.songid}">
            {{data.data.songname}}
          </div>
          <div class="singer-name" :class="{'red':current.data.songid===data.data.songid}">
            {{data.data.singer[0].name}}
          </div>
          <div class="icon-box" @click="removeItem(data)">
            <span class="sprites ic_close"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import mui from '../js/mui.all'
  export default{
    computed: {
      list () {
        return this.$store.state.play.list
      },
      pop () {
        return this.$store.state.play.popList.pop
      },
      current () {
        return this.$store.state.play.current
      }
    },
    methods: {
      clean () {
        let _this = this
        if (_this.list.length > 0) {
          console.log(true)
          mui.confirm('确定清空播放列表?', '提示', ['确定', '取消'], function (e) {
            if (e.index === 0) {
              _this.$store.dispatch('cleanPlayList')
              console.log('clean')
            }
          })
        }
      },
      toDown () {
        this.$store.dispatch('togglePopList', false)
      },
      clickItem (item) {
        this.$store.dispatch('playSong', item)
      },
      removeItem (item) {
        event.stopPropagation()
        this.$store.dispatch('removeFromPlayList', item)
      }
    }
  }

</script>
