<style scoped>
    @import "css/list.css";
</style>

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="list-box" rel="{{keyWord}}">
        <div class="list mar-t0">
            <item :data="data" v-for="data in list"></item>
        </div>
    </div>
</template>
<script>
    import item from '../components/rankItem.vue'
    import play from '../components/play.vue'
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
            keyWord () {
                return store.state.search.keyword;
            }
        },
        methods: {
            searchSong: function () {
                var _this = this;
                if (store.state.search.keyword && store.state.search.keyword.length != 0) {
                    _this.toggleSpinner();
                    Common.showApiData('https://route.showapi.com/213-1', {
                        keyword: store.state.search.keyword,
                        page: 1
                    }, function (data) {
                        console.log(data);
                        _this.list = data.showapi_res_body.pagebean.contentlist.slice(0, 50);
                        _this.toggleSpinner();
                    });
                }
            }
        },
        ready: function () {
            var _this = this;
            _this.updateTitle('搜索', true, 'sBar');
            Common.appView.action = function () {
                _this.searchSong();
            }
        }
    }

</script>
