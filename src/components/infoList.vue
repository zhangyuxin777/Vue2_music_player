<style scoped>
  @import "css/infoList.css";
</style>

<template>
  <div>
    <div class="box-bg" :class="{'bg-pop':pop}" @click="toDown"></div>
    <div class="info-pop-box" :class="{'play-pop':pop}">
      <div class="title-box">
        <div class="title left"><span>歌曲:</span></div>
      </div>
      <ul class="list">
        <li class="playing-item">
          <div class="playing-song">
            <div class="sprites ic_menu"></div>
          </div>
          <div class="song-name"></div>
          <div class="singer-name"></div>
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
        return this.$store.state.play.info.show
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
        this.$store.dispatch('switchInfo', null)
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
