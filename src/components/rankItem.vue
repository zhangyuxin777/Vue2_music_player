<style scoped>
    @import "css/rankItem.css";
</style>

<template>
    <div class='rank-item' @click="clickItem()">
        <div class='line1'>
            <div id='songname' class='songname left'>{{data.songname}}</div>
            <div id='singername' class='singername right'>{{data.singername}}</div>
        </div>
        <div class='line2'>
            <img src="../image/more.png" class="more">
        </div>
    </div>
</template>
<script>
    import {switchSong,addPlayList} from '../vuex/actions'
    import store from '../vuex/store.js'
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        vuex: {
            actions: {
                switchSong,
                addPlayList
            }
        },
        methods: {
            clickItem: function () {
                var _this = this;
                console.log(store.state.play);
                _this.switchSong(_this.data, store.state.play.list);
            },
            showMore: function (event) {
                event.stopPropagation();//阻止点击事件向上冒泡

            }
        }
    }
</script>
