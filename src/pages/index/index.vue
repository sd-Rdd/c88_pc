<template>
  <div class="container">
    <v-header></v-header>
    <v-body></v-body>
    <!-- 上部分 -->
    <div class="banner">
      <index_1></index_1>
    </div>

    <div class="main index">
      <div class="count-down cp_game" style="display: inline-block">
        <index_9></index_9>
      </div>
      <div class="index_main">
        <div class="slide">
          <div class="cp_title">
            <h1>
              <i class="ic-ttHot"></i>
              热门活动
              <a  @click="gotoActivityPage">/ 更多</a>
            </h1>
            <div class="clear"></div>
          </div>
          <div style="width: 420px;height: 215px;overflow: hidden;">
            <index_10></index_10>
          </div>
        </div>
        <div class="index_box_tz">
          <div>
            <index_8></index_8>
          </div>
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="index">
      <div class="index_box_main main">
        <div class="left phb">
          <index_7></index_7>
        </div>
      </div>
    </div>
    <v-foot></v-foot>
  </div>
</template>
<script>
  import index_1 from './children/index_1';
  import index_2 from './children/index_2';
  import index_3 from './children/index_3';
  import index_4 from './children/index_4';
  import index_5 from './children/index_5';
  import index_6 from './children/index_6';
  import index_7 from './children/index_7';
  import index_8 from './children/index_8';
  import index_9 from './children/index_9';
  import index_10 from './children/index_10';
  import vHeader from 'components/header/header'
  import vBody from 'components/common/body_fixed'
  import vFoot from 'components/footer/footer'
  export default {
    components: {
      index_1,
      index_2,
      index_3,
      index_4,
      index_5,
      index_6,
      index_7,
      index_8,
      index_9,
      index_10,
      vHeader,
      vBody,
      vFoot
    },
    data() {
      return {}
    },
    methods :{
      gotoActivityPage(){
        this.$router.push({path:'/activity'})
      }
    }
  }
</script>
<style lang="less" scoped>
  .container {
    background: #fffaf7 url(../../assets/image/skin-img06.jpg) no-repeat center top;
  }

  .main {
    width: 980px !important;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
    .cp_game {
      margin: 20px;
      img {
        width: 980px;
        height: 240px;
      }
    }
  }

  .banner {
    width: 980px;
    height: 240px;
    margin: 10px auto 0;
    box-shadow: 0 0 9px 0 #ccc;
  }

  .index .index_main {
    width: 420px;
    float: right;
    margin: 20px;
    margin-left: 0;
  }

  .left,
  .right {
    overflow: hidden;
    float: left;
  }

  .index .index_main .slide {
    overflow: hidden;
    .cp_title {
      margin-bottom: 12px;
      h1{
        font-size: 18px;
        height: 27px;
      }
      i {
        display: inline-block;
        font-style: normal;
        font-weight: normal;
        line-height: 1;
        background-image: url(../../assets/image/icon.png);
        background-repeat: no-repeat;
        vertical-align: -2px;
      }
      .ic-ttHot {
        width: 21px;
        height: 21px;
        background-position: -106px -26px;
      }
      a {
        font-size: 14px;
        color: #888;
      }
    }
  }

  .index .index_main .index_box_tz {
    height: 302px;
    overflow: hidden;
    margin-top: 10px;
  }

  .index .index_main .index_box_tz .tz_box {
    overflow: hidden;
    width: 493px;
    height: 272px;
  }

  .left {
    overflow: hidden;
    float: left;
  }

  .right {
    overflow: hidden;
    float: right;
  }

  .index .index_main .index_box_tz .down_mobile_app {
    overflow: hidden;
    width: 240px;
    height: 271px;
  }

  .index .index_box_main {
    overflow: hidden;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  .index .index_box_main .kj {
    overflow: hidden;
    width: 248px;
    margin-right: 10px;
  }

  .index .index_box_main .news {
    overflow: hidden;
    width: 495px;
  }

  .index .index_box_main .phb {
    overflow: hidden;
    margin-left: 6px;
    padding-bottom: 2px;
  }
</style>
