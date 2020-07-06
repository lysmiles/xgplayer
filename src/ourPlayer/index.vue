<template>
  <div class="video-content">
    <!--

    在模板中使用计算属性localVideoList，目的只是能触发逻辑，界面上不用出现，所以隐藏起来
    如果使用监听选项watch，监听传入的视频数组，因为代码中包含改变数组的逻辑，整块watch代码会无限循环

    -->
    <p style="display: none;">{{localVideoList.length}}</p>
    <div
      class="video-fix"
      :style="videoStyles"
      v-for="item of splitScreenNum"
      :key="item"
      :id="item + 'videoID'"
    >
      <div class="logo-box"
           :id="'logoBox' + item"
           :style="{marginLeft: `-${logoWidth / 2}px`, marginTop: `-${logoWidth / 2}px`}">
        <slot name="logo">
          <!--默认logo-->
          <img :src="logo" alt="logo">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Player from 'xgplayer'
  // 执行关闭按钮插件
  import './plugins/closeVideo'
  import 'xgplayer'
  import 'xgplayer-mp4'
  import HlsJsPlayer from 'xgplayer-hls.js'
  import FlvJsPlayer from 'xgplayer-flv.js';
  // 自定义样式
  // import '../assets/css/.xgplayer/skin/index.js'
  export default {
    name: "inphasePlayer",
    props: {
      /**
       * 是否为直播
       * */
      live: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启截屏
       * */
      screenShot: {
        type: Boolean,
        default: true
      },
      /**
       * 封面图
       * */
      poster: {
        type: String,
        default: ''
      },
      /**
       * 是否开启下载
       * */
      download: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启画中画
       * */
      pip: {
        type: Boolean,
        default: false
      },
      /**
       *  分屏数
       * */
      splitScreen: {
        type: Number,
        validator: function (value) {
          // 这个值必须匹配下列数字中的一个
          return [1, 4, 9, 16].indexOf(value) !== -1
        },
        default: 1
      },
      /**
       *  视频数据
       * */
      videoList: {
        type: Array,
        default() {
          return []
        }
      },
      /**
       *  单个视频源
       */
      videoUrl: {
        type: String,
        default: ''
      },
      /**
       * 是否开启自动播放
       */
      autoplay: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启跨域
       */
      crossOrigin: {
        type: Boolean,
        default: true
      },
      /**
       * 清晰度数据
       */
      definitionList: {
        type: Array,
        default() {
          return []
        }
      },
      /**
       * 清晰度列表触发方式
       */
      definitionActive: {
        type: String,
        validator: function (value) {
          // 这个值必须匹配下列数字中的一个
          return ['hover', 'click'].indexOf(value) !== -1
        },
        default: 'hover'
      },
      /**
       * 弹幕数据
       */
      danmu: {
        type: Array,
        default() {
          return []
        }
      },
      /**
       * 默认倍速
       */
      defaultPlaybackRate: {
        type: Number,
        validator: function (value) {
          // 这个值必须匹配下列数字中的一个
          return [0.5, 0.75, 1, 1.5, 2].indexOf(value) !== -1
        },
        default: 1
      }
    },
    data() {
      return {
        // logo宽度
        logoWidth: 0,
        // 默认logo
        logo: require('./assets/img/logo.png'),
        // 单个播放器对象
        player: null,
        // 播放器实例对象数组
        players: [],
        // 容器宽度
        clientWidth: '',
        // 容器高度
        clientHeight: '',
        // 容器尺寸样式
        videoStyles: '',
        videoStyleOptions: {
          1: 'width:100% !important;height:100% !important',
          4: 'width:49% !important;height:49% !important;',
          9: 'width:33%;height:33%;',
          16: 'width:24%;height:24%;',
        },
        videoOptions: {
          id: '', // 播放器容器DOM的ID
          url: '', // 视频源
          width: 0, // 宽度
          height: 0, // 高度
          isLive: true, // flv格式视频流是否开启直播
          screenShot: true,// 是否开启截图
          autoplay: true, // 是否自动播放
          crossOrigin: true, // 是否跨域
          download: true, //是否下载视频
          pip: false, // 是否开启画中画
          definitionActive: 'hover', // 修改清晰度控件的触发方式
          poster: '', // 封面图
          playbackRate: [0.5, 0.75, 1, 1.5, 2], // 倍速播放
          defaultPlaybackRate: 1.5, // 默认倍速
          /*danmu: {
            comments: [
              {
                duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                id: '1', //弹幕id，需唯一
                start: 1000, //弹幕出现时间，毫秒
                prior: false, //该条弹幕优先显示，默认false
                color: true, //该条弹幕为彩色弹幕，默认false
                txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
                style: {  //弹幕自定义样式
                  color: '#ff9500',
                  fontSize: '20px',
                }
              },{
                duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                id: '2', //弹幕id，需唯一
                start: 1000, //弹幕出现时间，毫秒
                prior: false, //该条弹幕优先显示，默认false
                color: true, //该条弹幕为彩色弹幕，默认false
                txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
                style: {  //弹幕自定义样式
                  color: '#ff9500',
                  fontSize: '20px',
                }
              },
              {
                duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                id: '3', //弹幕id，需唯一
                start: 1000, //弹幕出现时间，毫秒
                prior: false, //该条弹幕优先显示，默认false
                color: true, //该条弹幕为彩色弹幕，默认false
                txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
                style: {  //弹幕自定义样式
                  color: '#ff9500',
                  fontSize: '20px',
                }
              },
              {
                duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                id: '4', //弹幕id，需唯一
                start: 1000, //弹幕出现时间，毫秒
                prior: false, //该条弹幕优先显示，默认false
                color: true, //该条弹幕为彩色弹幕，默认false
                txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
                style: {  //弹幕自定义样式
                  color: '#ff9500',
                  fontSize: '20px',
                }
              }

            ],  //弹幕数组
            area: {  //弹幕显示区域
              start: 0, //区域顶部到播放器顶部所占播放器高度的比例
              end: 1 //区域底部到播放器顶部所占播放器高度的比例
            },
          },*/
        },
        danmuOptions: {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '1', //弹幕id，需唯一
          start: 1000, //弹幕出现时间，毫秒
          prior: false, //该条弹幕优先显示，默认false
          color: true, //该条弹幕为彩色弹幕，默认false
          txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
          style: {  //弹幕自定义样式
            color: '#ff9500',
            fontSize: '20px',
          },
          mode: 'scroll' //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
        }
      }
    },
    watch: {
      /**
       * 监听分屏数变化
       */
      splitScreenNum(val) {
        let len = this.videoList.length
        if (len > val) {
          this.videoList.splice(val, len - val)
          this.players.forEach((player, index) => {
            if (index >= val) {
              player.destroy()
            }
          })
          this.players.splice(val, len - val)
        }
        this.setScreenStyle()
      },
      /**
       * 处理传入的单个视频源
       */
      videoUrl(val) {
        if (this.videoList.length !== 0) throw new Error('video-list 与 video-url 不能混用')
        // 更新后的值为空时，直接跳出循环
        if (!val) return
        this.initVideo(val)
      },
      /**
       * 处理弹幕
       */
      /*danmu(val) {
        let len = val.length - 1
        if (!val[len]) throw new Error('传入的弹幕为空')
        if (typeof val[len] === 'string') {
          const danmuOptions = {...this.danmuOptions}
          danmuOptions.id = `${Date.now()}`
          danmuOptions.txt = val[len]
          this.player.danmu.sendComment(danmuOptions)
        } else {
        }
      }*/
    },
    mounted() {
      // 初始化视频样式
      this.setScreenStyle()
      // 初始化时，外部url不为空，则直接播放
      if (this.videoUrl) this.initVideo(this.videoUrl)
    },
    computed: {
      /**
       * 处理不合理的分屏数
       */
      splitScreenNum() {
        if (this.splitScreen === 1 || this.splitScreen === 4 || this.splitScreen === 9 || this.splitScreen === 16) {
          return this.splitScreen
        } else {
          return 1
        }
      },
      /**
       *  监听视频数组的变化
       */
      localVideoList() {
        let len = this.videoList.length
        // 处理视频源混用，两者同时存在，抛出错误
        if (len !== 0 && this.videoUrl !== '') {
          throw new Error('video-list 与 video-url 不能混用')
        }
        // 当视频数组为空时，跳出函数，避免报错
        if (len === 0) {
          return []
        }
        // 通过关闭按钮插件关闭后，默认视频源为当前网站origin
        const origin = window.location.origin + '/'
        // 找出第一个无视频源播放器实例
        const firstClosedPlayer = this.players.find((player) => {
          return player.src === origin
        })
        // 找到之后播放同时切换清晰度视频源
        if (firstClosedPlayer) {
          const pop = this.videoList.pop()
          firstClosedPlayer.src = pop.url
          firstClosedPlayer.emit('resourceReady', pop.definitionList)
          return []
        }

        // 新加入的视频url，如果是重复的，则不加入
        let lastVideoUrl = this.videoList[len - 1].url
        let flagIndex = this.videoList.findIndex(item => item.url === lastVideoUrl)

        // 如果找到的坐标就是新加入视频的坐标，则没有重复
        if (flagIndex === len - 1) {
          // 当数组长度超过当前分屏数时，用新元素替换原数组最后一位元素
          if (len > this.splitScreenNum) {
            /*
            *   不能省略该临时变量lastVideoItem，
            *   js执行时会从左到右执行，
            *   如果这样写
            *   this.videoList[this.videoList.length - 1] = this.videoList.pop()
            *   左侧先执行，得到原数组长度的最后一位下标
            *   右侧后执行，返回原数组最后一个元素
            *   最后将右侧赋值给左侧
            *   结果就是该数组永远也不会改变
            * */
            let lastVideoItem = this.videoList.pop()
            this.videoList[this.videoList.length - 1] = lastVideoItem
          }
          this.initVideos(this.videoList[this.videoList.length - 1], this.videoList.length)
          return this.videoList
        } else {
          // 触发视频重复事件
          this.$emit('repeat-video', this.videoList.pop())
        }
        return []
      }
    },
    methods: {
      /**
       * @description 设置视频配置参数宽高
       * @return {null}
       */
      setVideoView() {
          const videoDom = document.getElementById('1videoID')
          const logoBoxDom = document.getElementById('logoBox1')
          // 初始化时取首张图片的宽度
          // 播放首个视频后，首张图片会被隐藏，宽度为0
          // 如果logoWidth已经初始化，则不再修改其宽度
          if (!this.logoWidth) this.logoWidth = logoBoxDom.clientWidth
          this.clientWidth = videoDom.clientWidth
          this.clientHeight = videoDom.clientHeight
      },
      /**
       * @description 设置分屏样式
       * @return {null}
       */
      setScreenStyle() {
        this.setVideoView()
        this.videoStyles = this.videoStyleOptions[`${this.splitScreenNum}`]
      },
      /**
       * @description 初始化多个视频源
       * @param videoMsg {Object} - 视频源对象
       * @param length {Number} - 数组下标
       * @return {null}
       */
      initVideos(videoMsg, length) {
        const videoOptions = {...this.videoOptions}
        // 不同的配置需要单独修改
        videoOptions.id = length + 'videoID'
        videoOptions.url = videoMsg.url
        videoOptions.poster = videoMsg.poster
        videoOptions.definitionList = videoMsg.definitionList
        videoOptions.screenShot = this.screenShot
        videoOptions.autoplay = this.autoplay
        videoOptions.crossOrigin = this.videoOptions
        videoOptions.download = this.download
        videoOptions.definitionActive = this.definitionActive
        videoOptions.defaultPlaybackRate = this.defaultPlaybackRate
        this.createPlayers(videoOptions, length)
      },
      /**
       * @description 初始化单个视频源
       * @param url {String} - 视频源地址
       * @return {null}
       */
      initVideo(url) {
        const videoOptions = {...this.videoOptions}
        // 不同的配置需要单独修改
        videoOptions.id = '1videoID'
        videoOptions.url = url
        videoOptions.poster = this.poster
        videoOptions.screenShot = this.screenShot
        videoOptions.autoplay = this.autoplay
        videoOptions.crossOrigin = this.videoOptions
        videoOptions.download = this.download
        videoOptions.definitionActive = this.definitionActive
        videoOptions.defaultPlaybackRate = this.defaultPlaybackRate
        this.createPlayer(videoOptions)
      },
      /**
       * @description 创建多个视频对象
       * @param options {Object} - 配置对象
       * @param length {Number} - 数组下标
       * @return {null}
       */
      createPlayers(options, length) {
        const logoBoxDom = document.getElementById(`logoBox${length}`)
        this.$nextTick(() => {
          if (this.players[length - 1]) {
            this.players[length - 1].src = options.url
          } else {
            this.players[length - 1] = this.live ? new HlsJsPlayer(options) : new Player(options)
          }
          const currPlayer = this.players[length - 1]

          // 视频加载失败时触发
          currPlayer.once('error', () => {
            this.$emit('play-error', options, this.players[length - 1].error)
          })
          currPlayer.once('play', () => {
            logoBoxDom.style.display = 'none'
          })
          this.emitDefinition(options, length)
        })
      },
      /**
       * @description 创建单个视频对象
       * @param options {Object} - 配置对象
       * @return {null}
       */
      createPlayer(options) {
        const logoBoxDom = document.getElementById(`logoBox1`)
        this.$nextTick(() => {
          if (this.player) {
            this.player.src = options.url
          } else {
            this.player = this.live ? new HlsJsPlayer(options) : new Player(options)
          }
          // 视频加载失败时触发
          this.player.once('error', () => {
            this.$emit('play-error', options, this.player.error)
          })
          this.player.once('play', () => {
            logoBoxDom.style.display = 'none'
          })
          this.emitDefinition(options, 1)
        })
      },
      /**
       * @description 触发清晰度设置
       * @param options {Object} -  配置对象
       * @param length {Number} -  数组下标
       * @return {null}
       */
      emitDefinition(options, length) {
        /*
           * 开启多个视频源清晰度切换功能，
           * 需要同时满足
           * props中的definitionList为空，
           * options中definitionList不为空,
           * 否则控制台报错。
           * 开启单个视频源则反之。
           * */
        const singleDefinitionListLen = this.definitionList ? this.definitionList.length : 0
        const multiDefinitionListLen = options.definitionList ? options.definitionList.length : 0
        if (!singleDefinitionListLen && multiDefinitionListLen) {
          // 多个视频源
          this.players[length - 1].emit('resourceReady', options.definitionList)
        } else if (singleDefinitionListLen && !multiDefinitionListLen) {
          // 单个视频源
          this.player.emit('resourceReady', this.definitionList)
        } else if (singleDefinitionListLen && multiDefinitionListLen) {
          throw new Error('不能同时传入单个和多个视频源所需要的definitionList')
        }
      },
    }
  }
</script>

<style scoped>
  .video-content {
    width: 100%;
    height: calc(100% - 40px);
    /*background-color: red;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .video-fix {
    position: relative;
    background-color: #000;
  }

  /deep/ .xgplayer-skin-default .xgplayer-definition .name {
    right: 0;
  }

  .logo-box {
    position: absolute;
    left: 50%;
    top: 50%;
  }

</style>
