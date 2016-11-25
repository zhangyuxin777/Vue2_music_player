<template>
    <div>
        <title-bar></title-bar>
        <router-view></router-view>
        <spinner id='spinner' :style="{ display: spinner }"></spinner>
        <audio id="player" autoplay="autoplay" rel="{{playing}}" val="{{mode}}"
               v-bind:src="current.url"
               v-on:timeupdate="updateProgress"
               v-on:ended="complete"
               v-on:play="playEvent"
               v-on:pause="pauseEvent"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import titleBar from '../components/titleBar.vue'
    import spinner from '../components/spinner.vue'
    import Common from '../js/rock';
    import {updateTitle,progress,nextSong} from '../vuex/actions'
    import store from '../vuex/store';
    var player;
    export default{
        store,
        vuex: {
            actions: {
                updateTitle,
                progress
            }
        },
        components: {
            titleBar,
            spinner
        },
        computed: {
            spinner () {
                if (store.state.spinner) {
                    return 'block'
                } else {
                    return 'none'
                }
            },
            mode(){
                if (player && player.currentSrc.length != 0) {
                    if (store.state.play.status.mode == 0) {
                        player.loop = true;
                    } else {
                        player.loop = false;
                    }
                }
                return store.state.play.status.mode;
            },
            current(){
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
            playing(){
                if (player && player.currentSrc.length != 0) {
                    if (store.state.play.status.playing) {
                        player.play();
                    } else {
                        player.pause();
                    }
                }
                return store.state.play.status.playing;
            }
        },
        methods: {
            updateProgress: function () {
                this.progress(player.duration, player.currentTime);
            },
            complete: function () {
                console.log('complete');
                this.nextSong();
            },
            playEvent: function () {
                console.log('playEvent');
            },
            pauseEvent: function () {
                console.log('pauseEvent');
            }
        },
        ready: function () {
            player = document.getElementById('player');
            Common.init(this);
            this.updateTitle('主页面', false, 'hide');
        }
    }
</script>

<style>
    .hide {
        display: none;
    }
</style>