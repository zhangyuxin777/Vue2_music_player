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
    rank: {
        topid: 5
    },
    search: {
        station: true,
        data: {
            startStation: '北京',
            endStation: '上海',
            startTime: '',
            train: ''
        }
    }
};

const mutations = {
    UPDATE_TITLE (state, title, showBack, icon) {
        state.titleBar.title = title;
        state.titleBar.isShowBack = showBack;
        state.titleBar.icon = icon;
    },
    TOGGLE_SPINNER (state) {
        state.spinner = !state.spinner;
    },
    UPDATE_TOP_ID(state, id) {
        state.rank.topid = id;
    }
};
export default new Vuex.Store({
    state,
    mutations
})


