<style scoped>
    @import "css/touchBar.css";
</style>
<template>
    <div class="touch-button">
        <div id="drager"
             style="position:fixed;width:0.7rem;height:0.7rem;background-color:rgba(0, 0, 0, 0.2);z-index:100000;cursor:pointer;top:137px;left:246px;border-radius:30%;padding:0.12rem;">
            <div
                    style="border-radius:50%;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.3);transition:all 0.2s;-webkit-transition:all 0.2s;-moz-transition:all 0.2s;-o-transition:all 0.2s;"></div>
            <div class="con">
                <span class="sprites ic_search"></span>
                <span class="sprites ic_hide"></span>
                <span class="sprites ic_close"></span>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data () {
            return {
                lyricList: {},
                currentLyric: null,
                index: 0,
                value: 0,
                count: 0,
                handle: 0
            }
        },
        computed: {},
        methods: {
            startTimer () {
                let _this = this
                _this.handle = setInterval(function () {
                    _this.count += 1
                    console.log(_this.count)
                }, 10)
            },
            stopTimer () {
                clearInterval(this.handle)
                this.count = 0
            }

        },
        mounted () {
            let _this = this
            let posX
            let posY
            let screenWidth = document.documentElement.clientWidth
            let screenHeight = document.documentElement.clientHeight
            let fdiv = document.getElementById('drager')
            fdiv.isMove = false
            fdiv.onmousedown = function (e) {
                _this.startTimer()
                fdiv.isMove = true
                screenWidth = document.documentElement.clientWidth
                screenHeight = document.documentElement.clientHeight
                if (!e) {
                    e = window.event
                }
                posX = e.clientX - parseInt(fdiv.style.left)
                posY = e.clientY - parseInt(fdiv.style.top)
                document.onmousemove = function (ev) {
                    if (ev === null) {
                        ev = window.event
                    }
                    if (!fdiv.isMove) {
                        return
                    }
                    if ((ev.clientY - posY) <= 0) {
                        fdiv.style.top = '0px'
                    } else if ((ev.clientY - posY) > (screenHeight - parseInt(fdiv.clientHeight))) {
                        fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + 'px'
                    } else {
                        fdiv.style.top = (ev.clientY - posY) + 'px'
                    }
                    if ((ev.clientX - posX) <= 0) {
                        fdiv.style.left = '0px'
                    } else if ((ev.clientX - posX) > (screenWidth - parseInt(fdiv.clientWidth))) {
                        fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + 'px'
                    } else {
                        fdiv.style.left = (ev.clientX - posX) + 'px'
                    }
                }
                fdiv.onmouseup = function (event) {
                    fdiv.isMove = false
                    document.onmousemove = null
                    fdiv.onmouseup = null
                    if (_this.count <= 10) {
                        console.log('click')
                    }
                    _this.stopTimer()
                }
                fdiv.addEventListener('mouseup', fdiv.onmouseup, false)
                window.onload = window.onresize = function () {
                    screenWidth = document.documentElement.clientWidth
                    screenHeight = document.documentElement.clientHeight
                    if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight)) > screenHeight) {
                        fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + 'px'
                    }
                    if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth)) > screenWidth) {
                        fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + 'px'
                    }
                }
                fdiv.addEventListener('touchmove', function (event) {
                    if (event.targetTouches.length === 1) {
                        event.preventDefault()
                        let touch = event.targetTouches[0]
                        if ((touch.pageY) <= 0) {
                            fdiv.style.top = '0px'
                        } else if (touch.pageY > (screenHeight - parseInt(fdiv.clientHeight))) {
                            fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + 'px'
                        } else {
                            fdiv.style.top = (touch.pageY - parseInt(fdiv.clientHeight) / 2) + 'px'
                        }

                        if (touch.pageX <= 0) {
                            fdiv.style.left = '0px'
                        } else if (touch.pageX > (screenWidth - parseInt(fdiv.clientWidth))) {
                            fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + 'px'
                        } else {
                            fdiv.style.left = (touch.pageX - parseInt(fdiv.clientWidth) / 2) + 'px'
                        }
                    }
                }, false)
                fdiv.addEventListener('touchend', fdiv.onmouseup, false)
            }
            fdiv.addEventListener('touchstart', fdiv.onmousedown, false)
        },
        watch: {}
    }
</script>
