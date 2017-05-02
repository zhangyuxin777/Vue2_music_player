/**
 * 播放歌曲
 * @param commit
 * @param song
 */
export const playSong = ({commit}, song) => {
  commit('PLAY_SONG', song)
}
/**
 * 上一首
 * @param commit
 */
export const lastSong = ({commit}) => {
  commit('LAST_SONG')
}
/**
 * 下一首
 * @param commit
 */
export const nextSong = ({commit}) => {
  commit('NEXT_SONG')
}

/**
 * 更新标题
 * @param commit
 * @param title 标题
 */
export const updateTitle = ({commit}, title) => {
  document.title = title
  commit('UPDATE_TITLE', title)
}
/**
 * 设置字号
 * @param commit
 */
export const setFontSize = ({commit}, size) => {
  commit('SET_FONT_SIZE', size)
}

/**
 * 切换播放列表
 * @param commit
 * @param pop
 */
export const togglePopList = ({commit}, pop) => {
  commit('UPDATE_POP_LIST', pop)
}
/**
 * 从播放列表删除
 * @param commit
 * @param song
 */
export const removeFromPlayList = ({commit}, song) => {
  commit('REMOVE_FROM_PLAY_LIST', song)
}
/**
 * 清空播放列表
 * @param commit
 */
export const cleanPlayList = ({commit}) => {
  commit('CLEAN_PLAY_LIST')
}
/**
 * 从喜欢列表里添加或删除
 * @param commit
 * @param song
 */
export const switchLike = ({commit}, song) => {
  commit('SWITCH_LIKE', song)
}

/**
 * 更新进度条
 * @param commit
 * @param obj
 */
export const progress = ({commit}, obj) => {
  commit('UPDATE_PROGRESS', obj)
}
/**
 * 切换播放状态
 * @param commit
 */
export const switchPlayerStatus = ({commit}) => {
  commit('SWITCH_PLAYER_STATUS')
}
/**
 * 将播放状态置为true
 * @param commit
 */
export const playerStatus = ({commit}) => {
  commit('PLAYER_STATUS')
}
/**
 * 切换播放模式
 * @param commit
 */
export const switchMode = ({commit}) => {
  commit('SWITCH_MODE')
}
/**
 * 切换显示musicContent
 * @param commit
 * @param isShow
 */
export const switchMusicContent = ({commit}, isShow) => {
  commit('SWITCH_MUSIC_CONTENT', isShow)
}
/**
 * 切换是否显示歌词
 * @param commit
 */
export const switchLyric = ({commit}) => {
  commit('SWITCH_LYRIC')
}
/**
 * 切换是否显示歌词
 * @param commit
 * @param list
 */
export const updateLyricList = ({commit}, list) => {
  commit('UPDATE_LYRIC_LIST', list)
}
/**
 * 切换显示歌曲信息
 * @param commit
 * @param obj
 */
export const switchInfo = ({commit}, obj) => {
  commit('SWITCH_INFO', obj)
}
/**
 * 下一首播放
 * @param commit
 * @param obj
 */
export const addNext = ({commit}, obj) => {
  commit('ADD_NEXT', obj)
}
/**
 * 添加到我的歌单
 * @param commit
 * @param obj
 */
export const addMyDiss = ({commit}, obj) => {
  commit('ADD_MYDISS', obj)
}
/**
 * 重新开始或停止动画
 * @param commit
 * @param isRotate
 */
export const switchRotate = ({commit}, isRotate) => {
  commit('SWITCH_ROTATE', isRotate)
}
/**
 * 快进
 */
export const seekTo = ({commit}, position) => {
  commit('SEEK_TO', position)
}
/**
 * 声音
 */
export const setVolume = ({commit}, volume) => {
  commit('SET_VOLUME', volume)
}

export const init = ({commit}, obj) => {
  commit('INIT', obj)
}

export const switchBar = ({commit}, obj) => {
  commit('SWITCH_BAR', obj)
}

export const addMainList = ({commit}, obj) => {
  commit('ADD_MAIN_LIST', obj)
}

export const setSearchList = ({commit}, obj) => {
  commit('SET_SEARCH_LIST', obj)
}

export const addSearchList = ({commit}, obj) => {
  commit('ADD_SEARCH_LIST', obj)
}

export const updateKeyword = ({commit}, obj) => {
  commit('UPDATE_KEYWORD', obj)
}

export const cleanSearch = ({commit}) => {
  commit('CLEAN_SEARCH')
}

export const updateSearchPage = ({commit}, obj) => {
  commit('UPDATE_SEARCH_PAGE', obj)
}

