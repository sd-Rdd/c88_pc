<template>
    <div>
        <v-header></v-header>
        <div class="main wanfaguize">
            <div class="sub_nav">
                <a href="/">首页</a>
                <em>></em>
                <a href="javascript:;">玩法规则</a>
            </div>
            <div class="wanfa_main">
                <div class="left wanfa_sub_left">
                    <div class="sub_header">
                        <i class="iconfont icon-piao"></i>所有彩票
                    </div>
                    <div class='sub_item ' v-for="(val,index) in LotteryData" :key="index" @click="change(val.id)" :class="{hover:ischecked==val.id?true:false}">
                        <a class="nav_title">
                            {{val.name}}
                            <em class="sj"></em>
                        </a>
                    </div>
                </div>
                <!-- 具体玩法介绍展示的试图区 -->
                <keep-alive>
                    <component :is="rule"></component>
                </keep-alive>
            </div>
        </div>
        <v-foot></v-foot>
        <v-body></v-body>
    </div>
</template>
<script>
import vHeader from "components/header/header";
import vBody from "components/common/body_fixed";
import vFoot from "components/footer/footer";
import rule11 from "./children/11";
import rule12 from "./children/12";
import rule13 from "./children/13";
import rule14 from "./children/14";
import rule15 from "./children/15";
import rule21 from "./children/21";
import rule22 from "./children/22";
import rule23 from "./children/23";
import rule31 from "./children/31";
import rule32 from "./children/32";
import rule41 from "./children/41";
import rule51 from "./children/51";
import rule101 from "./children/101";
import rule104 from "./children/104";
export default {
  components: {
    vHeader,
    vBody,
    vFoot,
    rule11,
    rule12,
    rule13,
    rule14,
    rule15,
    rule21,
    rule22,
    rule23,
    rule31,
    rule32,
    rule41,
    rule51,
    rule101,
    rule104
  },
  methods: {
    change(id) {
      this.rule = "rule" + id;
      this.ischecked = id;
    }
  },
  data() {
    return {
      rule: rule11, //控制具体玩法展示哪个的数据
      ischecked: 11, //控制选中的选项的样式的数据
      LotteryData: [
        { id: 41, name: "北京PK拾" },
        { id: 104, name: "香港⑥合彩" },
        { id: 21, name: "重庆时时彩" },
        { id: 51, name: "北京28" },
        { id: 22, name: "新疆时时彩" },
        { id: 23, name: "天津时时彩" },
        { id: 31, name: "安徽快3" },
        { id: 32, name: "广西快3" },
        { id: 11, name: "山东11选5" },
        { id: 13, name: "上海11选5" },
        { id: 14, name: "江西11选5" },
        { id: 12, name: "广东11选5" },
        { id: 15, name: "安徽11选5" },
        { id: 101, name: "排列三" }
      ]
    };
  },
  created() {
    if (this.$route.query.lotteryNumber) {
      this.change(this.$route.query.lotteryNumber);
    }
  }
};
</script>
<style scoped>
.wanfaguize {
  overflow: hidden;
  margin-bottom: 20px;
}

.wanfaguize .wanfa_main {
  margin-top: 10px;
}

.wanfaguize .wanfa_main .wanfa_sub_left {
  width: 131px;
  overflow: initial;
  border: 1px solid #ffe3c7;
  background: #fef7f4;
  border-radius: 5px 5px 0px 0px;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_header {
  width: inherit;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 13px;
  color: #ff6300;
  background: #ffe3c7;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_header i {
  display: inline-block;
  font-size: 17px;
  vertical-align: middle;
  margin-right: 5px;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item {
  width: inherit;
  font-size: 12px;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item .nav_title {
  width: inherit;
  line-height: 37px;
  text-align: center;
  position: relative;
  color: #333333;
  display: block;
  text-decoration: none;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item .nav_title em {
  line-height: 1px;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item .nav_title em.sj {
  display: none;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item .nav_title i {
  position: absolute;
  left: 10px;
  top: 7px;
  width: 16px;
  height: 16px;
  z-index: 9;
  font-size: 17px;
  line-height: 17px;
  color: #e94335;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item .nav_title i.icon-sub {
  display: none;
}

.wanfaguize
  .wanfa_main
  .wanfa_sub_left
  .sub_item
  .nav_title
  i.icon-tianjiaguize {
  display: block;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item .nav_list_main {
  display: none;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item.hover .nav_title,
.wanfaguize .wanfa_main .wanfa_sub_left .sub_item:hover .nav_title {
  background: #e94335;
  text-align: center;
  color: #fff;
  width: 132px;
  position: relative;
  height: 37px;
  line-height: 37px;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item.hover .nav_title em.sj,
.wanfaguize .wanfa_main .wanfa_sub_left .sub_item:hover .nav_title em.sj {
  display: block;
  position: absolute;
  background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/help_sj.png);
  top: 0px;
  right: -11px;
  width: 11px;
  height: 37px;
  background-size: 12px 38px;
  background-repeat: no-repeat;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item.hover .nav_title i,
.wanfaguize .wanfa_main .wanfa_sub_left .sub_item:hover .nav_title i {
  color: #fff;
  top: 11px;
}

.wanfaguize
  .wanfa_main
  .wanfa_sub_left
  .sub_item.hover
  .nav_title
  i.icon-tianjiaguize,
.wanfaguize
  .wanfa_main
  .wanfa_sub_left
  .sub_item:hover
  .nav_title
  i.icon-tianjiaguize {
  display: none;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item.hover .nav_title i.icon-sub,
.wanfaguize .wanfa_main .wanfa_sub_left .sub_item:hover .nav_title i.icon-sub {
  display: block;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item.hover .nav_list_main,
.wanfaguize .wanfa_main .wanfa_sub_left .sub_item:hover .nav_list_main {
  display: block;
  width: initial;
  text-align: center;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item.hover .nav_list_main li,
.wanfaguize .wanfa_main .wanfa_sub_left .sub_item:hover .nav_list_main li {
  width: inherit;
  line-height: 30px;
}

.wanfaguize .wanfa_main .wanfa_sub_left .sub_item.hover .nav_list_main li a,
.wanfaguize .wanfa_main .wanfa_sub_left .sub_item:hover .nav_list_main li a {
  width: inherit;
  color: #333333;
}

.wanfaguize
  .wanfa_main
  .wanfa_sub_left
  .sub_item.hover
  .nav_list_main
  li
  a:hover,
.wanfaguize
  .wanfa_main
  .wanfa_sub_left
  .sub_item:hover
  .nav_list_main
  li
  a:hover {
  color: red;
}

.wanfaguize .wanfa_main .wanfaguize_right {
  border: 1px solid #e94335;
  background: #fffdfa;
  width: 853px;
}

.sub_nav {
  background: #f6f6f6;
  height: 42px;
  line-height: 42px;
  padding-left: 20px;
  overflow: hidden;
  font-size: 14px;
}

.sub_nav a {
  display: inline-block;
  color: #333;
  font-size: 12px;
}

.sub_nav em {
  width: inherit;
}
.main {
  width: 1000px !important;
  margin: 0 auto;
  overflow: hidden;
}
.right {
  overflow: hidden;
  float: right;
}

.left {
  overflow: hidden;
  float: left;
}
</style>
