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
  }
}
