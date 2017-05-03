<style scoped>
  @import "css/singerList.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="singer-list">
      <div class="title">全部歌手</div>
      <ul class="list">
        <li v-for="(item,index) in list" class="item" @click="toContent(item.Fsinger_mid)">
          <img :src="picUrl(item)"/>
          <div class="singer">{{item.Fsinger_name.split('(')[0]}}</div>
        </li>
      </ul>
      <div class="position" :class="{hide : list.length <= 0}"></div>
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
        page: 1,
        isLoading: false
      }
    },
    methods: {
      toContent (id) {
        sessionStorage.setItem('singerListScrollTop', document.body.scrollTop)
        this.$router.push({
          name: 'singerContent',
          query: {id: id}
        })
      },
      picUrl (item) {
        return 'https://y.gtimg.cn/music/photo_new/T001R150x150M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
      }
    },
    computed: {
      ...mapState({
        list: state => state.list.singer
      })
    },
    beforeMount () {
      let _this = this
      API.singerList(_this.page, function (response) {
        _this.$store.dispatch('addMainList', {
          name: 'singer',
          list: response.data.data.list
        })
      })
    },
    mounted () {
    }
  }

</script>
