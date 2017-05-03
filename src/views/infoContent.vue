<style scoped>
  @import "css/infoContent.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOut" mode="out-in">

    <div>
      <ul>
        <li>
          <div>作者</div>
          <div>Bruce Zhang</div>
        </li>
        <li>
          <div>邮箱</div>
          <div>bruce777@foxmail.com</div>
        </li>
        <li>
          <div>qq</div>
          <div>976490170</div>
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
