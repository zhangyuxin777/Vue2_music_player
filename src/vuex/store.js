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
        play: {
            list: [],
            current: null,
            status: {
                total: 10000,
                position: 1,
                playing: false,
                mode: 1,
                rotate: false
            }
        },
        rank: {
            topid: 26
        }
        ,
        search: {
            station: true,
            data: {
                startStation: '北京',
                endStation: '上海',
                startTime: '',
                train: ''
            }
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
    UPDATE_TOP_ID(state, id) {
        state.rank.topid = id;
    },
    SWITCH_SONG(state, obj) {
        state.play.status.playing = true;
        state.play.current = obj;
    },
    ADD_PLAY_LIST(state, obj) {
        state.play.list.push(obj);
    },
    UPDATE_PROGRESS(state, total, position) {
        state.play.status.total = total;
        state.play.status.position = position;
    },
    SWITCH_PLAYER_STATUS(state) {
        state.play.status.playing = !state.play.status.playing;
    },
    PLAYER_STATUS(state) {
        state.play.status.playing = true;
    },
    SWITCH_ROTATE(state, isRotate) {
        state.play.status.rotate = isRotate;
    },
    SWITCH_MODE(state) {
        if (state.play.status.mode == 0) {
            state.play.status.mode = 1;
        } else if (state.play.status.mode == 1) {
            state.play.status.mode = 2;
        } else {
            state.play.status.mode = 0;
        }
    },

    LAST_SONG(state) {
        var list = state.play.list;
        state.play.status.playing = true;
        if (state.play.status.mode == 0) {
        } else if (state.play.status.mode == 1) {
            for (var i = 0; i < list.length; i++) {
                if (state.play.current.songid == list[i].songid) {
                    if (i == 0) {
                        state.play.current = list[list.length - 1];
                    } else {
                        state.play.current = list[i + 1];
                    }
                    break;
                }
            }
        } else {
            state.play.current = list[Math.floor(Math.random() * list.length)];
        }
    },

    NEXT_SONG(state) {
        var list = state.play.list;
        state.play.status.playing = true;
        if (state.play.status.mode == 0) {
        } else if (state.play.status.mode == 1) {
            for (var i = 0; i < list.length; i++) {
                if (state.play.current.songid == list[i].songid) {
                    if (i == list.length - 1) {
                        state.play.current = list[0];
                    } else {
                        state.play.current = list[i + 1];
                    }
                    break;
                }
            }
        } else {
            state.play.current = list[Math.floor(Math.random() * list.length)];
        }
    }
};
export default new Vuex.Store({
    state,
    mutations
})


