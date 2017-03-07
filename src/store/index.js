import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)
const state = {
  titleBar: {
    title: '主页',
    isShowBack: false,
    icon: 'hide'
  },
  spinner: false,
  play: {
    list: [],
    current: {
      data: {
        singer: [{
          name: ''
        }],
        songname: ''
      }
    },
    status: {
      total: 10000,
      position: 1,
      playing: false,
      mode: 1,
      rotate: false
    },
    isShow: true,
    popList: {
      pop: false
    }
  },
  rank: {
    topid: ''
  },
  search: {
    keyword: ''
  },
  count: 0
}

const mutations = {
  PLAY_SONG (state, song) {
    let isExist = false
    for (let item of state.play.list) {
      if (item === song) {
        isExist = true
        break
      }
    }
    if (!isExist) {
      state.play.list.push(song)
      state.play.current = song
      state.play.status.playing = true
    } else if (state.play.current !== song) {
      state.play.current = song
      state.play.status.playing = true
    }
  },
  NEXT_SONG (state) {
    let list = state.play.list
    if (list.length === 0) {
      return
    }
    if (list.length === 1) {
      return
    }
    state.play.status.rotate = false
    state.play.status.playing = true
    if (state.play.status.mode === 0) {

    } else if (state.play.status.mode === 1) {
      let done = false
      list.forEach(function (item, index, list) {
        if (!done && state.play.current.data.songid === item.data.songid) {
          if (index === list.length - 1) {
            state.play.current = list[0]
            done = true
          } else {
            state.play.current = list[index + 1]
            done = true
          }
        }
      })
    } else {
      state.play.current = list[Math.floor(Math.random() * list.length)]
    }
  },
  UPDATE_TITLE (state, title, showBack, icon) {
    state.titleBar.title = title
    state.titleBar.isShowBack = showBack
    state.titleBar.icon = icon
  },
  TOGGLE_SPINNER (state) {
    state.spinner = !state.spinner
  },
  UPDATE_TOP_ID (state, id) {
    state.rank.topid = id
  },
  SWITCH_SONG (state, obj) {
    state.play.status.playing = true
    state.play.current = obj
  },
  ADD_PLAY_LIST (state, obj) {
    state.play.list.unshift(obj)
  },
  UPDATE_PROGRESS (state, obj) {
    state.play.status.total = obj.total
    state.play.status.position = obj.position
  },
  SWITCH_PLAYER_STATUS (state) {
    state.play.status.playing = !state.play.status.playing
  },
  PLAYER_STATUS (state) {
    state.play.status.playing = true
  },
  SWITCH_ROTATE (state, isRotate) {
    state.play.status.rotate = isRotate
  },
  SWITCH_MODE (state) {
    if (state.play.status.mode === 0) {
      state.play.status.mode = 1
    } else if (state.play.status.mode === 1) {
      state.play.status.mode = 2
    } else {
      state.play.status.mode = 0
    }
  },
  UPDATE_KEYWORD (state, keyword) {
    state.search.keyword = keyword
  },
  UPDATE_POP_LIST (state, pop) {
    state.play.popList.pop = pop
  },
  CLEAN_PLAY_LIST (state) {
    state.play.list = []
    state.play.status.playing = false
    state.play.status.position = 1
    state.play.status.rotate = false
    state.play.status.total = 10000
    state.play.current = {
      albumpic_small: '',
      songname: '',
      singername: '',
      songid: '',
      url: 'clean'
    }
  },
  INCREMENT (state) {
    state.count++
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
