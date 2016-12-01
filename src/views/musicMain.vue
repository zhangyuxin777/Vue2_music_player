<template>
    <div class="mm-bg">
        <div class="search">
            <form onsubmit="{alert('sdsd')}">
                <input class="search-music" type="search" placeholder="搜索">
            </form>

        </div>
        <div class="list-1" v-link="'/music/rankList'">
            <div class="rank">
                <div class="info">
                    <div class="title">排行榜</div>
                </div>
                <div class="sprites ic_rank"></div>
            </div>
        </div>
        <div class="list-2">
            <div class="like" v-link="'/music/likeList'">
                <div class="info">
                    <div class="title">最喜欢</div>
                    <div class="number">0 首</div>
                </div>
                <div class="sprites ic_like"></div>
            </div>
            <div class="download" v-link="'/music/downList'">
                <div class="info">
                    <div class="title">已下载</div>
                    <div class="number">0 首</div>
                </div>
                <div class="sprites ic_down "></div>
            </div>
        </div>
        <div class="clear"></div>
        <div class="list-1" @click="toPop">
            <div class="playlist">
                <div class="info">
                    <div class="title">播放列表</div>
                </div>
                <div class="sprites ic_play"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import mui from '../js/mui.min'
    var Common = require('../js/rock');
    import play from '../components/playBar.vue'
    import {updateTitle,
            toggleSpinner,
            togglePopList} from '../vuex/actions'
    import store from '../vuex/store';
    export default{
        data () {
            return {
                name: "",
                img: '',
                info: ''
            }
        },
        vuex: {
            actions: {
                updateTitle,
                toggleSpinner,
                togglePopList
            }
        },
        components: {
            play
        },
        methods: {
            toPop: function () {
                this.togglePopList(true);
            }
        },
        ready: function () {
            var _this = this;
            _this.updateTitle('主页', false, 'search');
            Common.appView.action = function () {
                _this.$route.router.go({path: '/music/searchList'})
            }
        }
    }


</script>
<style scoped>
    @import 'css/musicMain.css';
</style>
