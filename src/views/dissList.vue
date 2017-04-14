<style scoped>
  @import "css/dissList.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="diss-list">
      <div class="title">热门歌单</div>
      <ul class="list">
        <li v-for="(item,index) in list" class="item" @click="toContent(item.id)">
          <img :src="item.imgurl"/>
          <div class="singer">{{item.dissname}}</div>
        </li>
      </ul>
      <div class="position"></div>
    </div>

  </transition>
</template>
<script type="text/ecmascript-6">
//  import API from '../js/api'
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
          name: 'rankContent',
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
//      let _this = this
//      API.firstPage(function (response) {
//        _this.infoList = response.data.data.hotdiss.list
//      })
    },
    mounted () {
    }
  }

</script>
