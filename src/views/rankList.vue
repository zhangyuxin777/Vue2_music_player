<style scoped>
  @import "css/rankList.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div>
      <ul class="rank-list">
        <li v-for="(item,index) in list" class="item" @click="toContent(item.id)">
          <div class="picture">
            <img :src="item.picUrl"/>
            <div class="listen_box">
              <span class="listen_count">{{(item.listenCount/10000).toFixed(0)}}万</span>
              <span class="sprites ic_listen"></span>
            </div>
          </div>
          <div class="top-list">
            <div class="top-item" rel="" v-for="(topItem,topIndex) in item.songList">
              {{topIndex+1}}.{{topItem.songname}}-{{topItem.singername}}
            </div>
          </div>
          <span class="split-line"></span>
        </li>
      </ul>
      <div style="height: 1.4rem;background: transparent"></div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import API from '../js/api'
  export default{
    data () {
      return {
        topList: []
      }
    },
    methods: {
      toContent (id) {
        sessionStorage.setItem('rankListScrollTop', document.body.scrollTop)
        this.$router.push({
          name: 'rankContent',
          query: {id: id}
        })
      }
    },
    computed: {
      list () {
        return this.topList
      }
    },
    beforeMount () {
      let _this = this
      API.rankList(function (response) {
        _this.topList = response.data.data.topList
      })
    },
    mounted () {
      setTimeout(function () {
        document.body.scrollTop = parseInt(sessionStorage.getItem('rankListScrollTop'))
      }, 1000)
    }
  }

</script>
