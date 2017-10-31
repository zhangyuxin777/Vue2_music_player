<style scoped lang="scss" type="text/css">
    @import "css/albumList.scss";
</style>
<template>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
                leave-active-class="animated fadeOut" mode="out-in">
        <div class="album-list">
            <div class="title">全部专辑</div>
            <ul class="list con">
                <li v-for="(item,index) in list" class="item" @click="toContent(item.album_mid)">
                    <img :src="picUrl(item)"/>
                    <div class="info">
                        <div class="album-name">{{item.album_name}}</div>
                        <div class="singer">{{item.singer_name}}</div>
                    </div>
                </li>
            </ul>
            <div class="position"></div>
        </div>

    </transition>
</template>
<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    export default{
        data () {
            return {
                infoList: [],
                page: 0,
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
                return 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + item.album_mid + '.jpg?max_age=2592000'
            }
        },
        computed: {
            ...mapState({
                list: state => state.list.album
            })
        },
        mounted () {
        }
    }

</script>
