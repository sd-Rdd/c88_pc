<template>
    <div class="lottery-main" style="margin-bottom: 120px">
        <bet-header headRight="three" :cha="cha" @onGetData="getData"></bet-header>
        <div  style="display: table;position: relative">
          <div style="background: #fff;min-height: auto;width: 760px;margin-right: 10px;float: left;display: table-cell;padding-bottom: 16px;overflow:hidden;">
            <!-- 选玩法部分 -->
            <div class="lhc-play-choice animated shake">
              <div class="false" v-for="(val,index) in lotteryCodeList" :key="index" :class="{'play-selected':val.codeNo==currentId}" @click="changeId(val.codeNo)" v-if="val.isEnable==0">{{val.codeName}}</div>

            </div>
            <!-- 选玩法部分结束 -->
            <component :is="subPlayCop" :sublotteryCode="sublotteryCode"></component>
          </div>

          <div class="lotteryRight" style="overflow: hidden;    height:100%; position: absolute;
    top: 0;right: -210px;">
            <h3 class="re">
              <span>近期开奖</span>
            </h3>
            <div class="recentCon">
              <ul>
                <li>
                  <start-lotto3></start-lotto3>
                </li>
              </ul>
            </div>
          </div>
        </div>


    </div>
</template>
<script>
import betHeader from "../betComponents/bet_head";
import subPlay01 from "../betComponents/lhc/1";
import subPlay02 from "../betComponents/lhc/2";
import subPlay03 from "../betComponents/lhc/3";
import subPlay04 from "../betComponents/lhc/4";
import subPlay05 from "../betComponents/lhc/5";
import subPlay06 from "../betComponents/lhc/6";
import subPlay07 from "../betComponents/lhc/7";
import subPlay08 from "../betComponents/lhc/8";
import subPlay09 from "../betComponents/lhc/9";
import subPlay10 from "../betComponents/lhc/10";
import subPlay11 from "../betComponents/lhc/11";
import subPlay12 from "../betComponents/lhc/12";
import subPlay13 from "../betComponents/lhc/13";
import subPlay14 from "../betComponents/lhc/14";
import subPlay15 from "../betComponents/lhc/15";
import subPlay16 from "../betComponents/lhc/16";
import startLotto3 from '../betComponents/startlotto3'
import tools from 'tools/tools.js';
export default {
  components: {
    betHeader,
    subPlay01,
    subPlay02,
    subPlay03,
    subPlay04,
    subPlay05,
    subPlay06,
    subPlay07,
    subPlay08,
    subPlay09,
    subPlay10,
    subPlay11,
    subPlay12,
    subPlay13,
    subPlay14,
    subPlay15,
    subPlay16,
    startLotto3
  },
  data() {
    return {
      lotteryCodeList: [], //接口回来的玩法数据
      sublotteryCode: {}, //过滤接口返回来的数据
      currentId: "01", //控制一级玩法的样式显示
      subPlayCop: subPlay01, //控制显示子玩法组件
      cha: null
    };
  },
  methods: {
    changeId(id) {
      //1:改变一级玩法
      this.currentId = id;
      //2:改变subPlayCop
      this.subPlayCop = "subPlay" + id;
      //3:过滤接口返回来的数据
      this.sublotteryCode = this.lotteryCodeList.filter(res => {
        return res.codeNo == id;
      })[0];
      console.log(this.sublotteryCode);
    },
    getData() {
      this.$http
        .post("/api/code/listCode", { lotteryNo: "104",memberId: tools.store.getData("user").id })
        .then(res => {
          if (res.data.status == 200) {
            this.$store.commit("changeLotteryData2", res.data.result);
            this.lotteryCodeList = res.data.result.lotteryCodeList;
            this.sublotteryCode = this.lotteryCodeList.filter(res => {
              return res.codeNo == "01";
            })[0];
            if (
              res.data.result.runLotteryTime - res.data.result.sysDate >
              1000
            ) {
              this.cha =
                res.data.result.runLotteryTime - res.data.result.sysDate;
            }
          }
        })
        .catch(res => console.log(res));
    }
  },
  created() {
    this.getData();
  },
  destroyed(){
    this.$store.commit('initLotteryData');
  }
};
</script>
<style lang="less">
@import "../../static/css/colTable.less";

</style>
