<template>
  <div class="play-video">
    <div class="left-tree">
      <ul>
        <li v-for="(item,i) of cameraList" :key="i" @click="chooseCamera(item,i)">
          <span :class="activeCamera == i ? 'active-camera' : ''">{{item.cameraName}}</span>
        </li>
      </ul>
    </div>
    <div class="right-play">

      <div class="play-content">
        <xg-player
          :video-url="videoUrl"
          :camera-id="cameraId"
          :camera-name="cameraName"
          :dan-mu="danMu"
          :play-type="playType"
          :pip="true"
        >

        </xg-player>
      </div>
    </div>
  </div>
</template>

<script>
  import xgPlayer from "../../components/xgPlayer/xgPlayer";

  export default {
    name: "index",
    components: {
      xgPlayer,
    },
    data() {
      return {
        videoUrl: '',
        cameraId: '',
        playType:'live',
        cameraList: [
          {
            cameraId: '1001',
            cameraName: '一楼办公室右侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              // comments: [
              //   {
              //     duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
              //     id: '1', //弹幕id，需唯一
              //     start: 3000, //弹幕出现时间，毫秒
              //     txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
              //   },
              //   {
              //     duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
              //     id: '2', //弹幕id，需唯一
              //     start: 3500, //弹幕出现时间，毫秒
              //     txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
              //   },
              //
              // ]

            },

          },
          {
            cameraId: '1002',
            cameraName: '一楼办公室左侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          },
          {
            cameraId: '1003',
            cameraName: '二楼办公室左侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          },
          {
            cameraId: '1004',
            cameraName: '一楼办公室右侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          },
          {
            cameraId: '1005',
            cameraName: '三楼办公室左侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          }, {
            cameraId: '1006',
            cameraName: '三楼办公室右侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          },
          {
            cameraId: '1007',
            cameraName: '四楼办公室左侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          },
          {
            cameraId: '1008',
            cameraName: '四楼办公室右侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          }, {
            cameraId: '1009',
            cameraName: '五楼办公室左侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          }, {
            cameraId: '1010',
            cameraName: '五楼办公室右侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          },
          {
            cameraId: '1011',
            cameraName: '六楼办公室左侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          }, {
            cameraId: '1012',
            cameraName: '六楼办公室右侧',
            cameraUrl: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
            danmu: {
              comments: [
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '1', //弹幕id，需唯一
                  start: 3000, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },
                {
                  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                  id: '2', //弹幕id，需唯一
                  start: 3500, //弹幕出现时间，毫秒
                  txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
                },

              ]

            },
          }

        ],
        activeCamera: '',
        cameraName: '',
        danMu:{}
      }
    },
    mounted() {

    },
    methods: {
      chooseCamera(list, index) {
        this.activeCamera = index
        this.videoUrl = list.cameraUrl
        this.cameraId = list.cameraId
        this.cameraName = list.cameraName
        this.danMu = list.danmu
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
        height: 580px;
        /*background-color: #cecece;*/
      }

    }
  }
</style>
