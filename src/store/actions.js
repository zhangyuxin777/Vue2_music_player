export const increment = ({commit}) => {
  commit('INCREMENT')
}

/**
 * 播放歌曲
 * @param commit
 * @param song
 */
export const playSong = ({commit}, song) => {
  commit('SWITCH_ROTATE', false)
  commit('PLAY_SONG', song)
}

/**
 * 更新标题 和按钮
 * @param commit
 * @param title 标题
 * @param showBack 是否显示返回按钮
 * @param icon 右侧按钮图标
 */
export const updateTitle = ({commit}, title, showBack, icon) => {
  document.title = title
  commit('UPDATE_TITLE', title, showBack, icon)
}

/**
 * 显示或隐藏 滚动条
 * @param commit
 */
export const toggleSpinner = ({commit}) => {
  commit('TOGGLE_SPINNER')
}
/**
 * 排行榜 id
 * @param commit
 * @param id
 */
export const updateTopId = ({commit}, id) => {
  commit('UPDATE_TOP_ID', id)
}

/**
 * 添加到播放列表
 * @param commit
 * @param obj
 */
export const addPlayList = ({commit}, obj) => {
  commit('ADD_PLAY_LIST', obj)
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
 * 重新开始或停止动画
 * @param commit
 * @param isRotate
 */
export const switchRotate = ({commit}, isRotate) => {
  commit('SWITCH_ROTATE', isRotate)
}
/**
 * 上一首
 * @param commit
 */
export const lastSong = ({commit}) => {
  commit('SWITCH_ROTATE', false)
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
 * 下一首
 * @param commit
 * @param keyword
 */
export const updateKeyword = ({commit}, keyword) => {
  commit('UPDATE_KEYWORD', keyword)
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
 * @param song
 */
export const cleanPlayList = ({commit}, song) => {
  commit('CLEAN_PLAY_LIST', song)
}
