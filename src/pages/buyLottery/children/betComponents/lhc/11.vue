<template>
  <div class="lhc-bet-area">
    <!-- 工具栏开始 -->
    <quickSettingMoney @showQuickMoneySetting="showQuickMoneySetting"></quickSettingMoney>
    <!-- 工具栏结束 -->
    <div class="tabs">
      <div :class="{'tab-selected':currentIndex==index+1}" v-for="(item,index) in sublotteryCode.sixOdds" :key="index" @click="changeIndex(index+1)">
        <label>{{item.name}}</label>
      </div>
    </div>
    <div>
      <div class="bet-grid" v-for="(item,index1) in sublotteryCode.sixOdds" :key="index1" v-if="currentIndex==index1+1">
        <div v-if="item.code=='1104'">
          <div class="row title main-title">总肖</div>
          <div class="cell" style="width: 50%;" v-for="(item,index2) in item.children" :key="index2">
            <div class="label" style="width: 25%;">{{item.name}}</div>
            <div class="odds false" style="width: 25%;" :class="{'item-selected':Inputprice[index1+''+Number(index2)]}">
              <span>{{item.odds}}</span>
            </div>
            <div class="money false" style="width: 50%;" :class="{'item-selected':Inputprice[index1+''+Number(index2)]}">
              <div style="position:relative" @mouseleave="hideFill($event)">
                <input type="text" v-model="Inputprice[index1+''+Number(index2)]" @click="showFill($event)" @keyup="verify(index1+''+Number(index2))">
                <div class="quick-fill" v-show="false">
                  <div @click="getNumber(item,index1+''+Number(index2),$event)" v-for="(item,index3) in storMoney" :key='index3'>{{item}}元 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row title">
            <div class="cell" style="width: 50%;">
              <div style="width: 20%;">{{item.name}}</div>
              <div style="width: 35%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 25%;">金额</div>
            </div>
            <div class="cell" style="width: 50%;">
              <div style="width: 20%;">{{item.name}}</div>
              <div style="width: 35%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 25%;">金额</div>
            </div>
          </div>
          <div class="cell" style="width: 50%;" v-for="(item,index2) in item.children" :key="index2">
            <div class="label" style="width: 20%;">{{item.name}}</div>
            <div class="sheng-xiao" style="width: 35%;box-sizing: border-box;" v-if="item.numbers">
              <span>{{item.numbers.join(",")}}</span>
            </div>
            <div class="odds false" style="width: 20%;" :class="{'item-selected':Inputprice[index1+''+Number(index2)]}">
              <span>{{item.odds}}</span>
            </div>
            <div class="money false" style="width: 25%;" :class="{'item-selected':Inputprice[index1+''+Number(index2)]}">
              <div style="position:relative" @mouseleave="hideFill($event)">
                <input type="text" v-model="Inputprice[index1+''+Number(index2)]" @click="showFill($event)" @keyup="verify(index1+''+Number(index2))">
                <div class="quick-fill" v-show="false">
                  <div @click="getNumber(item,index1+''+Number(index2),$event)" v-for="(item,index3) in storMoney" :key='index3'>{{item}}元 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结果开始 -->
      <betResult :count="count" :sumMoney="sumMoney" :Inputprice="Inputprice" :sublotteryCode="sublotteryCode" @onClearInputprice="ClearInputprice"></betResult>
      <!-- 结果结束 -->
    </div>
    <showSettingMoney v-if="quickSettingisShow" @ShowQuickMoneySetting="showQuickMoneySetting"></showSettingMoney>
  </div>
</template>
<script>
import quickSettingMoney from "./quickSettingMoney";
import betResult from "./betResult";
import common from "./common.js";
import showSettingMoney from "./showSettingMoney";
export default {
  components: {
    quickSettingMoney,
    betResult,
    showSettingMoney
  },
  props: ["sublotteryCode"],
  data() {
    return {
      currentIndex: 1,
      Inputprice: {}, //收集输入框里输入的金额
      count: 0, //统计实时计算的注数
      sumMoney: 0, //收集一共的钱数
      quickSettingisShow: false //控制快捷金额设置是否显示
    };
  },
  computed: {
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
      this.Inputprice = common.clearInputprice(this.Inputprice);
    },
    ClearInputprice(Inputprice) {
      this.Inputprice = Inputprice;
    },
    showFill(a) {
      if (this.isCheckBox) {
        a.target.nextElementSibling.style.display = "block";
      }
    },
    hideFill(a) {
      a.target.children[1].style.display = "none";
    },
    getNumber(a, b, c) {
      this.$set(this.Inputprice, b, a);
      c.target.parentNode.style.display = "none";
    },
    verify(a) {
      this.Inputprice[a] = this.Inputprice[a].replace(/\D/g, ""); //验证只能输入正整数
    }
  },
  watch: {
    Inputprice: {
      handler: function(val) {
        let obj = common.forInInputprice(val);
        this.count = obj.count;
        this.sumMoney = obj.sumMoney;
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>

</style>
