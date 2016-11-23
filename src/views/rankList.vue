<style scoped>
    @import "css/rankList.css";
</style>

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="rank-list">
        <div class="tab" rel="{{rank.topid}}">
            <div class="bar" style="width: 1.08rem" v-bind:class="{'active-bar':rank.topid==26}" @click="toSwitch(26)">
                热歌
            </div>
            <div class="bar" v-bind:class="{'active-bar':rank.topid==5}" @click="toSwitch(5)">内地</div>
            <div class="bar" v-bind:class="{'active-bar':rank.topid==6}" @click="toSwitch(6)">港台</div>
            <div class="bar" v-bind:class="{'active-bar':rank.topid==16}" @click="toSwitch(16)">韩国</div>
            <div class="bar" v-bind:class="{'active-bar':rank.topid==17}" @click="toSwitch(17)">日本</div>
            <div class="bar" style="width: 1.08rem" v-bind:class="{'active-bar':rank.topid==3}" @click="toSwitch(3)">
                欧美
            </div>
            <span style="clear: both"></span>
        </div>
        <div class="list">
            <item :data="data" v-for="data in list"></item>
        </div>
    </div>
</template>
<script>
    import item from '../components/rankItem.vue'
    import Common from '../js/rock';
    import store from '../vuex/store';
    import {updateTitle,
            toggleSpinner,
            updateTopId} from '../vuex/actions'
    var recordIndex = 0;
    var todayCount = 0;
    var todayMoney = 0;
    export default{
        data: function () {
            return {
                list: []
            }
        },
        vuex: {
            actions: {
                updateTitle,
                toggleSpinner,
                updateTopId
            }
        },
        components: {
            item
        },
        computed: {
            rank () {
                return store.state.rank
            }
        },
        methods: {
            load: function () {
                var _this = this;
                _this.toggleSpinner();
                Common.showApiData('https://route.showapi.com/213-4', {topid: 5}, function (data) {
                    console.log(data);
                    _this.list = data.showapi_res_body.pagebean.songlist;
                    _this.toggleSpinner();
                });
            },
            toSwitch: function (topid) {
                var _this = this;
                _this.toggleSpinner();
                Common.showApiData('https://route.showapi.com/213-4', {topid: topid}, function (data) {
                    _this.updateTopId(topid);
                    console.log(data);
                    _this.list = data.showapi_res_body.pagebean.songlist;
                    _this.toggleSpinner();
                });
            }
        },
        ready: function () {
            var _this = this;
            _this.updateTitle('排行榜', true, 'hide');
            _this.load();
        }
    }

</script>
