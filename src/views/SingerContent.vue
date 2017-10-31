<style scoped lang="scss" type="text/css">
    @import "css/singerContent.scss";
</style>
<template>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInRight"
                leave-active-class="animated fadeOut" mode="out-in">
        <div class="rank-content singer-Content">
            <div class="header">
                <div class="back" @click="back">
                    <div class="sprites ic_back"></div>
                </div>
                <div class="title">
                    <div class="singername">{{getSingerName}}</div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="banner">
                <img :src="getBanner" id="banImg" class="singer-img" v-if="getBanner">
                <div class="float-div"></div>
            </div>
            <div class="tab">
                <div class="bar" :class="{'active-bar':getBarStatus === 0}" @click="switchBar(0)">热门 30</div>
                <div class="bar" :class="{'active-bar':getBarStatus === 1}" @click="switchBar(1)">专辑
                    {{getAlbumList.length}}
                </div>
                <div class="bar" :class="{'active-bar':getBarStatus === 2}" @click="switchBar(2)">MV
                    {{getMVList.length}}
                </div>
                <div class="bar" :class="{'active-bar':getBarStatus === 3}" @click="switchBar(3)">歌手信息</div>
                <span style="clear: both"></span>
            </div>
            <ul class="list con" v-show="getBarStatus === 0">
                <li v-for="(item,index) in list" class="item" @click="playSong(item)" track-by="item.musicData.songid">
                    <div class="i-title">
                        <span class="sprites ic_menu" :class="{hide : !isCurrent(item.musicData.songid)}"></span>
                        <span :class="{hide : isCurrent(item.musicData.songid)}">{{index+1}}</span>
                    </div>
                    <div class="i-content">
                        <div class="songname">{{item.musicData.songname}}</div>
                        <div class="singername">{{item.musicData.singer[0].name}} - {{item.musicData.albumname}}</div>
                    </div>
                    <div class="more sprites ic_more" @click="toMore(item)"></div>
                    <div class="clear"></div>
                    <span class="split-line"></span>
                </li>
            </ul>
            <ul class="album-list con" v-show="getBarStatus === 1">
                <li v-for="(item,index) in getAlbumList" class="item" @click="toAlbum(item.albumMID)"
                    track-by="item.albumMID">
                    <div class="i-title">
                        <img class="pic" :src="getAlbumImg(item.albumMID)" alt="">
                    </div>
                    <div class="i-content">
                        <div class="songname">{{item.albumName}}</div>
                        <div class="singername">{{item.pubTime}}</div>
                    </div>
                    <div class="clear"></div>
                    <span class="split-line"></span>
                </li>
            </ul>
            <ul class="mv-list con" v-show="getBarStatus === 2">
                <li v-for="(item,index) in getMVList" class="item" @click="toMV(item.vid)" track-by="item.vid">
                    <div class="i-title">
                        <img class="pic" :src="item.pic" alt="">
                    </div>
                    <div class="i-content">
                        <div class="songname">{{item.title}}</div>
                        <div class="singername">{{item.date}}</div>
                    </div>
                    <div class="clear"></div>
                    <span class="split-line"></span>
                </li>
            </ul>
            <div class="detail" v-show="getBarStatus === 3">
                <div class="title">歌手简介</div>
                <div class="con">{{singerDetail}}</div>
            </div>
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
                albumList: [],
                mvList: [],
                _id: this.$route.query.id,
                info: '',
                barStatus: 0,
                detail: '',
                singerName: ''
            }
        },
        methods: {
            playSong (item) {
                let currItem = {
                    data: item.musicData
                }
                this.$store.dispatch('playSong', currItem)
            },
            toAlbum (id) {
                this.$router.push({
                    name: 'albumContent',
                    query: {id: id}
                })
            },
            toMV (id) {
                this.$router.push({
                    name: 'mvContent',
                    query: {id: id}
                })
            },
            isCurrent (id) {
                return id === this.$store.state.play.current.data.songid
            },
            toMore (item) {
                let currItem = {
                    data: item.musicData
                }
                this.$store.dispatch('switchInfo', {
                    current: currItem,
                    isMusicContent: false
                })
                event.stopPropagation()
            },
            switchBar (barStatus) {
                this.barStatus = barStatus
            },
            getAlbumImg (id) {
                return '//y.gtimg.cn/music/photo_new/T002R150x150M000' + id + '.jpg?max_age=2592000'
            },
            back () {
                window.history.back()
            }
        },
        computed: {
            list () {
                return this.infoList
            },
            getAlbumList () {
                return this.albumList
            },
            getMVList () {
                return this.mvList
            },
            getBanner () {
                return '//y.gtimg.cn/music/photo_new/T001R500x500M000' + this.$route.query.id + '.jpg?max_age=2592000'
            },
            getId () {
                return this.$route.query.id
            },
            getBarStatus () {
                return this.barStatus
            },
            singerDetail () {
                return this.detail
            },
            getSingerName () {
                return this.singerName
            }
        },
        beforeMount () {
            let _this = this
            API.singerDetail(this.$route.query.id, function (response) {
                _this.infoList = response.data.data.list
                _this.detail = response.data.data.SingerDesc
                _this.singerName = response.data.data.singer_name
                _this.$store.dispatch('updateTitle', _this.singerName)
            })
            API.albumListBySinger(this.$route.query.id, function (response) {
                _this.albumList = response.data.data.list
            })
            API.mvListBySinger(this.$route.query.id, function (response) {
                _this.mvList = response.data.data.list
            })
        },
        mounted () {
            if (window.location.hash.indexOf('musicContent') < 0) {
                this.$store.dispatch('switchMusicContent', false)
            }
            setTimeout(function () {
                document.body.scrollTop = 0
            }, 500)
        },
        watch: {
            getId (id) {
                let _this = this
                API.singerDetail(this.$route.query.id, function (response) {
                    _this.infoList = response.data.data.list
                    _this.detail = response.data.data.SingerDesc
                    _this.singerName = response.data.data.singer_name
                })
                API.albumListBySinger(this.$route.query.id, function (response) {
                    _this.albumList = response.data.data.list
                })
                API.mvListBySinger(this.$route.query.id, function (response) {
                    _this.mvList = response.data.data.list
                })
                console.log('singerContent-watch-id:' + id)
            }
        }
    }

</script>
