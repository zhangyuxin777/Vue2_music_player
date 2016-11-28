<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="mm-bg">
        <div class="search">
            <form onsubmit="{alert('sdsd')}">
                <input class="search-music" type="search" placeholder="搜索">
            </form>

        </div>
        <div class="list-1 rank" v-link="'/music/rankList'">

        </div>
        <div class="list-2">
            <div class="like">
                <div class="info">
                    <div class="title">最喜欢</div>
                    <div class="number">0 首</div>
                </div>
                <div class="ic_like icon"></div>
            </div>
            <div class="download">
                <div class="info">
                    <div class="title">已下载</div>
                    <div class="number">0 首</div>
                </div>
                <div class="ic_down icon "></div>
            </div>
        </div>
        <div class="clear"></div>
        <div class="list-1 playlist"></div>
    </div>
</template>
<script>
    import mui from '../js/mui.min'
    var Common = require('../js/rock');
    import play from '../components/play.vue'
    import {updateTitle,
            toggleSpinner} from '../vuex/actions'
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
                toggleSpinner
            }
        },
        components: {
            play
        },
        methods: {},
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
