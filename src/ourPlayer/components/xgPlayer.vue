<template>
  <div class="video-content">
    <div class="video-fix" :style="videoStyles" v-for="item of splitScreenNum" :key="item" :id="item + 'videoID'"></div>
  </div>
</template>

<script>
  import Player from 'xgplayer'
  import 'xgplayer'
  import HlsJsPlayer from 'xgplayer-hls.js'

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
        }
      },
      /**
       *  视频数据
       * */
      videoList: {
        type: Array,
        default() {
          return [
            {
              cameraId: 1,
              cameraName: '',
              cameraUrl: '',
            }
          ]
        }
      }
    },
    data() {
      return {
        // 播放器实例对象
        player: null,
        chooseCameraId: '',
        videoStyles: '',
        clientWidth: '',
        clientHeight: '',
        videoStyleOptions: {
          1: 'width:100% !important;height:100% !important',
          4: 'width:49% !important;height:49% !important;',
          9: 'width:33%;height:33%;',
          16: 'width:24%;height:24%;',
        }
      }
    },
    watch: {
      /**
       * 监听分屏数变化
       */
      splitScreen(val) {
          this.chooseSplitScreen()
      },
      /**
       * 监听视频列表
       */
      videoList(val) {
        let len = val.length
        this.initXGPlayer(val[len - 1], len)
      }

    },
    mounted() {
      this.setScreenStyle()
      // this.setSix()
    },
    computed: {
      splitScreenNum() {
        if (this.splitScreen === 1 || this.splitScreen === 4 || this.splitScreen === 9 || this.splitScreen === 16) {
          return this.splitScreen
        } else {
          return 1
        }
      }
    },
    methods: {
      setSix() {
        window.onload = () => {
          this.clientWidth = document.getElementById('1videoID').clientWidth
          this.clientHeight = document.getElementById('1videoID').clientHeight
        }
      },
      /**
       * 数据筛选
       * */
      filterData(val) {
        if (this.videoList && this.videoList.length <= 0) {
          let obj = {
            cameraId: val,
            videoUrl: this.videoUrl,
            cameraName: this.cameraName
          }
          this.videoList.push(obj)
        } else {
          if (this.videoList.length >= this.splitScreenNum) {
            let index = this.videoList.length - (this.splitScreenNum - 1)
            this.videoList.splice((this.splitScreenNum - 1), index)
            // this.player.destroy()
            let obj = {
              cameraId: val,
              videoUrl: this.videoUrl,
              cameraName: this.cameraName
            }
            this.videoList.push(obj)
          } else if (this.videoList.length < this.splitScreenNum) {
            let obj = {}
            this.videoList.map((item, i) => {
              if (val !== item.cameraId) {
                obj.cameraId = val
                obj.videoUrl = this.videoUrl
                obj.cameraName = this.cameraName
              }
            })
            this.videoList.push(obj)
          }
        }
        let lastCamera = this.videoList.slice(-1)
        if (lastCamera[0].videoUrl && lastCamera[0].videoUrl !== '') {
          this.initXGPlayer(lastCamera[0], this.videoList.length)
        }
        this.setScreenStyle()

      },
      /**
       * 切换分屏
       * */
      chooseSplitScreen() {
        // 改变dom样式
        this.$nextTick(() => {
          this.setScreenStyle()
        })
        // this.setSix()
        if (this.videoList.length > this.splitScreenNum) {
          let index = this.videoList.length - (this.splitScreenNum)
          this.videoList.splice((this.splitScreenNum), index)
          // this.player.destroy()
        }
        // this.initXGPlayer()
      },
      /**
       * 设置屏幕样式
       * */
      setScreenStyle() {
          this.videoStyles = this.videoStyleOptions[`${this.splitScreenNum}`]
      },
      /**
       * 初始化视频
       * */
      initXGPlayer(cameraMsg, length) {

        // 直播为m3u8格式视频
        if (this.live) {
          // 创建直播流参数
          const liveStreamOptions = {
            id: length + 'videoID',
            url: cameraMsg.cameraUrl,
            width: this.clientWidth,
            height: this.clientHeight,
            screenShot: this.screenShot,//截图
            playsinline: true,
            autoplay: true,
            crossOrigin: false, //是否跨域
            download: this.download, //下载视频
            pip: this.pip, //画中画
            area: {
              start: 0,
              end: 1
            },
            closeDefaultBtn: false,
            defaultOff: false,
            panel: false
          }
          // 如果分屏数为 1，那么切换视频时在当前容器进行修改
          if (this.splitScreenNum === 1) {
            // player实例已初始化时，先销毁该实例
            if (this.player) this.player.destroy()
            liveStreamOptions.id = '1videoID'
          }
          this.$nextTick(() => {
            this.player = new HlsJsPlayer(liveStreamOptions);
          })

        } else {
          // 创建视频参数
          const videoOptions = {
            id: length + 'videoID',
            url: cameraMsg.cameraUrl,
            width: this.clientWidth,
            height: this.clientHeight,
            screenShot: this.screenShot,
            playsinline: true,
            autoplay: true,
            crossOrigin: false,
            download: this.download,
            playbackRate: [0.5, 0.75, 1, 1.5, 2],//倍速播放列表
            defaultPlaybackRate: 1,//默认倍速
            pip: this.pip,
            area: {
              start: 0,
              end: 1
            },
            closeDefaultBtn: false,
            defaultOff: false,
            panel: false
          }
          // 如果分屏数为 1，那么切换视频时在当前容器进行修改
          if (this.splitScreenNum === 1) {
            videoOptions.id = '1videoID'
          }
          // 视频为mp4格式视频
          this.$nextTick(() => {
            this.player = new Player(videoOptions);
          })

        }

      }


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
