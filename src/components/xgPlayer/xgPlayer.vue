<template>
  <div class="hello">
    <div class="grid-content">
      <i class="iconfont icon-fenpingfangshi2" title="一屏" @click="chooseSplitScreen(1)"></i>
      <!--      <i class="iconfont icon-fenpingfangshi5" title="二屏" @click="chooseSplitScreen(2)"></i>-->
      <i class="iconfont icon-fenpin2" title="四屏" @click="chooseSplitScreen(4)"></i>
      <i class="iconfont icon-fenpingfangshi" title="九屏" @click="chooseSplitScreen(9)"></i>
      <i class="iconfont icon-fenpingfangshi1" title="十六屏" @click="chooseSplitScreen(16)"></i>
      {{clientHeight}}
      {{clientWidth}}
    </div>
    <div class="video-content">

      <div class="video-fix" :style="videoStyles" v-for="item of splitScreen" :key="item" :id="item + 'videoID'"></div>
    </div>

  </div>
</template>

<script>
  import Player from 'xgplayer';

  export default {
    name: "xgPlayer",
    props: {
      /**
       * 视频 URL地址 （必填项）
       * */
      videoUrl: {
        type: String,
        default: ''
      },
      /**
       * 视频 ID (唯一值，必填项)
       * */
      cameraId: {
        type: String,
        default: ''
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
      }


    },
    data() {
      return {
        player: '',
        splitScreen: 4,
        videoStyles: '',
        cameraList: [],
        clientWidth: '',
        clientHeight: ''
      }
    },
    created() {

    },
    watch: {
      'cameraId'(val) {
        if (val) {

          this.filterData(val)
        }
      }
    },
    mounted() {
      this.setScreenStyle()
      // this.setSix()

    },
    methods: {
      setSix(){
        window.onload = () => {
          this.clientWidth = document.getElementById('1videoID').clientWidth
          this.clientHeight = document.getElementById('1videoID').clientHeight
        }
      },
      /***
       * 数据筛选
       * */
      filterData(val) {
        if (this.cameraList && this.cameraList.length <= 0) {
          let obj = {
            cameraId: val,
            videoUrl: this.videoUrl
          }
          this.cameraList.push(obj)
        } else {
          if (this.cameraList.length >= this.splitScreen) {
            let index = this.cameraList.length - (this.splitScreen - 1)
            this.cameraList.splice((this.splitScreen - 1), index)
            this.player.destroy()
            let obj = {
              cameraId: val,
              videoUrl: this.videoUrl
            }
            this.cameraList.push(obj)
          } else if (this.cameraList.length < this.splitScreen) {
            let obj = {}
            this.cameraList.map((item, i) => {
              if (val !== item.cameraId) {
                obj.cameraId = val
                obj.videoUrl = this.videoUrl
              }

            })
            this.cameraList.push(obj)
          }

        }
        let lastCamera = this.cameraList.slice(-1)
        if (lastCamera[0].videoUrl && lastCamera[0].videoUrl !== '') {
          this.initXGPlayer(lastCamera[0], this.cameraList.length)
        }
        this.setScreenStyle()

      },
      /**
       * 切换分屏
       * */
      chooseSplitScreen(num) {
        this.splitScreen = num
        this.setScreenStyle()
        this.setSix()
        if (this.cameraList.length > this.splitScreen) {
          let index = this.cameraList.length - (this.splitScreen)
          this.cameraList.splice((this.splitScreen), index)
          this.player.destroy()
        }
        // this.initXGPlayer()
      },
      setScreenStyle() {
        if (this.splitScreen == 1) {
          this.videoStyles = 'width:100% !important;height:100% !important'
        } else if (this.splitScreen == 4) {
          this.videoStyles = 'width:49% !important;height:49% !important;'
        } else if (this.splitScreen == 9) {
          this.videoStyles = 'width:33%;height:33%;'
        } else if (this.splitScreen == 16) {
          this.videoStyles = 'width:24%;height:24%;'
        }


        // for (let n = 1; n <= this.splitScreen; n++) {
        //   let obj = {
        //     cameraId: '',
        //     url: '',
        //   }
        //   this.cameraList.push(obj)
        // }
      },
      /**
       * 初始化视频
       * */
      initXGPlayer(cameraMsg, length) {
        this.player = new Player({
          id: length + 'videoID',
          url: cameraMsg.videoUrl,
          width: this.clientWidth,
          height: this.clientHeight,
          screenShot: this.screenShot,
          playsinline: true,
          autoplay: true,
          download: this.download,
          pip: this.pip,
        });

        // this.cameraList.map((item, i) => {
        //   if (item.videoUrl && item.videoUrl !== '') {
        //
        //     // console.log(width, 'width')
        //
        //   }
        //
        // })
        //
        // console.log(this.player, 'player')
        // // }
        // console.log(this.cameraList, 'videoID')

      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .hello {
    width: 100%;
    height: 100%;

    .grid-content {
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        margin: 0 10px;
        cursor: pointer;
      }
    }

    .video-content {
      width: 100%;
      height: calc(100% - 40px);
      /*background-color: red;*/
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .video-fix {
        background-color: #ccc;
        /*width: 50%;*/
        /*height: 50%;*/
        /*padding: 10px;*/
      }

    }
  }

</style>
