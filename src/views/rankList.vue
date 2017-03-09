<style scoped>
  @import "css/rankList.css";
</style>
<template>
  <ul class="rank-list">
    <li v-for="(item,index) in list" class="item" @click="toList(item.id)">
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
</template>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        topList: []
      }
    },
    methods: {
      toList (id) {
        this.$router.push({
          name: 'rankContent',
          query: {id: id}
        })
        console.log(this.$store.state.count)
      }
    },
    computed: {
      list () {
        return this.topList
      }
    },
    beforeMount () {
      this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
        params: {
          g_tk: 5381,
          uin: 0,
          format: 'jsonp',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          _: new Date().getTime()
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        this.topList = response.data.data.topList
      })
    }
  }

</script>
