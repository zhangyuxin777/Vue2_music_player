<style scoped>
    @import "css/playBar.css";
</style>

<template>
    <div class="play-bar">
        <div class="cycle">
            <img :src="current.albumpic_small" :class="{'ani':rotate}" id="album">
        </div>
        <div class="panel">
            <div class="box">
                <div class="progress-bar">
                    <div class="progress" :style="{width:progress+'%'}"></div>
                    <div class="point" :style="{left:progress+'%'}"></div>
                </div>
                <div class="song">
                    <div class="song-name">{{current.songname}}</div>
                    <div class="singer-name">{{current.singername}}</div>
                </div>
                <div class="control">
                    <div class="sprites ic_play" @click="playClick" :class="{'hide':playing}"></div>
                    <div class="sprites ic_pause" @click="playClick" :class="{'hide':!playing}"></div>
                    <div class="sprites ic_next" @click="next"></div>
                    <div class="sprites ic_menu" @click="toPop"></div>
                </div>
                <div style="clear: both"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {switchPlayerStatus,
            nextSong,
            togglePopList} from '../vuex/actions'
    import store from '../vuex/store.js'
    export default {
        vuex: {
            actions: {
                switchPlayerStatus,
                nextSong,
                togglePopList
            }
        },
        computed: {
            current () {
                return store.state.play.current;
            },
            progress(){
                return (store.state.play.status.position / parseFloat(store.state.play.status.total) * 100)
            },
            playing(){
                if (document.getElementById('album')) {
                    document.getElementById('album').style.webkitAnimationPlayState = store.state.play.status.playing ? 'running' : "paused";
                    document.getElementById('album').style.animationPlayState = store.state.play.status.playing ? 'running' : "paused";
                }
                return store.state.play.status.playing;
            },
            rotate(){
                return store.state.play.status.rotate;
            }
        },
        methods: {
            playClick: function () {
                this.switchPlayerStatus();
            },
            next: function () {
                this.nextSong();
            },
            toPop: function () {
                this.togglePopList(true);
            }
        }
    }
</script>
