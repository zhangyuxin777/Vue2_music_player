<style scoped>
  @import "css/rankContent.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="rank-content">
      <video src=""></video>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import API from '../js/api'
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
      list () {
        return this.topList
      },
      getBanner () {
//        return this.topinfo.pic_h5
      }
    },
    beforeMount () {
      let _this = this
      API.mvDetail(this.$route.query.id, function (response) {
        _this.topList = response.data.songlist
        _this.topinfo = response.data.topinfo
      })
      API.mvInfo(this.$route.query.id, function (response) {
        console.log(response.data)
      })
      document.body.scrollTop = 0
    },
    mounted () {
      if (window.location.hash.indexOf('musicContent') < 0) {
        this.$store.dispatch('switchMusicContent', false)
      }
    }
  }

</script>
