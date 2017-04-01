<style scoped>
  @import "css/mainView.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="main">
      <div class="tab">
        <div class="bar" :class="{'active-bar':barStatus === 0}" @click="switchBar(0)">推荐</div>
        <div class="bar" :class="{'active-bar':barStatus === 1}" @click="switchBar(1)">歌手</div>
        <div class="bar" :class="{'active-bar':barStatus === 2}" @click="switchBar(2)">排行榜</div>
        <div class="bar" :class="{'active-bar':barStatus === 3}" @click="switchBar(3)">专辑</div>
        <div class="bar" :class="{'active-bar':barStatus === 4}" @click="switchBar(4)">歌单</div>
        <div class="bar" :class="{'active-bar':barStatus === 5}" @click="switchBar(5)">MV</div>
        <span style="clear: both"></span>
      </div>
      <div class="content">
        <singerList :class="{'hide':barStatus !== 1}"></singerList>
        <rankList :class="{'hide':barStatus !== 2}"></rankList>
        <albumList :class="{'hide':barStatus !== 3}"></albumList>
        <dissList :class="{'hide':barStatus !== 4}"></dissList>
        <mvList :class="{'hide':barStatus !== 5}"></mvList>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  //  import API from '../js/api'
  import rankList from './rankList'
  import singerList from './singerList'
  import dissList from './dissList'
  import albumList from './albumList'
  import mvList from './MVList'
  import {mapState} from 'vuex'
  export default{
    data () {
      return {}
    },

    components: {
      rankList,
      singerList,
      dissList,
      albumList,
      mvList
    },
    computed: {
      ...mapState({
        barStatus: state => state.barStatus
      })
    },
    methods: {
      switchBar (barStatus) {
        this.$store.dispatch('switchBar', barStatus)
      }
    },
    watch: {}
  }
</script>
