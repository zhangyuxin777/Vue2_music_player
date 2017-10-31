<style scoped lang="scss" type="text/css">
    @import "css/albumContent.scss";
</style>
<template>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInRight"
                leave-active-class="animated fadeOut" mode="out-in">
        <div class="rank-content album-content">
            <div class="header">
                <div class="back" @click="back">
                    <div class="sprites ic_back"></div>
                </div>
                <div class="title">
                    <div class="singername">歌单</div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="banner">
                <img :src="getBanner" id="banImg" class="singer-img blur" v-if="getBanner">
                <div class="float-div"></div>
                <div class="info">
                    <img :src="getBanner" class="album-pic" alt="">
                    <img src="http://on7hxaasw.bkt.clouddn.com/album_cover.png" class="album-back" alt="">
                    <div class="detail">
                        <div class="album-name">{{getDissName}}</div>
                        <div class="singer"><span class="sprites ic_poster"></span> {{getPosterName}}</div>
                        <div class="date"><span class="sprites ic_music_count"></span> {{list.length}}</div>
                    </div>
                </div>
            </div>
            <ul class="list">
                <li v-for="(item,index) in list" class="item" @click="playSong(item)" track-by="item.songid">
                    <div class="i-title">
                        <span class="sprites ic_menu" :class="{hide : !isCurrent(item.songid)}"></span>
                        <span :class="{hide : isCurrent(item.songid)}">{{index+1}}</span>
                    </div>
                    <div class="i-content">
                        <div class="songname">{{item.songname}}</div>
                        <div class="singername">{{item.singer[0].name}} - {{item.albumname}}</div>
                    </div>
                    <div class="more sprites ic_more" @click="toMore(item)"></div>
                    <div class="clear"></div>
                    <span class="split-line"></span>
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
                _id: this.$route.query.id,
                info: '',
                nickName: '',
                dissName: '',
                pic: ''
            }
        },
        methods: {
            playSong (item) {
                let currItem = {
                    data: item
                }
                this.$store.dispatch('playSong', currItem)
            },
            isCurrent (id) {
                return id === this.$store.state.play.current.data.songid
            },
            toMore (item) {
                let currItem = {
                    data: item
                }
                this.$store.dispatch('switchInfo', {
                    current: currItem,
                    isMusicContent: false
                })
                event.stopPropagation()
            },
            back () {
                window.history.back()
            }
        },
        computed: {
            list () {
                return this.infoList
            },
            getId () {
                return this.$route.query.id
            },
            getBanner () {
                return this.pic
            },
            getDissName () {
                return this.dissName
            },
            getPosterName () {
                return this.nickName
            },
            getDate () {
                return this.date
            }
        },
        beforeMount () {
            let _this = this
            _this.$store.dispatch('updateTitle', '歌单')
            API.dissDetail(this.$route.query.id, function (response) {
                _this.infoList = response.data.cdlist[0].songlist
                _this.dissName = response.data.cdlist[0].dissname
                _this.nickName = response.data.cdlist[0].nickname
                _this.pic = response.data.cdlist[0].logo
            })
            document.body.scrollTop = 0
        },
        mounted () {
            if (window.location.hash.indexOf('musicContent') < 0) {
                this.$store.dispatch('switchMusicContent', false)
            }
        },
        watch: {
            getId (id) {
                let _this = this
                API.dissDetail(this.$route.query.id, function (response) {
                    _this.infoList = response.data.cdlist[0].songlist
                    _this.dissName = response.data.cdlist[0].dissname
                    _this.nickName = response.data.cdlist[0].nickname
                    _this.pic = response.data.cdlist[0].logo
                })
                console.log('dissContent-watch-id:' + id)
            }
        }
    }

</script>
