import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)
const state = {
  titleBar: {
    title: '主页'
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
    currentLyricList: {},
    status: {
      total: 10000,
      position: 0,
      playing: false,
      mode: 1,
      rotate: false,
      showLyric: false,
      volume: 1,
      seekTo: 0,
      autoPlay: true
    },
    isShow: true,
    showMusicContent: false,
    popList: {
      pop: false
    },
    info: {
      show: false,
      isMusicContent: false,
      current: {
        data: {
          singer: [{name: ''}],
          songname: ''
        }
      }
    }
  },
  like: {
    list: []
  },
  myDiss: {
    list: []
  },
  list: {
    singer: [],
    album: [],
    mv: []
  },
  search: {
    keyword: '',
    page: 1,
    list: [],
    zhida: {
      pic: '',
      singerName: '',
      id: '',
      mid: ''
    }
  },
  count: 0,
  fontSize: 0,
  barStatus: 2
}

const mutations = {
  INIT (state, obj) {
    obj.playList ? state.play.list = obj.playList : ''
    obj.playCurrent ? state.play.current = obj.playCurrent : ''
    obj.playStatus ? state.play.status = obj.playStatus : ''
    obj.likeList ? state.like.list = obj.likeList : []
    obj.myDissList ? state.myDiss.list = obj.myDissList : []
    if (obj.playStatus) {
      state.play.status.autoPlay = false
      state.play.status.playing = false
      state.play.status.position = 0
      state.play.status.rotate = false
    }
  },
  PLAY_SONG (state, song) {
    state.play.status.autoPlay = true
    let isExist = false
    for (let item of state.play.list) {
      if (item.data.songid === song.data.songid) {
        isExist = true
        break
      }
    }
    if (!isExist) {
      state.play.status.rotate = false
      state.play.list.push(song)
      state.play.current = song
      state.play.status.playing = true
    } else if (state.play.current.data.songid !== song.data.songid) {
      state.play.status.rotate = false
      state.play.current = song
      state.play.status.playing = true
    }
  },
  SWITCH_MUSIC_CONTENT  (state, showContent) {
    state.play.showMusicContent = showContent
  },
  NEXT_SONG (state) {
    state.play.status.autoPlay = true
    let list = state.play.list
    if (list.length === 0 || list.length === 1 || state.play.status.mode === 0) {
      return
    }
    state.play.status.rotate = false
    state.play.status.playing = true
    if (state.play.status.mode === 1) {
      let index = 0
      for (let item of list) {
        if (item.data.songid === state.play.current.data.songid) {
          break
        }
        index += 1
      }
      state.play.current = list[(index === list.length - 1 ? 0 : index + 1)]
    } else {
      state.play.current = list[Math.floor(Math.random() * list.length)]
    }
  },
  LAST_SONG (state) {
    state.play.status.autoPlay = true
    let list = state.play.list
    if (list.length === 0 || list.length === 1 || state.play.status.mode === 0) {
      return
    }
    state.play.status.rotate = false
    state.play.status.playing = true
    if (state.play.status.mode === 1) {
      let index = 0
      for (let item of list) {
        if (item.data.songid === state.play.current.data.songid) {
          break
        }
        index += 1
      }
      state.play.current = list[(index === 0 ? list.length - 1 : index - 1)]
    } else {
      state.play.current = list[Math.floor(Math.random() * list.length)]
    }
  },
  SWITCH_LIKE (state, song) {
    let index = 0
    let isExist = false
    for (let item of state.like.list) {
      if (item.data.songid === song.data.songid) {
        isExist = true
        break
      }
      index += 1
    }
    if (isExist) {
      state.like.list.splice(index, 1)
    } else {
      state.like.list.push(song)
    }
  },
  REMOVE_FROM_PLAY_LIST (state, song) {
    let list = state.play.list
    let index = 0
    for (let item of list) {
      if (item.data.songid === song.data.songid) {
        break
      }
      index += 1
    }
    if (list.length === 1) {
      state.play.status.playing = false
      state.play.status.position = 0
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
    state.play.status.position = 0
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
  UPDATE_LYRIC_LIST (state, list) {
    state.play.currentLyricList = list
  },
  SWITCH_INFO (state, obj) {
    if (obj) {
      state.play.info.current = obj.current
      state.play.info.show = true
      state.play.info.isMusicContent = obj.isMusicContent
    } else {
      state.play.info.show = false
    }
  },
  SET_FONT_SIZE (state, size) {
    state.fontSize = size
  },
  SEEK_TO (state, position) {
    state.seekTo = position
  },
  SET_VOLUME (state, volume) {
    state.play.status.volume = volume
  },
  UPDATE_PROGRESS (state, obj) {
    state.play.status.total = obj.total
    state.play.status.position = obj.position
  },
  SWITCH_PLAYER_STATUS (state) {
    state.play.status.autoPlay = true
    state.play.status.playing = !state.play.status.playing
  },
  PLAYER_STATUS (state) {
    state.play.status.playing = true
  },
  SWITCH_ROTATE (state, isRotate) {
    state.play.status.rotate = isRotate
  },
  UPDATE_TITLE (state, title) {
    state.titleBar.title = title
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
  SWITCH_BAR (state, status) {
    state.barStatus = status
  },
  ADD_MAIN_LIST (state, obj) {
    obj.list.map(function (item) {
      state.list[obj.name].push(item)
    })
  },
  SET_SEARCH_LIST (state, obj) {
    state.search.list = obj.song.list
    if (obj.zhida.hasOwnProperty('zhida_singer')) {
      state.search.zhida.id = obj.zhida.zhida_singer.singerID
      state.search.zhida.mid = obj.zhida.zhida_singer.singerMID
      state.search.zhida.pic = '//y.gtimg.cn/music/photo_new/T001R150x150M000' + state.search.zhida.mid + '.jpg?max_age=2592000'
      state.search.zhida.singerName = obj.zhida.zhida_singer.singerName
    } else {
      state.search.zhida.mid = ''
    }
  },
  ADD_NEXT (state, song) {
    let list = state.play.list
    let index = 0
    let isExist = false
    let isExistPlay = false
    // 循环是否存在改歌曲
    for (let item of list) {
      if (item.data.songid === song.data.songid) {
        isExist = true
        break
      }
      index += 1
    }
    // 存在就删除
    if (isExist) {
      list.splice(index, 1)
    }
    index = 0
    // 循环当前播放位置
    for (let item of list) {
      if (item.data.songid === state.play.current.data.songid) {
        isExistPlay = true
        break
      }
      index += 1
    }
    // 插入到当前歌曲的下一首
    if (isExistPlay) {
      list.splice(index + 1, 0, song)
    } else {
      // 列表为空 则直接播放
      state.play.status.rotate = false
      state.play.list.push(song)
      state.play.current = song
      state.play.status.playing = true
    }
  },
  ADD_MYDISS (state, song) {
    let isExist = false
    for (let item of state.myDiss.list) {
      if (item.data.songid === song.data.songid) {
        isExist = true
        break
      }
    }
    if (!isExist) {
      state.myDiss.list.push(song)
    }
  },
  ADD_SEARCH_LIST (state, obj) {
    obj.song.list.map(function (item) {
      state.search.list.push(item)
    })
  },
  UPDATE_KEYWORD (state, keyword) {
    state.search.keyword = keyword
  },
  UPDATE_SEARCH_PAGE (state, page) {
    state.search.page = page
  },
  CLEAN_SEARCH (state) {
    state.search.list = []
    state.search.page = 1
    state.search.zhida = {
      pic: '',
      singerName: '',
      id: '',
      mid: ''
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
