<style scoped>
    @import "css/app.css";
</style>
<template>
    <div>
        <title-bar></title-bar>
        <router-view></router-view>
        <spinner id='spinner' :style="{ display: spinner }"></spinner>
        <audio id="player" autoplay="autoplay" rel="{{playing}}" val="{{mode}}"
               :src="current.url"
               @timeupdate="updateProgress"
               @ended="complete"
               @play="playEvent"
               @pause="pauseEvent"
               @error="error"
               @stalled="stalled"></audio>
        <div class="play" :class="{'hide':!isShow}">
            <play-bar></play-bar>
        </div>
        <pop-list></pop-list>
    </div>
</template>

<script type="text/ecmascript-6">
    import titleBar from '../components/titleBar.vue'
    import spinner from '../components/spinner.vue'
    import playBar from '../components/playBar.vue'
    import popList from '../views/playList.vue'
    import Common from '../js/rock';
    import {updateTitle,
            progress,
            nextSong,
            switchRotate} from '../vuex/actions'
    import store from '../vuex/store';
    var player;
    var urlError = false;
    export default{
        store,
        vuex: {
            actions: {
                updateTitle,
                progress,
                nextSong,
                switchRotate
            }
        },
        components: {
            titleBar,
            spinner,
            playBar,
            popList
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
                if (!store.state.play.current.url) {
                    store.state.play.current.url = store.state.play.current.m4a;
                }
                console.log(store.state.play.current);
                return store.state.play.current;
            },
            playing(){
                if (player && player.currentSrc.length != 0) {
                    if (!urlError) {
                        if (store.state.play.status.playing) {
                            player.play();
                        } else {
                            player.pause();
                        }
                    }

                }
                return store.state.play.status.playing;
            },
            isShow(){
                return store.state.play.isShow;
            }
        },
        methods: {
            updateProgress: function () {
                this.progress(player.duration, player.currentTime);
            },
            complete: function () {
                console.log('complete');
                this.nextSong();
                this.switchRotate(false);
            },
            playEvent: function () {
                urlError = false;
                this.switchRotate(true);
            },
            pauseEvent: function () {
                urlError = false;
            },
            stalled: function () {
                console.log('stalled');
            },
            error: function () {
                urlError = true;
                console.log('error');
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

    .play {
        position: fixed;
        bottom: 0;
    }
</style>