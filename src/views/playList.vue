<style scoped>
    @import "css/playList.css";
</style>

<template>
    <div class="box-bg" :class="{'bg-pop':pop}" @click="toDown"></div>
    <div class="play-pop-box" :class="{'play-pop':pop}">
        <div class="title-box">
            <div class="cleanList left opacity0">清空</div>
            <div class="title">播放列表 <span class="count">({{list.length}}首)</span></div>
            <div class="cleanList right" @click="clean">清空</div>
        </div>
        <span class="split-line"></span>
        <ul class="list">
            <item :data="data" v-for="data in list"></item>
        </ul>
    </div>
</template>
<script>
    import item from '../components/playItem.vue'
    import Common from '../js/rock';
    import store from '../vuex/store';
    import {togglePopList,
            cleanPlayList} from '../vuex/actions'
    export default{
        vuex: {
            actions: {
                togglePopList,
                cleanPlayList
            }
        },
        components: {
            item
        },
        computed: {
            list () {
                return store.state.play.list;
            },
            pop(){
                return store.state.play.popList.pop;
            }
        },
        methods: {
            clean: function () {
                var _this = this;
                if (_this.list.length > 0) {
                    mui.confirm('确定清空播放列表?', '提示', ['确定', '取消'], function (e) {
                        if (e.index == 0) {
                            _this.cleanPlayList();
                            console.log('clean');
                        }
                    });
                }
            },
            toDown: function () {
                this.togglePopList(false);
            }
        },
        ready: function () {
        }
    }

</script>
