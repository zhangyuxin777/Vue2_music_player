<style scoped>
    @import "css/play.css";
</style>

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="play-bar">
        <div class="cycle">
            <img v-bind:src="current.albumpic_small" class="album">
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
                    <img class="icon" src="../image/play.png">
                    <img class="icon" src="../image/next.png">
                    <img class="icon" src="../image/music_menu.png">
                </div>
                <div style="clear: both"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {} from '../vuex/actions'
    import store from '../vuex/store.js'
    export default {
        vuex: {
            actions: {}
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
                return store.state.play.current
            },
            progress(){
                console.log((store.state.play.status.current / parseFloat(store.state.play.status.total)));
                return (store.state.play.status.current / parseFloat(store.state.play.status.total) * 100)
            }
        }
    }
</script>
