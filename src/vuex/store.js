import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
        titleBar: {
            title: '主页',
            isShowBack: false,
            icon: 'hide'
        },
        spinner: false,
        rest: {
            maxId: '',
            list: {},
            currentList: {},
            detail: null,
            create: true

        },
        today: {
            date: '',
            list: {},
            detail: {
                isOwe: false
            },
            count: 0,
            money: 0,
            delay: {}
        },
        owe: {
            list: {}
            ,
            current: {}
        }
    }
    ;

const mutations = {
    UPDATE_TITLE (state, title, showBack, icon) {
        state.titleBar.title = title;
        state.titleBar.isShowBack = showBack;
        state.titleBar.icon = icon;
    },
    TOGGLE_SPINNER (state) {
        state.spinner = !state.spinner;
    },
    UPDATE_REST_LIST (state, list, maxId) {
        state.rest.list = list;
        state.rest.currentList = list;
        state.rest.maxId = maxId;
    },
    UPDATE_CURRENT_REST_LIST (state, list) {
        state.rest.currentList = list;
    },
    SET_REST_DETAIL (state, obj) {
        state.rest.detail = obj;
    },
    CLEAR_REST_DETAIL (state) {
        state.rest.detail = null;
    },
    UPDATE_REST_CREATE (state, obj) {
        state.rest.create = obj;
    },
    UPDATE_OWE_LIST (state, list) {
        state.owe.list = list;
    },
    UPDATE_TODAY_LIST(state, list) {
        state.today.list = list;
    },
    UPDATE_TODAY_DATE(state, date) {
        state.today.date = date;
    },
    UPDATE_TODAY_COUNT(state, count, money) {
        state.today.count = count;
        state.today.money = money;
    },
    SET_TODAY_DETAIL (state, obj) {
        state.today.detail = obj;
    },
    SET_TODAY_OWE (state, isOwe, id) {
        state.today.detail.isOwe = isOwe;
        state.today.detail.oweId = id;
    },
    SET_TODAY_DELAY(state, obj){
        state.today.delay = obj;
    },
    UPDATE_TODAY_DATE(state, date){
        state.today.date = date;
    }
};
export default new Vuex.Store({
    state,
    mutations
})


