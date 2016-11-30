<style scoped>
    @import "css/playItem.css";
</style>

<template>
    <li class="playing-item" @click="clickItem">
        <div class="playing-song" :class="{'hide':current.songid!=data.songid}">
            <div class="sprites ic_menu"></div>
        </div>
        <div class="song-name" :class="{'red':current.songid==data.songid,'playing-name':current.songid==data.songid}">
            {{data.songname}}
        </div>
        <div class="singer-name" :class="{'red':current.songid==data.songid}">&nbsp;{{data.singername}}</div>
        <div class="icon-box" @click="removeItem">
            <span class="icon mui-icon-closeempty"></span>
        </div>
    </li>
</template>
<script>
    import {switchSong,
            addPlayList,
            playerStatus,
            removeFromPlayList} from '../vuex/actions'
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
                addPlayList,
                playerStatus,
                removeFromPlayList
            }
        },
        computed: {
            current () {
                return store.state.play.current;
            }
        },
        methods: {
            clickItem: function () {
                var _this = this;
                _this.switchSong(_this.data, store.state.play.list, store.state.play.current);
//                _this.playerStatus();
            },
            removeItem: function () {
                event.stopPropagation();//阻止点击事件向上冒泡
                this.removeFromPlayList(this.data);
            }
        }
    }
</script>
