<style scoped>
  @import "css/myInfo.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="my-info">
      <div class="header-box">
        <img
          src="https://wx.qlogo.cn/mmopen/sMlrIA3MDEJV89ZgX8CO0dx9qjFicdiatUqBO7WkU1IznnDaZ2Vt43icgf59duojU1VDBlayzn0bgledbeGTmic5NGicevp0H5dz1/0"
          alt="" class="header">
        <ul class="list ul">
          <li class="info-item">
            <div class="i-title">作者</div>
            <div class="i-con">Bruce Zhang</div>
          </li>
          <li class="info-item">
            <div class="i-title">邮箱</div>
            <div class="i-con">bruce777@foxmail.com</div>
          </li>
          <li class="info-item">
            <div class="i-title">qq</div>
            <div class="i-con">976490170</div>
          </li>
        </ul>
      </div>
      <span class="split-line"></span>
      <ul class="list">
        <li class="info-item">
          <div class="i-title">我的博客</div>
          <span class="split-line"></span>
        </li>
        <li class="info-item">
          <div class="i-title">我的简历</div>
          <span class="split-line"></span>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {}
    },
    methods: {
      back () {
        window.history.back()
        this.$store.dispatch('switchMusicContent', false)
      }
    },
    computed: {},
    beforeMount () {
    },
    mounted () {
    }
  }

</script>
