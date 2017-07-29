<style lang="scss" type="text/css">
    @import "css/myInfo.scss";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="my-info">
      <div class="title-bar">
        <span class="sprites ic_back" @click="back"></span>
        <span class="title">我</span>
        <span class="sprites search"></span>
      </div>
      <!--<div class="header-box">-->
      <!--<img-->
      <!--src="https://wx.qlogo.cn/mmopen/sMlrIA3MDEJV89ZgX8CO0dx9qjFicdiatUqBO7WkU1IznnDaZ2Vt43icgf59duojU1VDBlayzn0bgledbeGTmic5NGicevp0H5dz1/0"-->
      <!--alt="" class="header">-->
      <!--<ul class="list ul"></ul>-->
      <!--</div>-->
      <ul class="list">
        <li class="info-item">
          <div class="i-title">作者</div>
          <div class="i-con">Bruce Zhang</div>
          <span class="split-line"></span>
        </li>
        <li class="info-item">
          <div class="i-title">邮箱</div>
          <div class="i-con">bruce777@foxmail.com</div>
          <span class="split-line"></span>
        </li>
        <li class="info-item">
          <div class="i-title">QQ</div>
          <div class="i-con">976490170</div>
          <span class="split-line"></span>
        </li>
        <li class="info-item">
            <a  href="https://zhangyuxin777.github.io/dist/index.html#/">
                <div class="i-title">我的博客</div>
                <div class="i-con">-></div>
            </a>
          <span class="split-line"></span>
        </li>
        <li class="info-item">
          <div class="i-title">简历</div>
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
