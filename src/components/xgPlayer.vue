<template>
  <div class="hello">
    <div class="grid-content">
      <i class="iconfont icon-fenpingfangshi2" title="一屏"></i>
      <i class="iconfont icon-fenpingfangshi5" title="二屏"></i>
      <i class="iconfont icon-fenpin2" title="四屏"></i>
      <i class="iconfont icon-fenpingfangshi" title="九屏"></i>
      <i class="iconfont icon-fenpingfangshi1" title="十六屏"></i>
    </div>
    <div class="video-content">
      <div id="videoId"></div>
    </div>

  </div>
</template>

<script>

  import Player from 'xgplayer';

  export default {
    name: 'xg-player',
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
      videoId: {
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
      pip:{
        type:Boolean,
        default:true
      }


    },
    data() {
      return {
        player: '',

      }
    },
    created() {

    },
    mounted() {
      this.player = new Player({
        id: 'videoId',
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
        // url: 'rtsp://Inphase:2KE496r8a@182.145.195.233:9500/DevCode=08201021122A584E400/DevAor=08201021122A584E400/StreamIndex=0',
        height: 340,
        width: 600,
        screenShot: true,
        playsinline: true,
        whitelist: [],
        danmu: {
          comments: [
            {
              duration: 15000,
              id: "2",
              start: 3000,
              txt: "长弹幕长弹幕长弹幕",
              mode: "top"
            },
          ],
          area: {
            start: 0,
            end: 1
          },
          closeDefaultBtn: false,
          defaultOff: false,
          panel: false
        },


      });
    },
    methods: {
      initXGPlayer() {

      }
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
    }
  }

</style>
