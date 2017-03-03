<style scoped>
  @import "css/rankList.css";
</style>
<template>
  <ul class="rank-list">
    <li v-for="(item,index) in list" class="item">
      <img class="picture" :src="item.picUrl"/>
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
      show (data) {
        console.log(data)
      }
    },
    computed: {
      list () {
        return this.topList
      },
      songList () {
        return this.topList.songList
      }
    },

    mounted () {
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
        this.show(response.data.data.topList)
      })
    }
  }

</script>
