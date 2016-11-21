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
