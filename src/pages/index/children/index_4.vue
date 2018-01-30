<template>
  <div class="down_mobile_app">
    <div class="head">
      <i class="iconfont icon-shouji"></i>
      手机客户端下载
    </div>

    <div class="down_app">
      <div class="left app-l" id="IphoneA" v-show="qr==1">
        <img src="../../../assets/image/ios-100.png" width="100" height="100" alt="苹果二维码">
      </div>

      <div class="left app-l" id="AndroidA" v-show="qr==2">
        <img src="../../../assets/image/Android-100.png" width="100" height="100" alt="安卓二维码">
      </div>

      <div class="right app-r">

        <li @click="changeQr(1)">
          <i class="iconfont icon-apple"></i>
          <a  class="IphoneA">Iphone 版</a>
        </li>

        <li @click="changeQr(2)">
          <i class="iconfont icon-anzhuo"></i>
          <a  class="AndroidA">Android 版</a>
        </li>

        <li>
          <router-link to="/mobile">更多方式</router-link>
        </li>

      </div>
    </div>

    <div class="tab down_box_notice">

      <div class="down_box_notice" id="down_box_notice">
        <ul class="down_box_notice_tab" id="down_box_notice_tab">
          <li :class="{'current':Menu==1}" @mouseenter="changeMenu(1)">网站公告</li>
          <li :class="{'current':Menu==2}" @mouseenter="changeMenu(2)">新手指导</li>
        </ul>
        <div class="down_box_notice_content" id="down_box_notice_content">
          <ul v-show="Menu==1">
            <li v-for="item in data" :key="item.index" style="line-height:25px;">
              <router-link :to="{name:'noticeDetail',params:{id:item.id}}">{{item.title}}</router-link>
            </li>
          </ul>
          <ul v-show="Menu==2">
            <li>
              <router-link :to="{name:'helpList',params:{'listId':51}}">如何注册成为会员</router-link>
            </li>
            <li>
              <router-link :to="{name:'helpList',params:{'listId':229}}">忘记登录密码了怎么办</router-link>
            </li>
            <li>
              <router-link :to="{name:'helpList',params:{'listId':57}}">充值要手续费吗</router-link>
            </li>
          </ul>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      qr: 1,
      Menu: 1,
      data: []
    };
  },
  methods: {
    changeQr(a) {
      this.qr = a;
    },
    changeMenu(a) {
      this.Menu = a;
    },
    getGonggao() {
      this.$http.post("/index/advert",{}).then(res => {
        if (res.data.status == 200) {
          this.data = res.data.advert;
        }
      });
    }
  },
  created() {
    this.getGonggao();
  }
};
</script>
<style scoped>
.down_mobile_app .head {
  overflow: hidden;
  background: #f7f7f7;
  color: #333333;
  line-height: 40px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
}

.down_mobile_app .head i {
  overflow: hidden;
  vertical-align: middle;
  font-size: 19px;
}

.down_mobile_app .down_app {
  overflow: hidden;
  border-top: 1px solid #ddd;
  padding-top: 8px;
  padding-bottom: 5px;
}

.down_mobile_app .down_app .app-l {
  overflow: hidden;
  width: 115px;
  text-align: center;
}

.down_mobile_app .down_app .app-l img {
  overflow: hidden;
}

.down_mobile_app .down_app .app-r {
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 123px;
}

.down_mobile_app .down_app .app-r li {
  overflow: hidden;
  font-size: 14px;
  text-align: left;
  line-height: 29px;
  height: 29px;
}

.down_mobile_app .down_app .app-r li i {
  overflow: hidden;
  color: #666666;
  margin-left: 0px;
}

.down_mobile_app .down_app .app-r li a {
  color: #333339;
  overflow: hidden;
}

.down_mobile_app .down_app .app-r li a:hover {
  color: #e94335;
}

.down_mobile_app .down_app .app-r li a:hover {
  overflow: hidden;
}

.down_mobile_app .down_box_notice {
  overflow: hidden;
}

.down_mobile_app .down_box_notice ul {
  overflow: hidden;
}

.down_mobile_app .down_box_notice ul.down_box_notice_tab {
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #ddd;
  margin-top: 5px;
}

.down_mobile_app .down_box_notice ul.down_box_notice_tab li {
  overflow: hidden;
  float: left;
  width: 100px;
  text-align: center;
  font-size: 14px;
  margin-left: 5px;
  padding-right: 5px;
  cursor: pointer;
}

.down_mobile_app .down_box_notice ul.down_box_notice_tab li.current {
  overflow: hidden;
  color: #e94335;
  border-bottom: 2px solid #e94335;
  padding-bottom: 11px;
}

.down_mobile_app .down_box_notice .down_box_notice_content {
  overflow: hidden;
  padding-left: 11px;
  line-height: 23px;
  margin-top: 4px;
}

.down_mobile_app .down_box_notice .down_box_notice_content ul {
  overflow: hidden;
}

.down_mobile_app .down_box_notice .down_box_notice_content ul li {
  overflow: hidden;
}

.down_mobile_app .down_box_notice .down_box_notice_content ul li a {
  overflow: hidden;
  color: #333;
  font-size: 12px;
  line-height: 23px;
}

.down_mobile_app .down_box_notice .down_box_notice_content ul li a:hover {
  overflow: hidden;
}
.left {
  overflow: hidden;
  float: left;
}
.right {
  overflow: hidden;
  float: right;
}
</style>
