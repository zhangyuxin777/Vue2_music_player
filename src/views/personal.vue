<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="personal-con">
        <div class="banner">
            <div class="portrait-bg">
                <img id="portrait" v-bind:src=img class="portrait"/>
            </div>
            <div id="name" class="name"></div>
            <div class="line-box1">
                <div class="icon-left" v-link="'/music'">
                    <div class="sprites icon1"></div>
                    <span class="icon-text"></span>
                </div>
                <span class="split-line-v"></span>
                <div class="icon-right" v-link="'/music/rankList'">
                    <div class="sprites icon2"></div>
                    <span class="icon-text">排行榜</span>
                </div>
            </div>
        </div>
        一个暂用的界面
    </div>

</template>
<script>
    import mui from '../js/mui.min'
    var Common = require('../js/rock');
    export default{
        data () {
            return {
                name: "",
                img: '',
                info: ''
            }
        },
        methods: {
            action: function () {
                alert('111');
            },
            hideSheet(){
                mui('#sheet1').popover('toggle');
            }
        },
        ready: function () {
            var _this = this;
            Common.appView.action = function () {
                alert('1111');
            };
//            mui.toast('asdsadas');
//            mui('#sheet1').popover('toggle');
        }
    }


</script>
<style scoped>
    @import 'css/personal.css';
</style>
