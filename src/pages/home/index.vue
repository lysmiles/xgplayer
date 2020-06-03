<template>
  <div class="play-video">
    <div class="left-tree">
      摄像头切换
    </div>
    <div class="right-play">

      <div class="play-content">
        <xg-player></xg-player>
      </div>
    </div>
  </div>
</template>

<script>
  import xgPlayer from "../../components/xgPlayer";
  export default {
    name: "index",
    components:{
      xgPlayer,
    },
    data() {
      return {
        videoUrl:'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
      }
    }
  }
</script>

<style lang="less" scoped>
  .play-video {
    width: 100%;
    height: 100vh;
    display: flex;

    .left-tree {
      width: 25%;
      height: 100%;
      background-color: #f1f1f1;
    }

    .right-play {
      width: 75%;
      height: 100%;

      .play-content {
        width: 100%;
        height: 580px;
        background-color: #cecece;
      }
    }
  }
</style>
