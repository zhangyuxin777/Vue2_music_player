<template>
    <div>
        <title-bar></title-bar>
        <router-view></router-view>
        <spinner id='spinner' :style="{ display: spinner }"></spinner>
        <audio id="player" autoplay="autoplay" v-bind:src="current.url" v-on:timeupdate="updateProgress"
               v-on:ended="complete"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import titleBar from '../components/titleBar.vue'
    import spinner from '../components/spinner.vue'
    import Common from '../js/rock';
    import {updateTitle,progress} from '../vuex/actions'
    import store from '../vuex/store';

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
            status(){
                return store.state.play.status;
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
            }
        },
        methods: {
            updateProgress: function () {
                this.progress(document.getElementById('player').duration, document.getElementById('player').currentTime);
                console.log('updateProgress');
            },
            complete: function () {
                console.log('complete');
            }
        },
        ready: function () {
            Common.init(this);
            this.updateTitle('主页面', false, 'hide');
        }
    }


</script>
