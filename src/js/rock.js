/**
 * Created by pc on 2016/9/9.
 */
export default {
  wlScreen: function () {
    return {
      minHeight: '',
      currentHeight: '',
      currentWidth: '',
      landscape: true,
      orientation: '0'
    }
  },
  autoSize: function (scale) {
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
    var w = minWidth > 640 ? 640 : minWidth
    docEle.style.fontSize = w / initWidth * initSize + 'px'

    var reg = new RegExp('(\\s|^)' + 'hide' + '(\\s|$)')
    document.body.className = document.body.className.replace(reg, ' ')

    console.log('autoSize')
  }
}
