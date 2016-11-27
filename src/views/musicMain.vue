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
                <div class="ic_like icon "></div>
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

    <div class="play">
        <play></play>
    </div>

</template>
<script>
    import mui from '../js/mui.min'
    var Common = require('../js/rock');
    import play from '../components/play.vue'
    export default{
        data () {
            return {
                name: "",
                img: '',
                info: ''
            }
        },
        components: {
            play
        },
        methods: {
            action: function () {
                alert('111');
            }
        },
        ready: function () {
            var _this = this;
            Common.appView.action = function () {
                alert('1111');
            };
        }
    }


</script>
<style scoped>
    @import 'css/musicMain.css';
</style>
