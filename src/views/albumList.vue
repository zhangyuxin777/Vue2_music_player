<style scoped>
  @import "css/albumList.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="album-list">
      <div class="title">全部专辑</div>
      <ul class="list">
        <li v-for="(item,index) in list" class="item" @click="toContent(item.album_mid)">
          <img :src="picUrl(item)"/>
          <div class="album-name">{{item.album_name}}</div>
          <div class="singer">{{item.singer_name}}</div>
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
        page: 1,
        isLoading: false
      }
    },
    methods: {
      toContent (id) {
        sessionStorage.setItem('albumListScrollTop', document.body.scrollTop)
        this.$router.push({
          name: 'albumContent',
          query: {id: id}
        })
      },
      picUrl (item) {
        return '//y.gtimg.cn/music/photo_new/T002R300x300M000' + item.album_mid + '.jpg?max_age=2592000'
      }
    },
    computed: {
      ...mapState({
        list: state => state.list.album
      })
    },
    beforeMount () {
      let _this = this
      API.albumList(_this.page, function (response) {
        _this.$store.dispatch('addMainList', {
          name: 'album',
          list: response.data.data.albumlist
        })
      })
    },
    mounted () {
    }
  }

</script>
