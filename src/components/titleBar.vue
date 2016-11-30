<style scoped>
    @import "css/titleBar.css";
</style>

<template>
    <div class="title-bar">
        <div class="btn-div-left left">
            <span id="backBtn" class="btn left mui-icon-undo" @click="back()"
                  :class="{'hide':!titleBar.isShowBack}"></span>
        </div>
        <span class="title" id="title" :class="{'hide': titleBar.icon=='sBar'}">{{titleBar.title}}</span>
        <form class="search" action="javascrpit:void(0)" @submit.prevent="actionClick"
              :class="{'hide': titleBar.icon!='sBar'}">
            <input type="search" placeholder="搜索" id="keyword"/>
        </form>
        <div class="btn-div-right right">
        <span id="actionBtn" class="btn right"
              :class="{'hide': titleBar.icon=='hide',
                'mui-icon-checkmarkempty': titleBar.icon=='complete',
                'mui-icon-search ' : titleBar.icon=='sBar',
                'mui-icon-compose': titleBar.icon=='change',
                'mui-icon-plusempty': titleBar.icon=='add',
                'mui-icon-search' : titleBar.icon=='search'}"
              @click="actionClick"></span>
        </div>
    </div>
    <div class="title-bar-position"></div>
</template>
<script>
    import store from '../vuex/store.js'
    import {updateKeyword} from '../vuex/actions'
    export default {
        computed: {
            titleBar () {
                return store.state.titleBar
            }
        },
        vuex: {
            actions: {
                updateKeyword
            }
        },
        methods: {
            back: function () {
                window.history.back(-1);
            },
            actionClick: function () {
                console.log('keyword');
                if (this.titleBar.icon == 'sBar')
                    this.updateKeyword(document.getElementById("keyword").value);
                this.$parent.action();
            }
        }
    }
</script>
