<style scoped>
    @import "css/play.css";
</style>

<template>
    <div class="play-bar">
        <div class="cycle">
            <img v-bind:src="current.albumpic_small" v-bind:class="{'ani':rotate}" id="album">
        </div>
        <div class="panel">
            <div class="box">
                <div class="progress-bar">
                    <div class="progress" v-bind:style="{width:progress+'%'}"></div>
                    <div class="point" v-bind:style="{left:progress+'%'}"></div>
                </div>
                <div class="song">
                    <div class="song-name">{{current.songname}}</div>
                    <div class="singer-name">{{current.singername}}</div>
                </div>
                <div class="control">
                    <img class="icon" src="../image/play.png" @click="playClick()" v-bind:class="{'hide':playing}">
                    <img class="icon" src="../image/pause.png" @click="playClick()" v-bind:class="{'hide':!playing}">
                    <img class="icon" src="../image/next.png" @click="next()">
                    <img class="icon" src="../image/music_menu.png">
                </div>
                <div style="clear: both"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {switchPlayerStatus,
            nextSong} from '../vuex/actions'
    import store from '../vuex/store.js'
    export default {
        vuex: {
            actions: {
                switchPlayerStatus,
                nextSong
            }
        },
        computed: {
            current () {
                console.log(store.state.play.current);
                if (store.state.play.current == null) {
                    store.state.play.current = {
                        albumpic_small: '',
                        songname: '',
                        singername: '',
                        url: ''
                    }
                }
                return store.state.play.current;
            },
            progress(){
                return (store.state.play.status.position / parseFloat(store.state.play.status.total) * 100)
            },
            playing(){
                if (document.getElementById('album')) {
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
            }
        }
    }
</script>
