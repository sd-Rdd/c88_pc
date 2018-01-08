<template>
    <div class="lhc-bet-area">
        <!-- 工具栏开始 -->
        <quickSettingMoney @showQuickMoneySetting="showQuickMoneySetting"></quickSettingMoney>
        <!-- 工具栏结束 -->
        <div class="zheng-ma-guo-guan">
            <div class="bet-grid">
                <div class="row title totle-title">
                    <div style="width: 10%;"></div>
                    <div style="width: 15%;">正码一</div>
                    <div style="width: 15%;">正码二</div>
                    <div style="width: 15%;">正码三</div>
                    <div style="width: 15%;">正码四</div>
                    <div style="width: 15%;">正码五</div>
                    <div style="width: 15%;">正码六</div>
                </div>
                <div class="row title" style="background-color: rgb(255, 252, 250); color: rgb(51, 51, 51);">
                    <div class="cell" style="width: 10%;">
                        <div class="td-title">号码</div>
                    </div>
                    <div class="cell" style="width: 15%;">
                        <div style="width: 50%; color: rgb(51, 51, 51);">赔率</div>
                        <div style="width: 50%; color: rgb(51, 51, 51);">选择</div>
                    </div>
                    <div class="cell" style="width: 15%;">
                        <div style="width: 50%; color: rgb(51, 51, 51);">赔率</div>
                        <div style="width: 50%; color: rgb(51, 51, 51);">选择</div>
                    </div>
                    <div class="cell" style="width: 15%;">
                        <div style="width: 50%; color: rgb(51, 51, 51);">赔率</div>
                        <div style="width: 50%; color: rgb(51, 51, 51);">选择</div>
                    </div>
                    <div class="cell" style="width: 15%;">
                        <div style="width: 50%; color: rgb(51, 51, 51);">赔率</div>
                        <div style="width: 50%; color: rgb(51, 51, 51);">选择</div>
                    </div>
                    <div class="cell" style="width: 15%;">
                        <div style="width: 50%; color: rgb(51, 51, 51);">赔率</div>
                        <div style="width: 50%; color: rgb(51, 51, 51);">选择</div>
                    </div>
                    <div class="cell" style="width: 15%;">
                        <div style="width: 50%; color: rgb(51, 51, 51);">赔率</div>
                        <div style="width: 50%; color: rgb(51, 51, 51);">选择</div>
                    </div>
                </div>
                <div class="table-content" >
                    <div class="col-title">
                        <div>单</div>
                        <div>双</div>
                        <div>大</div>
                        <div>小</div>
                        <div>和单</div>
                        <div>和双</div>
                        <div>和大</div>
                        <div>和小</div>
                        <div>尾大</div>
                        <div>尾小</div>
                        <div>红</div>
                        <div>绿</div>
                        <div>蓝</div>
                    </div>
                    <div class="col-content" v-for="(item,index1) in sublotteryCode.sixOdds[0].children" :key="index1">
                        <div class="cell1" v-for="(item,index2) in item.children" :key="index2">
                            <div class="odds" style="width: 50%;">
                                <span>{{item.odds}}</span>
                            </div>
                            <div class="money" style="width: 50%;">
                                <el-radio v-model="radio[index1]" :label="index2"><span></span></el-radio>
                                <!-- <input type="radio" name="NO1_ODD" v-model="radio"> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 结果开始 -->
            <betResult2 :sublotteryCode="sublotteryCode" :SumGroup="count" :LikeSumlist="LikeSumlist" @onClearInputprice="ClearInputprice" @onClear="clearSingle"></betResult2>
            <!-- 结果结束 -->
        </div>
        <showSettingMoney v-if="quickSettingisShow" @ShowQuickMoneySetting="showQuickMoneySetting"></showSettingMoney>
    </div>
</template>
<script>
import quickSettingMoney from "./quickSettingMoney";
import betResult2 from "./betResult2";
import common from "./common.js";
import showSettingMoney from "./showSettingMoney";
export default {
  data() {
    return {
      //记录单选框选中与否数据
      radio: {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
      },
      count: 0, //用于计算号码组合共多少组
      NumberArr: [], //记录选择了哪些号码
      obj: {},
      quickSettingisShow: false //控制快捷金额设置是否显示
    };
  },
  props: ["sublotteryCode"],
  components: {
    quickSettingMoney,
    betResult2,
    showSettingMoney
  },
  computed: {
    LikeSumlist() {
      /* 第二部：组装成列表里显示的数据格式 */
      let LikeSumlist2 = [];
      this.NumberArr.forEach(item => {
        let obj = {};
        let firstIndx = item.substring(0, 1),
          secondIndex = item.substring(1),
          unitInfo = this.sublotteryCode.sixOdds[0].children[firstIndx]
            .children[secondIndex];
        let secondName = this.sublotteryCode.sixOdds[0].children[firstIndx]
          .name;
        obj.NumberGroup =
          secondName + " " + unitInfo.name + " @" + unitInfo.odds;
        obj.odds = unitInfo.odds;
        obj.firstIndx = firstIndx;
        obj.secondIndex=secondIndex;
        LikeSumlist2.push(obj);
      });
      /* 第三部：return出去这个数组 */
      return LikeSumlist2;
    },
    
  },
  methods: {
    showQuickMoneySetting(a) {
      this.quickSettingisShow = a;
    },
    GetSumGroup() {
      this.count = 0;
      this.NumberArr = [];
      for (let key in this.radio) {
        if (this.radio[key] !== false) {
          this.count = 1;
          this.NumberArr.push(key + this.radio[key]);
        }
      }
      //console.log(this.NumberArr);
    },
    ClearInputprice() {
      for (let key in this.radio) {
        if (this.radio[key] !== false) {
          this.radio[key] = false;
        }
      }
    },
    clearSingle(val) {
      this.radio[val] = false;
    },
  },
  watch: {
    radio: {
      handler: function(val) {
        this.GetSumGroup();
        //console.log(val);
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>

</style>

