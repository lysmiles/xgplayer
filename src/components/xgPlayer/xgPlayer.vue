<template>
  <div class="hello">
    <div class="grid-content">
      <i class="iconfont icon-fenpingfangshi2" title="一屏" @click="chooseSplitScreen(1)"></i>
<!--      <i class="iconfont icon-fenpingfangshi5" title="二屏" @click="chooseSplitScreen(2)"></i>-->
      <i class="iconfont icon-fenpin2" title="四屏" @click="chooseSplitScreen(4)"></i>
      <i class="iconfont icon-fenpingfangshi" title="九屏" @click="chooseSplitScreen(9)"></i>
      <i class="iconfont icon-fenpingfangshi1" title="十六屏" @click="chooseSplitScreen(16)"></i>
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
        default: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
      },
      /**
       * 视频 ID (唯一值，必填项)
       * */
      // videoId: {
      //   type: String,
      //   default: ''
      // },
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
        videoStyles: ''

      }
    },
    created() {

    },
    mounted() {
      this.setScreenStyle()
      this.initXGPlayer()

      // if (this.splitScreen == 1) {
      //   this.videoStyles = 'width:100%;height:100%'
      // } else if (this.splitScreen == 2) {
      //   this.videoStyles = 'width:50%;height:100%'
      // } else if (this.splitScreen == 4) {
      //   this.videoStyles = 'width:50%;height:50%'
      // } else if (this.splitScreen == 9) {
      //   this.videoStyles = 'width:33%;height:33%'
      // } else if (this.splitScreen == 16) {
      //   this.videoStyles = 'width:25%;height:25%'
      // }

    },
    methods: {
      /**
       * 切换分屏
       * */
      chooseSplitScreen(num) {
        this.splitScreen = num
        this.setScreenStyle()
        // this.initXGPlayer()
      },
      setScreenStyle(){
        if (this.splitScreen == 1) {
          this.videoStyles = 'width:100%;height:100%'
        }  else if (this.splitScreen == 4) {
          this.videoStyles = 'width:49%;height:49%;'
        } else if (this.splitScreen == 9) {
          this.videoStyles = 'width:33%;height:33%;'
        } else if (this.splitScreen == 16) {
          this.videoStyles = 'width:24%;height:24%;'
        }
      },
      /**
       * 初始化视频
       * */
      initXGPlayer() {

        for (let n = 1; n <= this.splitScreen; n++) {
            this.player = new Player({
              id:n+'videoID',
              url: this.videoUrl,
              // width: 500,
              // height: 300,
              screenShot: this.screenShot,
              playsinline: true,
              download: this.download,
              pip: this.pip,
              fitVideoSize:'auto'
            });
          }



        // }
        // console.log(videoID, 'videoID')

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
      justify-content: space-between;

      .video-fix {
        background-color: #ccc;
        /*width: 50%;*/
        /*height: 50%;*/
        /*padding: 10px;*/
      }

    }
  }

</style>
