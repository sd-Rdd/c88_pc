<template>
  <div class="lhc-bet-area">
    <!-- 工具栏开始 -->
    <quickSettingMoney @showQuickMoneySetting="showQuickMoneySetting"></quickSettingMoney>
    <!-- 工具栏结束 -->
    <div class="tabs">
      <div :class="{'tab-selected':currentIndex==index}" v-for="(item,index) in sublotteryCode.sixOdds" :key="index" @click="changeIndex(index)">
        <label>{{item.name}}</label>
      </div>
    </div>
    <div class="he-xiao">
      <ul class="subTabs">
        <li @click="changeCurrentIndex2(1)" :class="{active:currentIndex2==1}">野兽</li>
        <li @click="changeCurrentIndex2(2)" :class="{active:currentIndex2==2}">家禽</li>
        <li @click="changeCurrentIndex2(3)" :class="{active:currentIndex2==3}">单</li>
        <li @click="changeCurrentIndex2(4)" :class="{active:currentIndex2==4}">双</li>
        <li @click="changeCurrentIndex2(5)" :class="{active:currentIndex2==5}">前肖</li>
        <li @click="changeCurrentIndex2(6)" :class="{active:currentIndex2==6}">后肖</li>
        <li @click="changeCurrentIndex2(7)" :class="{active:currentIndex2==7}">天肖</li>
        <li @click="changeCurrentIndex2(8)" :class="{active:currentIndex2==8}">地肖</li>
      </ul>
      <div class="mini-grid" v-for="(item,index1) in sublotteryCode.sixOdds" :key="index1" v-if="currentIndex==index1">
        <div class="row main-title">生肖</div>
        <div class="cell" style="width: 50%;" v-for="(item,index2) in item.children" :key="index2">
          <div class="label">
            <el-checkbox v-model="moreCheck[index1+''+Number(index2)]"></el-checkbox>
            <span>{{item.name}}</span>
          </div>
          <div class="nums">
            <div v-for="(item,index) in item.numbers" :key="index">
              <span :class="{'selected-item':moreCheck[index1+''+Number(index2)]}">{{item}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 结果开始 -->
      <betResult2 :sublotteryCode="sublotteryCode" :SumGroup="count" @onClearInputprice="ClearInputprice" :moreCheck="moreCheck" :LikeSumlist="LikeSumlist"></betResult2>
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
      currentIndex2: 0, //记录野兽、家禽等的下标
      currentIndex: 0, //当前处于哪个选项卡下
      count: 0, //用于计算号码组合共多少组
      keys: [], //记录moreCheck里键值是true的键名组合
      //记录多选框选中与否数据
      moreCheck: {
        "00": false,
        "01": false,
        "02": false,
        "03": false,
        "04": false,
        "05": false,
        "06": false,
        "07": false,
        "08": false,
        "09": false,
        "010": false,
        "011": false,
        "10": false,
        "11": false,
        "12": false,
        "13": false,
        "14": false,
        "15": false,
        "16": false,
        "17": false,
        "18": false,
        "19": false,
        "110": false,
        "111": false
      },
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
      if (this.NumberArr.length != 0) {
        //第一部：组装成列表里显示的数据格式
        let LikeSumlist2 = [];
        let obj = {};
        obj.mode = this.sublotteryCode.sixOdds[this.currentIndex].name; //取到模式
        let code = [],
          name = [];
        this.NumberArr.forEach(res => {
          code.push(res.code);
          name.push(res.name);
        });
        obj.number = name; //取到号码
        obj.code = code;
        //处理赔率问题
        let Arr2 = this.sublotteryCode.sixOdds[this.currentIndex].children;
        let odds,
          oddsArr = [];
        if (this.currentIndex == 0) {
          this.keys.forEach(item => {
            let secondIndex = item.substring(1);
            oddsArr.push(Arr2[secondIndex].odds);
          });
        } else if (this.currentIndex == 1) {
          let oddsObj,
            secondIndexArr = [];
          this.keys.forEach(item => {
            secondIndexArr.push(Number(item.substring(1)));
          });
          oddsObj = Arr2.filter((item, index) => {
            return !secondIndexArr.includes(index);
          });
          oddsObj.forEach(item => {
            oddsArr.push(item.odds);
          });
        }

        //开始计算赔率
        if (oddsArr.length != 0) {
          let sum = 0;
          oddsArr.forEach(item => {
            sum = sum.add(item);
          });
          console.log(sum);
          odds = sum.div(Math.pow(oddsArr.length, 2)).toFixed(10);
        }
        obj.odds = odds;
        obj.oddsCodeNo = this.sublotteryCode.sixOdds[this.currentIndex].code;
        LikeSumlist2.push(obj);
        //第三部：return出去这个数组
        return LikeSumlist2;
      }
    },
    storMoney() {
      let finalObj = {};
      let obj = this.$store.state.lhc.quickSettingMoney;
      for (let key in obj) {
        if (obj[key]) {
          finalObj[key] = obj[key];
        }
      }
      delete finalObj.isCheckBox;
      return finalObj;
    },
    isCheckBox() {
      return this.$store.state.lhc.quickSettingMoney.isCheckBox;
    }
  },
  methods: {
    showQuickMoneySetting(a) {
      this.quickSettingisShow = a;
    },
    changeIndex(a) {
      this.currentIndex = a;
      this.currentIndex2 = 0;
      this.moreCheck = common.clearMoreCheck(this.moreCheck);
    },
    GetSumGroup() {
      this.count = 0;
      this.keys = [];
      for (let key in this.moreCheck) {
        if (this.moreCheck[key]) {
          this.count = 1;
          this.keys.push(key);
        }
      }
    },
    ClearInputprice(val) {
      this.moreCheck = val;
    },
    changeCurrentIndex2(a) {
      this.moreCheck = common.clearMoreCheck(this.moreCheck);
      this.currentIndex2 = a;
      if (this.currentIndex == 0) {
        switch (a) {
          case 1:
            this.moreCheck["00"] = true;
            this.moreCheck["02"] = true;
            this.moreCheck["03"] = true;
            this.moreCheck["04"] = true;
            this.moreCheck["05"] = true;
            this.moreCheck["08"] = true;
            break;
          case 2:
            this.moreCheck["01"] = true;
            this.moreCheck["06"] = true;
            this.moreCheck["07"] = true;
            this.moreCheck["09"] = true;
            this.moreCheck["010"] = true;
            this.moreCheck["011"] = true;
            break;
          case 3:
            this.moreCheck["01"] = true;
            this.moreCheck["03"] = true;
            this.moreCheck["07"] = true;
            this.moreCheck["09"] = true;
            this.moreCheck["05"] = true;
            this.moreCheck["011"] = true;
            break;
          case 4:
            this.moreCheck["00"] = true;
            this.moreCheck["02"] = true;
            this.moreCheck["04"] = true;
            this.moreCheck["06"] = true;
            this.moreCheck["08"] = true;
            this.moreCheck["010"] = true;
            break;
          case 5:
            this.moreCheck["00"] = true;
            this.moreCheck["01"] = true;
            this.moreCheck["02"] = true;
            this.moreCheck["03"] = true;
            this.moreCheck["04"] = true;
            this.moreCheck["05"] = true;
            break;
          case 6:
            this.moreCheck["06"] = true;
            this.moreCheck["07"] = true;
            this.moreCheck["08"] = true;
            this.moreCheck["09"] = true;
            this.moreCheck["010"] = true;
            this.moreCheck["011"] = true;
            break;
          case 7:
            this.moreCheck["01"] = true;
            this.moreCheck["03"] = true;
            this.moreCheck["04"] = true;
            this.moreCheck["06"] = true;
            this.moreCheck["08"] = true;
            this.moreCheck["011"] = true;
            break;
          case 8:
            this.moreCheck["00"] = true;
            this.moreCheck["02"] = true;
            this.moreCheck["05"] = true;
            this.moreCheck["07"] = true;
            this.moreCheck["09"] = true;
            this.moreCheck["010"] = true;
            break;
        }
      } else if (this.currentIndex == 1) {
        switch (a) {
          case 1:
            this.moreCheck["10"] = true;
            this.moreCheck["12"] = true;
            this.moreCheck["13"] = true;
            this.moreCheck["14"] = true;
            this.moreCheck["15"] = true;
            this.moreCheck["18"] = true;
            break;
          case 2:
            this.moreCheck["11"] = true;
            this.moreCheck["16"] = true;
            this.moreCheck["17"] = true;
            this.moreCheck["19"] = true;
            this.moreCheck["110"] = true;
            this.moreCheck["111"] = true;
            break;
          case 3:
            this.moreCheck["11"] = true;
            this.moreCheck["13"] = true;
            this.moreCheck["17"] = true;
            this.moreCheck["19"] = true;
            this.moreCheck["15"] = true;
            this.moreCheck["111"] = true;
            break;
          case 4:
            this.moreCheck["10"] = true;
            this.moreCheck["12"] = true;
            this.moreCheck["14"] = true;
            this.moreCheck["16"] = true;
            this.moreCheck["18"] = true;
            this.moreCheck["110"] = true;
            break;
          case 5:
            this.moreCheck["10"] = true;
            this.moreCheck["11"] = true;
            this.moreCheck["12"] = true;
            this.moreCheck["13"] = true;
            this.moreCheck["14"] = true;
            this.moreCheck["15"] = true;
            break;
          case 6:
            this.moreCheck["16"] = true;
            this.moreCheck["17"] = true;
            this.moreCheck["18"] = true;
            this.moreCheck["19"] = true;
            this.moreCheck["110"] = true;
            this.moreCheck["111"] = true;
            break;
          case 7:
            this.moreCheck["11"] = true;
            this.moreCheck["13"] = true;
            this.moreCheck["14"] = true;
            this.moreCheck["16"] = true;
            this.moreCheck["18"] = true;
            this.moreCheck["111"] = true;
            break;
          case 8:
            this.moreCheck["10"] = true;
            this.moreCheck["12"] = true;
            this.moreCheck["15"] = true;
            this.moreCheck["17"] = true;
            this.moreCheck["19"] = true;
            this.moreCheck["110"] = true;
            break;
        }
      }
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
