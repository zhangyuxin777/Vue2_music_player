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
 * 切换显示歌曲信息
 * @param commit
 * @param isShow
 */
export const switchInfo = ({commit}, info) => {
  commit('SWITCH_INFO', info)
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
 * @param commit
 */
export const seekTo = ({commit}, position) => {
  commit('SEEK_TO', position)
}
/**
 * 声音
 * @param commit
 */
export const setVolume = ({commit}, volume) => {
  commit('SET_VOLUME', volume)
}

export const init = ({commit}, obj) => {
  commit('INIT', obj)
}

