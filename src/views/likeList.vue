<style scoped>
    @import "css/list.css";
</style>

<template>
    <div class="list-box">
        <div class="list">
            <item :data="data" v-for="data in list"></item>
        </div>
    </div>
    <div class="play">
        <play></play>
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
