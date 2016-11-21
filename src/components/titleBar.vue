<style scoped>
    @import "css/titleBar.css";
</style>

<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="title-bar">
        <div class="btn-div-left left"
             v-bind:class="{'blue-line-right': !showBack}">
            <span id="backBtn" class="btn left mui-icon-undo" v-on:click="back()"
                  v-bind:class="{'hide':!showBack}"></span>
        </div>
        <span class="title" id="title">{{title}}</span>
        <div class="btn-div-right right" v-bind:class="{'blue-line-left': icon=='hide'}">
        <span id="actionBtn" class="btn right"
              v-bind:class="{'hide': icon=='hide',
                'mui-icon-checkmarkempty': icon=='complete',
                'mui-icon-compose': icon=='change',
                'mui-icon-plusempty': icon=='add' }"
              v-on:click="this.$parent.action()"></span>
        </div>
    </div>
    <div class="title-bar-position"></div>
</template>
<script>
    import store from '../vuex/store.js'
    export default {
        computed: {
            title () {
                return store.state.titleBar.title
            },
            showBack(){
                return store.state.titleBar.isShowBack
            },
            icon(){
                return store.state.titleBar.icon
            }
        },
        methods: {
            back: function () {
                window.history.back(-1);
            }
        }
    }
</script>
