<style scoped>
  @import "css/dissList.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="diss-list">
      <div class="title">热门歌单</div>
      <ul class="list">
        <li v-for="(item,index) in list" class="item" @click="toContent(item.dissid)">
          <div class="pic">
            <img :src="item.imgurl"/>
            <div class="float-div"></div>
            <div class="listen_box">
              <span class="listen_count">{{item.listennum}}</span>
              <span class="sprites ic_listen"></span>
            </div>
            <div class="singer_box">
              <span class="sprites ic_poster"></span>
              <span class="poster">{{item.author}}</span>
            </div>
          </div>
          <div class="singer">{{item.dissname}}</div>
        </li>
      </ul>
      <div class="position"></div>
    </div>

  </transition>
</template>
<script type="text/ecmascript-6">
  import API from '../js/api'
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
        sessionStorage.setItem('dissListScrollTop', document.body.scrollTop)
        this.$router.push({
          name: 'dissContent',
          query: {id: id}
        })
      }
    },
    computed: {
      list () {
        return this.infoList
      }
    },
    beforeMount () {
      let _this = this
      API.firstPage(function (response) {
        _this.infoList = response.data.data.hotdiss.list
      })
    },
    mounted () {
    }
  }

</script>
