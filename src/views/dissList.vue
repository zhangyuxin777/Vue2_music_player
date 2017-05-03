<style scoped>
  @import "css/dissList.css";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOut" mode="out-in">
    <div class="diss-list">
      <div class="place"></div>
      <div class="title"  v-show="likeList.length > 0 || myDissList.length > 0">我的歌单</div>
      <ul class="list">
        <li class="item other" v-show="likeList.length>0" @click="toMyDiss(0)">
          <div class="pic">
            <img :src="likePic"/>
            <div class="float-div"></div>
          </div>
          <div class="singer">我喜欢的音乐</div>
        </li>
        <li class="item other" v-show="myDissList.length>0" @click="toMyDiss(1)">
          <div class="pic">
            <img :src="myDissPic"/>
            <div class="float-div"></div>
          </div>
          <div class="singer">新建歌单</div>
        </li>
      </ul>
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
        sessionStorage.setItem('dissListScrollTop', document.body.scrollTop)
        this.$router.push({
          name: 'dissContent',
          query: {id: id}
        })
      },
      toMyDiss (id) {
        sessionStorage.setItem('dissListScrollTop', document.body.scrollTop)
        this.$router.push({
          name: 'myDissContent',
          query: {id: id}
        })
      }
    },
    computed: {
      ...mapState({
        likeList: state => state.like.list,
        likePic: state => {
          if (state.like.list.length > 0) {
            return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + state.like.list[0].data.albummid + '.jpg'
          } else {
            return ''
          }
        },
        myDissList: state => state.myDiss.list,
        myDissPic: state => {
          if (state.myDiss.list.length > 0) {
            return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + state.myDiss.list[0].data.albummid + '.jpg'
          } else {
            return ''
          }
        }
      }),
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
