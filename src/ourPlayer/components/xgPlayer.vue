<template>
  <div class="video-content">
    <!--

    在模板中使用计算属性localVideoList，目的只是能触发逻辑，界面上不用出现，所以隐藏起来
    如果使用监听选项watch，监听传入的视频数组，因为代码中包含改变数组的逻辑，整块watch代码会无限循环

    -->
    <p style="display: none;">{{localVideoList.length}}</p>
    <div class="video-fix" :style="videoStyles" v-for="item of splitScreenNum" :key="item" :id="item + 'videoID'"></div>
  </div>
</template>

<script>
  import Player from 'xgplayer'
  // import 'xgplayer-mp4'
  import 'xgplayer'
  import HlsJsPlayer from 'xgplayer-hls.js'
  // import '../assets/css/.xgplayer/skin/index.js'

  export default {
    name: "xgPlayer",
    props: {
      /**
       * 是否为直播(默认支持)
       * */
      live: {
        type: Boolean,
        default: true
      },
      /**
       * 是否支持截屏（默认支持）
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
       * 是否支持下载 （默认支持）
       * */
      download: {
        type: Boolean,
        default: true
      },
      /**
       * 是否支持画中画 （默认支持）
       * */
      pip: {
        type: Boolean,
        default: false
      },
      /**
       *  分屏数
       * */
      splitScreen: {
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
       * 清晰度数据
       */
      definitionList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        // 单个播放器对象
        player: null,
        // 播放器实例对象数组
        players: [],
        clientWidth: '',
        clientHeight: '',
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
          screenShot: true,// 是否开启截图
          playsinline: true, // 该选项在手机观看时，是否开启ios和微信的内联模式
          autoplay: true, // 是否自动播放
          crossOrigin: true, // 是否跨域
          download: true, //是否下载视频
          pip: true, // 是否开启画中画
          definitionActive: 'hover', // 修改清晰度控件的触发方式
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
        this.initVideo(val)
      }
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
        this.clientWidth = videoDom.clientWidth
        this.clientHeight = videoDom.clientHeight
      },
      /**
       * @description 设置分屏样式
       * @return {null}
       */
      setScreenStyle() {
        this.setVideoView()
        this.$nextTick(() => {
          this.videoStyles = this.videoStyleOptions[`${this.splitScreenNum}`]
        })
      },
      /**
       * @description 初始化多个视频源
       * @param cameraMsg {Object} - 视频源对象
       * @param length {Number} - 数组下标
       * @return {null}
       */
      initVideos(cameraMsg, length) {
        const videoOptions = {...this.videoOptions}
        // 不同的配置需要单独修改
        videoOptions.id = length + 'videoID'
        videoOptions.url = cameraMsg.url
        videoOptions.definitionList = cameraMsg.definitionList
        // 传入的清晰度列表
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
        this.createPlayer(videoOptions)
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
           * 否则控制台报错
           *
           * */
        const singleDefinitionListLen = this.definitionList.length
        const multiDefinitionListLen = options.definitionList.length
        if (!singleDefinitionListLen && multiDefinitionListLen) {
          this.players[length - 1].emit('resourceReady', options.definitionList)
        } else if (singleDefinitionListLen && !multiDefinitionListLen) {
          this.player.emit('resourceReady', this.definitionList)
        } else if (singleDefinitionListLen && multiDefinitionListLen) {
          throw new Error('不能同时传入单个和多个视频源所需要的definitionList')
        }
      },
      /**
       * @description 创建多个视频对象
       * @param options {Object} - 配置对象
       * @param length {Number} - 数组下标
       * @return {null}
       */
      createPlayers(options, length) {
        this.$nextTick(() => {
          const currPlayer = this.players[length - 1]
          if (currPlayer) {
            currPlayer.src = options.url
          } else {
            this.players[length - 1] = this.live ? new HlsJsPlayer(options) : new Player(options)
          }
          // 视频加载失败时触发
          this.players[length - 1].once('error', () => {
            this.$emit('play-error', options)
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
        this.$nextTick(() => {
          if (this.player) {
            this.player.src = options.url
          } else {
            this.player = this.live ? new HlsJsPlayer(options) : new Player(options)
          }
          // 视频加载失败时触发
          this.player.once('error', () => {
            this.$emit('play-error', options)
          })
          this.emitDefinition(options, 1)
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .video-content {
    width: 100%;
    height: calc(100% - 40px);
    /*background-color: red;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .video-fix {
      background-color: #000;
    }

  }

</style>
