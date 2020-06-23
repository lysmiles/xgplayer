<template>
  <div class="demo">
    <div class="left-tree">
      <ul>
        <li v-for="item of videoData" :key="item.id" @click="chooseCamera(item)">
          <span>{{item.cameraName}}</span>
        </li>
      </ul>
    </div>

    <div class="right-play">
      <div class="grid-content">
        <div>
          <i class="iconfont icon-fenpingfangshi2" title="一屏" @click="chooseSplitScreen(1)"></i>
          <i class="iconfont icon-fenpin2" title="四屏" @click="chooseSplitScreen(4)"></i>
          <i class="iconfont icon-fenpingfangshi" title="九屏" @click="chooseSplitScreen(9)"></i>
          <i class="iconfont icon-fenpingfangshi1" title="十六屏" @click="chooseSplitScreen(16)"></i>
        </div>
      </div>
      <div class="play-content">
        <!--多个视频源测试-->
        <xg-player
          :live="live"
          :split-screen="splitScreen"
          :video-list="videoList"
          :pip="true"
          @repeat-video="onRepeatVideo"
          @play-error="onPlayError"
        />
        <!--单个视频源测试-->
        <!--<xg-player
          :live="live"
          :pip="true"
          :video-url="url"
          :definition-list="definitionList"
        />-->

      </div>
    </div>
  </div>

</template>

<script>
  // 引入西瓜视频组件
  import xgPlayer from '../components/xgPlayer'
  // 测试视频数据
  import m3u8VideoData from '../assets/data/m3u8VideoData'
  import mp4VideoData from '../assets/data/mp4VideoData'
  export default {
    name: "demo",
    components: {
      xgPlayer
    },
    data() {
      return {
        url: 'http://222.213.16.51:8050/M3u8File?01104849A400571E500_01104849A400571E500_1591160434_1591160499.m3u8',
        live: false,
        splitScreen: 1,
        // 与播放器内部数据数组指向同一地址
        videoList: [],
        // 测试视频数据
        videoData: [],
        // 单个视频清晰度数据
        definitionList: [
           {name: '高清', url: 'http://222.213.16.51:8050/M3u8File?01104849A400571E500_01104849A400571E500_1591257957_1591258080.m3u8'},
           {name: '超清', url: 'http://222.213.16.51:8050/M3u8File?01104849A400571E500_01104849A400571E500_1591160434_1591160499.m3u8'}
        ]
      }
    },
    created() {
        // this.videoData = m3u8VideoData
        this.videoData = mp4VideoData
    },
    methods: {
      /**
       * @description 切换分屏数
       * @param num {Number} - 分屏数
       * @return {null}
       */
      chooseSplitScreen(num) {
        this.splitScreen = num
      },
      /**
       * @description 选择播放视频
       * @param item {Object} -  视频对象
       * @return  {null}
       */
      chooseCamera(item) {
        // 多个视频源播放
        this.videoList.push(item)
        // 单个视频源切换
        // this.url = item.url
      },
      /**
       * @description 处理视频重复
       * @param repeatItem {Object} - 重复的视频对象
       * @return  {null}
       */
      onRepeatVideo(repeatItem) {
        console.log(repeatItem)
      },
      /**
       * @description 处理视频播放错误
       * @param currItem {Object} - 出错的当前视频配置对象
       * @return {null}
       */
      onPlayError(currItem) {
        console.log(currItem)
      }
    },
  }
</script>

<style lang="less" scoped>
  .demo {
    width: 100%;
    height: 100vh;
    display: flex;

    .left-tree {
      width: 15%;
      height: 100%;
      background-color: #f1f1f1;

      ul {
        .active-camera {
          color: #669ff3;
        }

        li {
          height: 35px;
          line-height: 35px;

          span {
            cursor: pointer;
          }
        }
      }
    }

    .right-play {
      width: 85%;
      height: 100%;

      .play-content {
        width: 100%;
        height: 100vh;
        /*background-color: #cecece;*/
      }

    }
  }
</style>
