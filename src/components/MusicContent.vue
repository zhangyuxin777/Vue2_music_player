<style scoped lang="scss" type="text/css">
    @import "css/musicContent.scss";
</style>
<template>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInLeft"
                leave-active-class="animated fadeOut" mode="out-in">
        <div class="music-content op-show">
            <div class="bg-op">
                <img :src="songImg" class="bg blur" alt="">
                <div class="mask"></div>
                <div class="gradient"></div>

            </div>
            <div class="header">
                <div class="back" @click="back">
                    <div class="sprites ic_back"></div>
                </div>
                <div class="title">
                    <div class="songname">{{current.data.songname}}</div>
                    <div class="singername">{{current.data.singer[0].name}}</div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="voice-box con" v-show="showLyric">
                <span class="sprites ic_voice"></span>
                <input id="volume" class="range" type="range" min="0" max="100" @input="volumeChange" v-model="value">
            </div>
            <div class="lyric-box con" id="lyricBox" :class="{'op-hide':!showLyric}" @click="switchLyric">
                <ul class="lyric-list" id="lyricList">
                    <li v-for="(item,index) in list" class="item lyricItem">
                        <div class="text" :id="item.id">
                            {{item.text}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="cd-box con" :class="{'op-hide':showLyric}" @click="switchLyric">
                <div class="cd" id="record">
                    <div class="cd-side"></div>
                    <img :src="songImg" class="cd-img" alt="">
                </div>
                <div class="needle" :class="{'needle_play' : playing}"></div>
                <div class="needle_2"></div>
            </div>
            <div class="click-box con" v-show="!showLyric">
                <div class="sprites like" :class="{'like-do' : isLike}" @click="switchLike"></div>
                <div class="sprites download" @click="toDown"></div>
                <div class="sprites more" @click="toMore"></div>
            </div>
            <div class="progress-box con">
                <span class="current_time">{{currentTime.m}}:{{currentTime.s}}</span>
                <div class="progress-bar">
                    <div class="progress" :style="{width:progress+'%'}"></div>
                    <div class="point" :style="{left:progress+'%'}"></div>
                </div>
                <div class="total_time">{{totalTime.m}}:{{totalTime.s}}</div>
            </div>
            <div class="control-box con">
                <div class="sprites mode" @click="switchMode"
                     :class="{'m_0' : mode===0 ,'m_1' : mode===1 ,'m_2' : mode===2}"></div>
                <div class="sprites last-song" @click="last"></div>
                <div class="sprites play" @click="playClick" :class="{'pause' : playing ,'play' : !playing}"></div>
                <div class="sprites next-song" @click="next"></div>
                <div class="sprites menu" @click="toPop"></div>
            </div>
            <a id="download" :href="url" download="music.mp3"></a>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import API from '../js/api'
    import Common from '../js/rock'
    import $ from 'jquery'
    import storage from '../js/storage'
    import {mapState} from 'vuex'
    import mui from '../js/mui.all'
    export default{
        data () {
            return {
                lyricList: {},
                currentLyric: null,
                index: 0,
                value: 0,
                lastLyricId: ''
            }
        },
        computed: {
            ...mapState({
                progress: state => (state.play.status.position / parseFloat(state.play.status.total) * 100),
                mode: state => state.play.status.mode,
                current: state => state.play.current,
                playing: state => state.play.status.playing,
                showLyric: state => state.play.status.showLyric,
                showMusicContent: state => state.play.showMusicContent,
                volume: state => state.play.status.volume,
                list: state => state.play.currentLyricList,
                isLike: state => {
                    let isExist = false
                    for (let item of state.like.list) {
                        if (item.data.songid === state.play.current.data.songid) {
                            isExist = true
                            break
                        }
                    }
                    return isExist
                },
                currentTime: state => {
                    let num = (Array(2).join('0') + parseInt(state.play.status.position % 60)).slice(-2)
                    return {
                        m: parseInt(state.play.status.position / 60),
                        s: num
                    }
                },
                totalTime: state => {
                    let num = (Array(2).join('0') + parseInt(state.play.status.total % 60)).slice(-2)
                    return {
                        m: isNaN(parseInt(state.play.status.total / 60)) ? 0 : parseInt(state.play.status.total / 60),
                        s: isNaN(parseInt(state.play.status.total % 60)) ? 0 : num
                    }
                },
                songImg: state => {
                    if (state.play.current.data.albummid) {
                        return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + state.play.current.data.albummid + '.jpg'
                    }
                },
                url: state => {
                    if (state.play.current.data && state.play.current.data.songid) {
                        return 'http://ws.stream.qqmusic.qq.com/' + state.play.current.data.songid + '.m4a?fromtag=46'
                    }
                }
            })
        },

        methods: {

            playClick () {
                this.$store.dispatch('switchPlayerStatus')
            },

            switchLike () {
                this.$store.dispatch('switchLike', this.$store.state.play.current)
            },

            next () {
                this.$store.dispatch('nextSong')
            },

            last () {
                this.$store.dispatch('lastSong')
            },

            switchMode () {
                this.$store.dispatch('switchMode')
            },

            switchLyric () {
                this.$store.dispatch('switchLyric')
                // 隐藏歌词 显示动画时的动画状态同步
                this.animationCD(0)

            },
            toPop () {
                this.$store.dispatch('togglePopList', true)
            },

            isCurrent (id) {
                return id === this.$store.state.play.current.data.songid
            },

            back () {
                window.history.back()
                this.$store.dispatch('switchMusicContent', false)
            },

            volumeChange () {
                this.$store.dispatch('setVolume', event.target.value / parseFloat(event.target.getAttribute('max')))
            },

            toMore () {
                this.$store.dispatch('switchInfo', {
                    current: this.$store.state.play.current,
                    isMusicContent: true
                })
                event.stopPropagation()
            },

            toDown () {
                if (Common.system().android) {
                    document.getElementById('download').click()
                } else if (Common.system().ios) {
                    mui.alert('ios系统不支持下载')
                }
                event.stopPropagation()
            },

            // 获取歌词数据
            getLyric () {
                let _this = this
                let store = _this.$store
                API.getLyric(store.state.play.current.data.songid, function (response) {

                    let lyric = _this.formatLyric(response.showapi_res_body.lyric)

                    try {
                        document.getElementById(this.currentLyric).classList.remove('current')
                    } catch (e) {
                    }

                    _this.currentLyric = null

                    let lyricLi = {}

                    // 生成时间歌词对应的对象
                    lyric.split('[').slice(5).map((item) => {
                        let time = item.split(']')[0]
                        lyricLi[(parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]))] = {
                            id: _this.current.data.songid.toString() + '_' + (parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])),
                            time: time,
                            text: item.split(']')[1]
                        }
                    })

                    store.dispatch('updateLyricList', lyricLi)

                }, function (response) {
                    console.log('获取歌词失败')
                    let myArray = [0, 1, 2, 3, 4, 5, 6, 7]
                    for (let item of myArray) {
                        if (item === 7) {
                            store.state.play.currentLyricList[item] = {
                                id: item,
                                time: item,
                                text: '暂无歌词'
                            }
                        } else {
                            store.state.play.currentLyricList[item] = {
                                id: item,
                                time: item,
                                text: ''
                            }
                        }
                    }
                })
            },

            /**
             * 格式化歌词
             * @param lyric 原歌词数据
             * @returns {*}
             */
            formatLyric (lyric) {
                return lyric.replace(/&#32;/g, ' ').replace(/&#40;/g, '(').replace(/&#41;/g, ')').replace(/&#10;/g, ' ').replace(/&#58;/g, ':').replace(/&#46;/g, '.').replace(/&#45;/g, '-').replace(/&#39;/g, '\'').replace(/&#13;/g, ' ')
            },

            // 更新CD动画状态
            animationCD (delayTime) {
                let recordStyle = document.getElementById('record').style
                let _this = this
                let store = _this.$store
                let playStatus = store.state.play.status
                setTimeout(function () {
                    // 取消过渡
                    recordStyle.transition = 'none'
                    recordStyle.webkitTransition = 'none'
                    // 转到对应进度的角度
                    recordStyle.transform = 'rotate(' + playStatus.position * 5 + 'deg)'
                    recordStyle.webkitTransform = 'rotate(' + playStatus.position * 5 + 'deg)'
                    if (playStatus.playing) {
                        //  如果是播放状态 再计算剩余时间 并过渡到最终角度
                        setTimeout(function () {
                            // 由于上方已经转到播放时间对应的角度  所以需要减去已经播放的时间作为过渡时间 使速度保持恒定
                            // 开启过渡
                            recordStyle.transition = 'all ' + (playStatus.total - playStatus.position) + 's linear'
                            recordStyle.webkitTransition = 'all ' + (playStatus.total - playStatus.position) + 's linear'
                            // 设定终止角度
                            recordStyle.transform = 'rotate(' + playStatus.total * 5 + 'deg)'
                            recordStyle.webkitTransform = 'rotate(' + playStatus.total * 5 + 'deg)'
                        }, delayTime)
                    }
                }, delayTime)
            }
        },
        watch: {
            current (curr) {
                let recordStyle = document.getElementById('record').style
                let playStatus = this.$store.state.play.status
                // 切换歌曲 设置到初始位置 停止过渡动画
                // todo  回归初始状态存在问题
                recordStyle.transition = 'none'
                recordStyle.webkitTransition = 'none'
                recordStyle.transform = 'rotate(0deg)'
                recordStyle.webkitTransform = 'rotate(0deg)'
                setTimeout(function () {
                    if (playStatus.playing) {
                        recordStyle.transition = 'all ' + (playStatus.total - playStatus.position) + 's linear'
                        recordStyle.webkitTransition = 'all ' + (playStatus.total - playStatus.position) + 's linear'
                        recordStyle.transform = 'rotate(' + playStatus.total * 5 + 'deg)'
                        recordStyle.webkitTransform = 'rotate(' + playStatus.total * 5 + 'deg)'
                    }
                }, 500)

                this.$store.dispatch('updateLyricList', {})
                if (!curr.data.songid) {
                    return
                }
                let _this = this
                _this.lastLyricId = curr.data.songid
                sessionStorage.setItem('lastLyricId', _this.lastLyricId)
                _this.getLyric()
                this.value = parseInt(document.getElementById('volume').getAttribute('max')) * playStatus.volume
            },
            // 播放状态改变
            playing (playing) {
                let recordStyle = document.getElementById('record').style
                let playStatus = this.$store.state.play.status
                if (!recordStyle) {
                    return
                }
                // 状态改变时  更改动画状态
                if (playing) {

                    // 设置剩余时间
                    recordStyle.transition = 'all ' + (playStatus.total - playStatus.position) + 's linear'
                    recordStyle.webkitTransition = 'all ' + (playStatus.total - playStatus.position) + 's linear'

                    // 设置到达的角度
                    recordStyle.transform = 'rotate(' + playStatus.total * 5 + 'deg)'
                    recordStyle.webkitTransform = 'rotate(' + playStatus.total * 5 + 'deg)'

                } else {

                    // 停止过渡
                    recordStyle.transition = 'none'
                    recordStyle.webkitTransition = 'none'

                    // 设置当前的角度
                    recordStyle.transform = 'rotate(' + playStatus.position * 5 + 'deg)'
                    recordStyle.webkitTransform = 'rotate(' + playStatus.position * 5 + 'deg)'
                }
            },

            progress (pro) {
                let time = 0
                let id = null
                try {
                    time = parseInt(this.currentTime.m) * 60 + parseInt(this.currentTime.s)
                    id = this.current.data.songid.toString() + '_' + time.toString()
                } catch (e) {

                }
                //
                if (this.$store.state.play.currentLyricList.hasOwnProperty(time) && id !== this.currentLyric) {
                    try {
                        let ele = $('#lyricBox').find('.current')
                        $('#lyricBox').animate({'scrollTop': $('#lyricBox').scrollTop() + ele.offset().top - $('#lyricBox').offset().top - this.$store.state.fontSize * 0.1 * 35 + 35}, 350)
                    } catch (e) {
                    }
                    if (Common.trim(this.$store.state.play.currentLyricList[time].text).length !== 0) {
                        try {
                            document.getElementById(id).classList.add('current')
                            document.getElementById(this.currentLyric).classList.remove('current')
                        } catch (e) {
                        }
                        this.currentLyric = id
                    }
                }
            },
            volume (volume) {
                this.value = parseInt(document.getElementById('volume').getAttribute('max')) * volume
            },

            isLike () {
                storage.setL('likeList', this.$store.state.like.list)
            },
            // 监听歌词显示状态变化 保存到缓存
            showLyric () {
                storage.setL('playStatus', this.$store.state.play.status)
            }
        },
        mounted () {
            let _this = this
            let store = _this.$store
            store.dispatch('switchMusicContent', true)
            store.dispatch('updateTitle', store.state.play.current.data.songname + '-' + store.state.play.current.data.singer[0].name)
            // 动画的延迟生效
            _this.animationCD(300)

            _this.lastLyricId = sessionStorage.getItem('lastLyricId')
            // 不是同一首歌且歌词列表不为空  才加载歌词
            if (parseInt(_this.lastLyricId) === parseInt(store.state.play.current.data.songid) && document.getElementById('lyricList').children.length > 0) {
                return
            }
            _this.lastLyricId = store.state.play.current.data.songid
            sessionStorage.setItem('lastLyricId', _this.lastLyricId)
            if (!store.state.play.current.data.songid) {
                return
            }
            console.log('获取歌词 mounted')
            _this.getLyric()
        }
    }
</script>
