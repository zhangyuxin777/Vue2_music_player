/**
 * Created by pc on 2016/9/9.
 */
var AV = require('leancloud-storage');
var mui = require('../js/mui.min.js');

/**
 * leancloud 对象
 */
module.exports.mui = mui;

/**
 * app vue 主界面 根目录
 */
module.exports.appView = '';

module.exports.init = function (view) {

    this.appView = view;
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };
};

module.exports.wlConfig = function () {
    return {
        APP_ID: '27598',
        APP_KEY: '32a7b9412fff4da0a5c688b77151b736'
    };
};

module.exports.wlScreen = function () {
    return {
        minHeight: '',
        currentHeight: '',
        currentWidth: '',
        landscape: true,
        orientation: '0'
    }
};

/**
 * 保存进入页面是的宽度高度和方向
 * @param {int} scale 比例
 */
module.exports.autoSize = function (scale) {
    var _this = this;
    this.wlScreen().currentHeight = window.innerHeight;
    this.wlScreen().currentWidth = window.innerWidth;
    this.wlScreen().minHeight = this.wlScreen().currentHeight - 150;//弹起软键盘之后的屏幕阈值  屏幕高度硬顶小于该值
    this.wlScreen().landscape = (window.orientation == '0');
    this.wlScreen().orientation = window.orientation;
    //屏幕旋转事件 重新获取方向和数值
    window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', function (e) {

        //判断是否为旋转屏幕 只有屏幕旋转才重新记录
        if (_this.wlScreen().orientation != window.orientation) {
            _this.wlScreen().landscape = (window.orientation == '0');
            _this.wlScreen().orientation = window.orientation;
            //由于安卓和ios 事件和数值更改的顺序不一样，有可能先触发事件后更改参数，所以增加延时保证新的数据正确
            setTimeout(function () {
                _this.wlScreen().currentHeight = window.innerHeight;
                _this.wlScreen().currentWidth = window.innerWidth;
                _this.wlScreen().minHeight = wlScreen().currentHeight - 150;
            }, 1500);
        }
    }, false);


    var docEle = document.documentElement;
    var initWidth = 640, initSize = 100;
    if (!isNaN(scale) && scale > 0)
        initSize = scale;
    var minWidth = window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
    var devicePixelRatio = window.devicePixelRatio;
    //部分安卓手机 window.innerWidth的实际数值是   window.innerWidth*window.devicePixelRatio
    if (window.screen.width / window.innerWidth >= 2) {
        var actualWidth = window.screen.width / devicePixelRatio;
        var actualHeight = window.screen.height / devicePixelRatio;
        minWidth = actualWidth < actualHeight ? actualWidth : actualHeight;
    }
    var w = minWidth > 640 ? 640 : minWidth;
    docEle.style.fontSize = w / initWidth * initSize + 'px';

    //移除隐藏body 的hide class
    var reg = new RegExp('(\\s|^)' + 'hide' + '(\\s|$)');
    document.body.className = document.body.className.replace(reg, ' ');

    console.log('autoSize');
};

/**
 * @method GET 异步提交
 * @param {string} url url
 * @param {object} data 参数
 * @param {function} callback 成功回调
 * @param {function} error 错误回调
 * @return {null}
 */
module.exports.showApiData = function (url, data, callback, error) {

    var url1 = url + "?showapi_appid=" + this.wlConfig().APP_ID + "&showapi_timestamp=" + this.showApiTimeTamp() + "&showapi_sign=" + this.wlConfig().APP_KEY;
    for (var i in data) {
        url1 += "&" + i + "=" + data[i];
    }
    $.ajax({
        async: true,
        url: url1,
        type: 'GET',
        success: function (backData) {
            callback(backData);
        },
        error: function (x, y, z) {
            console.log("error!");
            if (typeof error == 'function') {
                error(x, y, z);
            }
        }
    });
};

module.exports.showApiTimeTamp = function () {
    var d1 = new Date();
    return d1.format('yyyyMMddhhmmss');
};

/**
 * @method 获取页面url后面参数的值
 * @param {String} name  参数名
 */
module.exports.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
};

/**
 * @method 获取页面url后面参数的值
 * @param {String} name  参数名
 */
module.exports.getUrlParamAfterHash = function (name) {
    var reg = new RegExp("(^|&\?)" + name + "=([^&]*)(&|$)");
    try {
        var r = window.location.hash.match(reg);
        if (r != null)
            return unescape(r[2]);
    } catch (e) {
    }
    return null;
};

/**
 * @method 去掉字符串头尾空格
 * @param {String} str  字符串
 */
module.exports.trim = function (str) {
    if (str != undefined && str != null)
        return str.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 输入控制
 * @property decimal 带小数点
 * @property integer 纯数字
 * @property andX 带大小写X 用于身份证
 */
module.exports.onlyNumber = {
    decimal: function (input) {
        var number = $(input).val();
        var lastChar = number.substr(number.length - 1, number.length);
        if (!lastChar.match(/^[0-9.]+$/)) {
            $(input).val(number.substr(0, number.length - 1));
        }
    },
    integer: function (input) {
        var number = $(input).val();
        var lastChar = number.substr(number.length - 1, number.length);
        if (!lastChar.match(/^[0-9]+$/)) {
            $(input).val(number.substr(0, number.length - 1));
        }
    },
    andX: function (input) {
        var number = $(input).val();
        var lastChar = number.substr(number.length - 1, number.length);
        if (!lastChar.match(/^[0-9Xx]+$/)) {
            $(input).val(number.substr(0, number.length - 1));
        }
    }
};

/**
 *  滚动条相关函数
 */
module.exports.scroll = function () {
    //获取滚动条当前的位置
    return {
        getScrollTop: function () {
            var st = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                st = document.documentElement.scrollTop;
            }
            else if (document.body) {
                st = document.body.scrollTop;
            }
            return st;
        },
        //获取当前可视范围的高度
        getClientHeight: function () {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            }
            else {
                clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            }
            return clientHeight;
        },
        //获取文档完整的高度
        getScrollHeight: function () {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }
    }
};

/**
 *  @method 判断PC 或者是手机平板
 *  @return {boolean}
 */
module.exports.isPC = function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};

/**
 * 字段 非undefined 非空 长度非0
 * @param val
 * @returns {boolean}
 */
module.exports.hasVal = function (val) {
    return (val != undefined && val != null && val.length != 0);
};

module.exports.getDate = function (date, offDay) {
    if (typeof date == 'string') {
        var arr = date.split('-');
        date = new Date(arr[0], arr[1] - 1, arr[2]);
    }
    var targetday_milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * offDay;
    date.setTime(targetday_milliseconds); //注意，这行是关键代码
    return date;
}
