<template>
  <div class="hello">
    <div id="videoId">

    </div>
  </div>
</template>

<script>

  import Player from 'xgplayer';

  export default {
    name: 'HelloWorld',
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
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
