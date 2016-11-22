<style scoped>
    @import "css/search.css";
</style>
<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="search-train">
        <div class="tab">
            <div class="left-bar" v-bind:class="{'active-bar':search.station}">站 站</div>
            <div class="right-bar" v-bind:class="{'active-bar':!search.station}">车 次</div>
            <span style="clear: both"></span>
        </div>
        <div class="train" v-bind:class="{'hide':!search.station}">
            <div class="line">
                <div class="line-title">车次</div>
            </div>
            <span class="split-line"></span>
            <div class="line">
                <div class="line-title">出发日期</div>
            </div>
            <span class="split-line"></span>
            <div class="button">查询</div>
        </div>
        <div class="station" v-bind:class="{'hide':search.station}">
            <div class="title">
                <span class="left">出发地</span>
                <span class="right">到达地</span>
            </div>
            <div class="address">
                <span class="left">{{search.data.startStation}}</span>
                <span class="right">{{search.data.endStation}}</span>
            </div>
            <span class="split-line"></span>
            <div class="line">
                <div class="line-title">出发日期</div>
            </div>
            <span class="split-line"></span>
            <div class="button">查询</div>
        </div>
    </div>
</template>
<script>
    import Common from '../js/rock';
    import $ from 'jquery';
    import {updateTitle} from '../vuex/actions'
    import store from '../vuex/store';
    export default{
        vuex: {
            actions: {
                updateTitle
            }
        },
        computed: {
            search () {
                return store.state.search
            }
        },
        methods: {
            checkOwe: function () {
                store.state.today.detail.isOwe = !store.state.today.detail.isOwe;
            }
        },
        ready: function () {
            var _this = this;
            _this.updateTitle('车票查询', true, 'hide');
        }
    }


</script>
