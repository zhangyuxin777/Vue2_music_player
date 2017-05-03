<style scoped>
  @import "css/mvList.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="mv-list">
      <div class="title">全部MV</div>
      <ul class="list">
        <li v-for="(item,index) in list" class="item" @click="toContent(item.vid)">
          <img :src="item.picurl.replace(/http/g, 'https')"/>
          <div class="album-name">{{item.mvtitle.split('(')[0]}}</div>
          <div class="singer">{{item.singername}}</div>
        </li>
      </ul>
      <div class="position"></div>
    </div>

  </transition>
</template>
<script type="text/ecmascript-6">
  import API from '../js/api'
  import {mapState} from 'vuex'
  export default{
    data () {
      return {
        infoList: [],
        page: 0,
        isLoading: false
      }
    },
    methods: {
      toContent (id) {
        sessionStorage.setItem('mvListScrollTop', document.body.scrollTop)
        this.$router.push({
          name: 'mvContent',
          query: {id: id}
        })
      }
    },
    computed: {
      ...mapState({
        list: state => state.list.mv
      })
    },
    beforeMount () {
      let _this = this
      API.mvList(_this.page, function (response) {
        _this.$store.dispatch('addMainList', {
          name: 'mv',
          list: response.data.data.mvlist
        })
      })
    },
    mounted () {
    }
  }

</script>
