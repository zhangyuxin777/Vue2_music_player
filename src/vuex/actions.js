import Common from '../js/rock';
import $ from 'jquery';
import store from '../vuex/store';
/**
 * 更新标题 和按钮
 * @param dispatch
 * @param title 标题
 * @param showBack 是否显示返回按钮
 * @param icon 右侧按钮图标
 */
export const updateTitle = ({dispatch}, title, showBack, icon) => {
    document.title = title;
    dispatch('UPDATE_TITLE', title, showBack, icon)
};

/**
 * 显示或隐藏 滚动条
 * @param dispatch
 */
export const toggleSpinner = ({dispatch}) => {
    dispatch('TOGGLE_SPINNER');
};
/**
 * 排行榜 id
 * @param dispatch
 * @param id
 */
export const updateTopId = ({dispatch}, id) => {
    dispatch('UPDATE_TOP_ID', id);
};
/**
 * 切换播放的歌曲
 * @param dispatch
 * @param obj
 * @param list
 */
export const switchSong = ({dispatch}, obj, list) => {
    dispatch('SWITCH_SONG', obj);
    var exist = false;
    for (var i = 0; i < list.length; i++) {
        if (list[i].songid == obj.songid) {
            exist = true;
            break;
        }
    }
    if (!exist) {
        dispatch('ADD_PLAY_LIST', obj);
    }
};
/**
 * 添加到播放列表
 * @param dispatch
 * @param obj
 */
export const addPlayList = ({dispatch}, obj) => {
    dispatch('ADD_PLAY_LIST', obj);
};
/**
 * 更新进度条
 * @param dispatch
 * @param total
 * @param current
 */
export const progress = ({dispatch}, total, current) => {
    dispatch('UPDATE_PROGRESS', total, current);
};
/**
 * 切换播放状态
 * @param dispatch
 */
export const switchPlayerStatus = ({dispatch}) => {
    dispatch('SWITCH_PLAYER_STATUS');
};
/**
 * 将播放状态置为true
 * @param dispatch
 */
export const playerStatus = ({dispatch}) => {
    dispatch('PLAYER_STATUS');
};
/**
 * 切换播放模式
 * @param dispatch
 */
export const switchMode = ({dispatch}) => {
    dispatch('SWITCH_MODE');
};
/**
 * 上一首
 * @param dispatch
 */
export const lastSong = ({dispatch}) => {
    dispatch('LAST_SONG');
};
/**
 * 下一首
 * @param dispatch
 */
export const nextSong = ({dispatch}) => {
    dispatch('NEXT_SONG');
};