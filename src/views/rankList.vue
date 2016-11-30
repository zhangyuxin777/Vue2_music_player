<style scoped>
    @import "css/list.css";
</style>

<template>
    <div class="list-box">
        <div class="tab">
            <div class="bar" style="width: 1.08rem" :class="{'active-bar':rank.topid==26}" @click="load(26)">
                热歌
            </div>
            <div class="bar" :class="{'active-bar':rank.topid==5}" @click="load(5)">内地</div>
            <div class="bar" :class="{'active-bar':rank.topid==6}" @click="load(6)">港台</div>
            <div class="bar" :class="{'active-bar':rank.topid==16}" @click="load(16)">韩国</div>
            <div class="bar" :class="{'active-bar':rank.topid==17}" @click="load(17)">日本</div>
            <div class="bar" style="width: 1.08rem" :class="{'active-bar':rank.topid==3}" @click="load(3)">
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
    import play from '../components/playBar.vue'
    import Common from '../js/rock';
    import store from '../vuex/store';
    import {updateTitle,
            toggleSpinner,
            updateTopId} from '../vuex/actions'
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
            item,
            play
        },
        computed: {
            rank () {
                return store.state.rank
            }
        },
        methods: {
            load: function (topid) {
                var _this = this;
                _this.toggleSpinner();
                Common.showApiData('https://route.showapi.com/213-4', {topid: topid}, function (data) {
                    _this.updateTopId(topid);
                    console.log(data);
                    _this.list = data.showapi_res_body.pagebean.songlist.slice(0, 50);
                    _this.toggleSpinner();
                });
            }
        },
        ready: function () {
            var _this = this;
            _this.updateTitle('排行榜', true, 'hide');
            _this.load(store.state.rank.topid);
        }
    }

</script>
