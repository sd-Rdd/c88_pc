<template>
    <div class="lhc-bet-area">
        <!-- 工具栏开始 -->
        <quickSettingMoney @showQuickMoneySetting="showQuickMoneySetting"></quickSettingMoney>
        <!-- 工具栏结束 -->
        <div class="tabs">
            <div :class="{'tab-selected':currentIndex==index+2}" v-for="(item,index) in sublotteryCode.sixOdds" :key="index" @click="changeIndex(index+2)">
                <label>{{item.name}}</label>
            </div>
        </div>
        <div>
            <div class="lian-grid" v-for="(item,index1) in sublotteryCode.sixOdds" :key="index1" v-if="currentIndex==index1+2">
                <div class="row title">
                    <div class="cell">
                        <div class="label">生肖</div>
                        <div class="odds">赔率</div>
                        <div class="numbers">号码</div>
                    </div>
                    <div class="cell">
                        <div class="label">生肖</div>
                        <div class="odds">赔率</div>
                        <div class="numbers">号码</div>
                    </div>
                </div>
                    <div class="cell" v-for="(item,index2) in item.children" :key="index2">
                        <div class="label">
                            <el-checkbox v-model="moreCheck[index1+''+Number(index2)]"></el-checkbox>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="odds">{{item.odds}}</div>
                        <div class="numbers">
                            <div class="num" v-for="(item,index) in item.numbers" :key="index">
                                <span :class="{'selected-item':moreCheck[index1+''+Number(index2)]}">{{item}}</span>
                            </div>
                        </div>
                    </div>
            </div>

            <!-- 结果开始 -->
            <betResult2 :SumGroup="SumGroup" :LikeSumlist="LikeSumlist" :sublotteryCode="sublotteryCode" :moreCheck="moreCheck" @onClearInputprice="ClearInputprice"></betResult2>
            <!-- 结果结束 -->
        </div>
        <showSettingMoney v-if="quickSettingisShow" @ShowQuickMoneySetting="showQuickMoneySetting"></showSettingMoney>
    </div>
</template>
<script>
import quickSettingMoney from "./quickSettingMoney";
import betResult2 from "./betResult2";
import common from "./common.js";
import tools from "tools/tools.js";
import showSettingMoney from "./showSettingMoney";
export default {
  data() {
    return {
      currentIndex: 2, //当前处于哪个选项卡下
      moreCheck: {}, //记录多选框选中与否数据
      count: null, //用于计算号码组合共多少组
      keys: [], //记录moreCheck里键值是true的键名组合
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
    SumGroup() {
      return tools.combination(this.currentIndex, this.count);
    },
    NumberArr() {
      let arr = [];
      this.keys.forEach(item => {
        let firstIndex = item.substring(0, 1),
          secondIndex = item.substring(1);
        let obj = {};
        obj.code = this.sublotteryCode.sixOdds[firstIndex].children[
          secondIndex
        ].code;
        obj.name = this.sublotteryCode.sixOdds[firstIndex].children[
          secondIndex
        ].name;
        arr.push(obj);
      });
      return arr;
    },
    LikeSumlist() {
      /* 第一步：将选中的号按规定分解成二维数组 */
      let erweiArr = tools.choose(this.NumberArr, this.currentIndex);
      /* 第二部：组装成列表里显示的数据格式 */
      let LikeSumlist2 = [];
      erweiArr.forEach(item => {
        let obj = {};
        obj.mode = this.sublotteryCode.sixOdds[this.currentIndex - 2].name; //取到模式
        obj.code=[];
        obj.number = []; //取到号码
        item.forEach(res=>{
          obj.code.push(res.code);
          obj.number.push(res.name)
        })
        /* 处理赔率问题 */
        /* 
        思路：：：：：
        循环当前的有属相的二维数组，去接口数据里找到对应的赔率，然后在这些赔率里找到最小值。
        */
        let oddsObj = [],
          oddsArr = [];
        item.forEach(item2 => {
          let obj = this.sublotteryCode.sixOdds[
            this.currentIndex - 2
          ].children.filter(item3 => {
            return item3.name == item2.name;
          });
          oddsObj.push(...obj);
        });
        oddsObj.forEach(item => {
          oddsArr.push(item.odds);
        });
        obj.odds = Math.min.apply(null, oddsArr);
        obj.oddsCodeNo = this.sublotteryCode.sixOdds[
          this.currentIndex - 2
        ].code;
        LikeSumlist2.push(obj);
      });
      /* 第三部：return出去这个数组 */
      return LikeSumlist2;
    }
  },
  methods: {
    showQuickMoneySetting(a) {
      this.quickSettingisShow = a;
    },
    changeIndex(a) {
      this.currentIndex = a;
      this.moreCheck = common.clearInputprice(this.moreCheck);
    },
    GetSumGroup() {
      this.count = 0;
      this.keys = [];
      for (let key in this.moreCheck) {
        if (this.moreCheck[key]) {
          this.count++;
          this.keys.push(key);
        }
      }
    },
    ClearInputprice(val) {
      this.moreCheck = val;
    }
  },
  watch: {
    moreCheck: {
      handler: function(val) {
        this.GetSumGroup();
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.selected-item {
  background-color: rgb(106, 204, 123);
  font-size: 12px;
  background-size: 100%;
  cursor: default;
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 50%;
}
</style>