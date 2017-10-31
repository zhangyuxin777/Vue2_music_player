<style scoped lang="scss" type="text/css">
    @import "css/searchList.scss";
</style>
<template>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInRight"
                leave-active-class="animated fadeOut" mode="out-in">
        <div class="search-list">
            <div class="header title-bar">
                <div class="back" @click="back">
                    <div class="sprites ic_back"></div>
                </div>
                <form action="javascrpit:void(0)" @submit.prevent="search" class="search-form">
                    <input class="search-input" v-model="keyword" type="text" placeholder="搜索音乐/歌手" autocomplete="off">
                    <span class="sprites ic_close" @click="toClean"></span>
                    <span class="split-line"></span>
                </form>
            </div>
            <ul class="list con">
                <div class="zhida" @click="toSinger" :class="{'hide':zhida.mid.length===0}">
                    <img class="pic" :src="zhida.pic" alt="">
                    <span class="singer">歌手: <span class="name">{{zhida.singerName}}</span></span>
                </div>
                <li v-for="(item,index) in list" class="item" @click="playSong(item)" track-by="item.songid">
                    <div class="i-content">
                        <div class="songname">{{item.songname}}</div>
                        <div class="singername">{{item.singer[0].name}} - {{item.albumname}}</div>
                    </div>
                    <div class="more sprites ic_more" @click="toMore(item)"></div>
                    <div class="clear"></div>
                    <span class="split-line"></span>
                </li>
            </ul>
            <div style="clear: both"></div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import API from '../js/api'
    import {mapState} from 'vuex'
    import Common from '../js/rock'
    export default{
        data () {
            return {
                isLoading: false,
                keyword: '',
                isCleaning: false
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
                this.$store.dispatch('switchMusicContent', false)
            },
            search () {
                let _this = this
                if (_this.keyword.length === 0) {
                    return
                }
                this.$store.dispatch('updateKeyword', _this.keyword)
                this.$store.dispatch('updateSearchPage', 1)
                API.search(_this.keyword, _this.$store.state.search.page, function (response) {
                    _this.$store.dispatch('setSearchList', response.data.data)
                    _this.$store.dispatch('updateSearchPage', _this.$store.state.search.page + 1)
                })
            },
            toSinger () {
                if (this.zhida.mid.length === 0) {
                    return
                }
                this.$router.push({
                    name: 'singerContent',
                    query: {id: this.$store.state.search.zhida.mid}
                })
            },
            loadMore () {
                let _this = this
                console.log('loading search page:' + _this.$store.state.search.page)
                API.search(_this.$store.state.search.keyword, _this.$store.state.search.page, function (response) {
                    _this.$store.dispatch('addSearchList', response.data.data)
                    _this.$store.dispatch('updateSearchPage', _this.$store.state.search.page + 1)
                    _this.isLoading = false
                })
            },
            toClean () {
                let _this = this
                _this.keyword = ''
                _this.$store.dispatch('cleanSearch')
                _this.isCleaning = true
                setTimeout(function () {
                    _this.isCleaning = false
                }, 1000)
            }
        },
        computed: {
            ...mapState({
                keyword: state => state.search.keyword,
                page: state => state.search.page,
                list: state => state.search.list,
                zhida: state => state.search.zhida
            })
        },
        beforeMount () {
            document.body.scrollTop = 0
        },
        mounted () {
            this.keyword = this.$store.state.search.keyword
            this.$store.dispatch('updateTitle', '搜索')
            if (window.location.hash.indexOf('musicContent') < 0) {
                this.$store.dispatch('switchMusicContent', false)
            }
            let _this = this
            window.onscroll = function () {
                if (!_this.isLoading && !_this.isCleaning) {
                    if (Common.scroll.getScrollTop() + Common.scroll.getClientHeight() >= Common.scroll.getScrollHeight() - 10) {
                        _this.isLoading = true
                        _this.loadMore()
                    }
                }
            }
        }
    }

</script>
