<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="personal-con">
        <div class="banner">
            <div class="portrait-bg">
                <img id="portrait" v-bind:src=img class="portrait"/>
            </div>
            <div id="name" class="name"></div>
            <div class="line-box1">
                <div class="icon-left" v-link="'/search'">
                    <div class="sprites icon1"></div>
                    <span class="icon-text">个人资料</span>
                </div>
                <span class="split-line-v"></span>
                <div class="icon-right" v-link="'/today/list'">
                    <div class="sprites icon2"></div>
                    <span class="icon-text">我的钱包</span>
                </div>
            </div>
        </div>
        <span class="split-line"></span>
        <div class="place"></div>
        <div class="bg-white">
            <div class="bg-white line-box2">
                <div class="icon-left" v-link="'/owe/list'">
                    <div class="sprites icon3"></div>
                    <span class="icon-text">我的订单</span>
                </div>
                <span class="split-line-v"></span>
                <div class="icon-left" onclick="{window.location.href='team.html'}">
                    <div class="sprites icon4"></div>
                    <span class="icon-text">我的团队</span>
                </div>
                <span class="split-line-v"></span>
                <div class="icon-left" onclick="{window.location.href='erwei.html?openId='+openId}">
                    <div class="sprites icon5"></div>
                    <span class="icon-text">我的二维码</span>
                </div>
            </div>
            <span class="split-line"></span>
            <div class="bg-white line-box2">
                <div class="icon-left" onclick="{window.location.href='order.html'}">
                    <div class="sprites icon6"></div>
                    <span class="icon-text">积分规则</span>
                </div>
                <span class="split-line-v"></span>
                <div class="icon-left" onclick="{window.location.href='team.html'}">
                    <div class="sprites icon7"></div>
                    <span class="icon-text">中华网点查询</span>
                </div>
                <span class="split-line-v"></span>
                <div class="icon-left" id="test">
                    <div class="sprites icon8"></div>
                    <span class="icon-text">车险理赔查询</span>
                </div>
            </div>
        </div>
        <div class="info-div">
            <div class="info">{{info}}</div>
        </div>
    </div>
</template>
<script>

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
    @import 'css/personal.css';

</style>
