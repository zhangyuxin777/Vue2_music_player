/**
 * Created by pc on 2016/9/9.
 */
export default {
  wlScreen () {
    return {
      minHeight: '',
      currentHeight: '',
      currentWidth: '',
      landscape: true,
      orientation: '0'
    }
  },
  autoSize (scale) {
    this.wlScreen().currentHeight = window.innerHeight
    this.wlScreen().currentWidth = window.innerWidth
    this.wlScreen().minHeight = this.wlScreen().currentHeight - 150
    this.wlScreen().landscape = (window.orientation === '0')
    this.wlScreen().orientation = window.orientation

    var docEle = document.documentElement
    var initWidth = 640
    var initSize = 100
    if (!isNaN(scale) && scale > 0) {
      initSize = scale
    }
    var minWidth = window.screen.width < window.screen.height ? window.screen.width : window.screen.height
    // var devicePixelRatio = window.devicePixelRatio
    // if (window.screen.width / window.innerWidth >= 2) {
    //   var actualWidth = window.screen.width / devicePixelRatio
    //   var actualHeight = window.screen.height / devicePixelRatio
    //   minWidth = actualWidth < actualHeight ? actualWidth : actualHeight
    // }
    var w = this.isPC() ? 400 : (minWidth > 640 ? 640 : minWidth)
    docEle.style.fontSize = w / initWidth * initSize + 'px'

    var reg = new RegExp('(\\s|^)' + 'hide' + '(\\s|$)')
    document.body.className = document.body.className.replace(reg, ' ')
    console.log('autoSize')
  },
  trim (str) {
    if (str != undefined && str != null)
      return str.replace(/(^\s*)|(\s*$)/g, "")
  },
  scroll: {
    getScrollTop: function () {
      var st = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        st = document.documentElement.scrollTop;
      }
      else if (document.body) {
        st = document.body.scrollTop;
      }
      return st
    },
    getClientHeight: function () {
      var clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
      }
      else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
      }
      return clientHeight
    },
    getScrollHeight: function () {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    }
  },
  system () {
    let u = navigator.userAgent, app = navigator.appVersion;
    return {//移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      //iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
      iPad: u.indexOf('iPad') > -1, //是否iPad
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信
      qq: u.indexOf('QQBrowser') !== -1  //qq浏览器 手机和pc
    };
  },
  isPC () {
    var userAgentInfo = navigator.userAgent
    var Agents = ["Android", "Linux", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
    var flag = true
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  },
  dateFormat (format) {
    let _this = new Date()
    let o = {
      'M+': _this.getMonth() + 1,
      'd+': _this.getDate(),
      'h+': _this.getHours(),
      'm+': _this.getMinutes(),
      's+': _this.getSeconds(),
      'q+': Math.floor((_this.getMonth() + 3) / 3),
      'S': _this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  },
  showApi: {
    appSecret: '32a7b9412fff4da0a5c688b77151b736',
    appId: '27598'
  }
}
