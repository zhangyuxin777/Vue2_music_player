<style scoped>
    @import "css/oweItem.css";
</style>

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="owe-item">
        <div class="line1">
            <div style="width: 39%;height: 100%" class="left"><span class="name">{{data.attributes.Rest_Name}}</span>
            </div>
            <div class="cycle left"></div>
            <div class="push-div right">
                <div class="push-btn" rel="{{data.attributes.Rest_ID}}" @click="toRemove"
                     :class="{'hide': data.attributes.Rest_Count}">消 除
                </div>
            </div>
        </div>
        <div class="line3">
            <span class="split-line"></span>
            <div class="left div_1_3"><span class="left">拖欠信息:</span></div>
            <div class="left div_1_3 text-center">
                <span>￥{{data.attributes.Owe_Money}} / {{data.attributes.Owe_Count}}</span>
            </div>
            <div class="right" style="width: 32%;text-align: right"><span>{{data.attributes.Work_Date}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {deleteOwe} from '../vuex/actions'
    import Common from '../js/rock';
    import store from '../vuex/store';
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        vuex: {
            actions: {
                deleteOwe
            }
        },
        methods: {
            toRemove: function () {
                var _this = this;
                Common.mui.confirm('确认消除 ' + _this.data.attributes.Rest_Name + '的拖欠记录?', '拖欠消除', ['取消', '确认'], function (e) {
                    if (e.index == 0) {
                        console.log('cancel');
                    } else {
                        _this.deleteOwe(_this.data.id, store.state.rest.list, store.state.today.date);
                    }
                });
            }
        }
    }

</script>
