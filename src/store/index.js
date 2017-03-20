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
        singer: [{name: ''}],
        songname: ''
      }
    },
    status: {
      total: 10000,
      position: 1,
      playing: false,
      mode: 1,
      rotate: false,
      showLyric: false
    },
    isShow: true,
    showMusicContent: false,
    popList: {
      pop: false
    }
  },
  like: {
    list: []
  },
  search: {
    keyword: ''
  },
  count: 0
}

const mutations = {
  PLAY_SONG (state, song) {
    let isExist = state.play.list.indexOf(song) >= 0
    if (!isExist) {
      state.play.status.rotate = false
      state.play.list.push(song)
      state.play.current = song
      state.play.status.playing = true
    } else if (state.play.current !== song) {
      state.play.status.rotate = false
      state.play.current = song
      state.play.status.playing = true
    }
  },
  SWITCH_MUSIC_CONTENT  (state, showContent) {
    state.play.showMusicContent = showContent
  },
  NEXT_SONG (state) {
    let list = state.play.list
    if (list.length === 0 || list.length === 1 || state.play.status.mode === 0) {
      return
    }
    state.play.status.rotate = false
    state.play.status.playing = true
    if (state.play.status.mode === 1) {
      let index = list.indexOf(state.play.current)
      state.play.current = list[(index === list.length - 1 ? 0 : index + 1)]
    } else {
      state.play.current = list[Math.floor(Math.random() * list.length)]
    }
  },
  LAST_SONG (state) {
    let list = state.play.list
    if (list.length === 0 || list.length === 1 || state.play.status.mode === 0) {
      return
    }
    state.play.status.rotate = false
    state.play.status.playing = true
    if (state.play.status.mode === 1) {
      let index = list.indexOf(state.play.current)
      state.play.current = list[(index === 0 ? list.length - 1 : index - 1)]
    } else {
      state.play.current = list[Math.floor(Math.random() * list.length)]
    }
  },
  SWITCH_LIKE (state, song) {
    let index = state.like.list.indexOf(song)
    if (index >= 0) {
      state.like.list.splice(index, 1)
    } else {
      state.like.list.push(song)
    }
  },
  REMOVE_FROM_PLAY_LIST (state, song) {
    let list = state.play.list
    let index = list.indexOf(song)
    if (list.length === 1) {
      state.play.status.playing = false
      state.play.status.position = 1
      state.play.status.rotate = false
      state.play.status.total = 10000
      state.play.current = {
        data: {
          singer: [{name: ''}],
          songname: ''
        }
      }
    } else if (song.data.songid === state.play.current.data.songid) {
      state.play.current = list[(index === list.length - 1 ? 0 : index + 1)]
    }
    list.splice(index, 1)
  },
  CLEAN_PLAY_LIST (state) {
    state.play.list = []
    state.play.status.playing = false
    state.play.status.position = 1
    state.play.status.rotate = false
    state.play.status.total = 10000
    state.play.popList.pop = false
    state.play.current = {
      data: {
        singer: [{name: ''}],
        songname: ''
      }
    }
  },
  UPDATE_POP_LIST (state, pop) {
    state.play.popList.pop = pop
  },
  SWITCH_LYRIC (state) {
    state.play.status.showLyric = !state.play.status.showLyric
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
  UPDATE_TITLE (state, title, showBack, icon) {
    state.titleBar.title = title
    state.titleBar.isShowBack = showBack
    state.titleBar.icon = icon
  },
  SWITCH_SONG (state, obj) {
    state.play.status.playing = true
    state.play.current = obj
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
