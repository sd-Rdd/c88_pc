<template>
  <div class="lhc-bet-area">
    <!-- 工具栏开始 -->
    <quickSettingMoney @showQuickMoneySetting="showQuickMoneySetting"></quickSettingMoney>
    <!-- 工具栏结束 -->
    <div>
      <div class="bet-grid">
        <div class="row title">
          <div class="cell" style="width: 50%;">
            <div style="width: 35%;">七码</div>
            <div style="width: 30%;">赔率</div>
            <div style="width: 35%;">金额</div>
          </div>
          <div class="cell" style="width: 50%;">
            <div style="width: 35%;">七码</div>
            <div style="width: 30%;">赔率</div>
            <div style="width: 35%;">金额</div>
          </div>
        </div>
        <div class="cell" style="width: 50%;" v-for="(item,index) in sublotteryCode.sixOdds[0].children" :key="index">
          <div class="label" style="width: 35%;">{{item.name}}</div>
          <div class="odds false" style="width: 30%;" :class="{'item-selected':Inputprice['0'+index]}">
            <span>{{item.odds}}</span>
          </div>
          <div class="money false" style="width: 35%;" :class="{'item-selected':Inputprice['0'+index]}">
            <div style="position:relative" @mouseleave="hideFill($event)">
              <input type="text" v-model="Inputprice['0'+index]" @click="showFill($event)" @keyup="verify('0'+index)">
              <div class="quick-fill" v-show="false">
                <div @click="getNumber(item,'0'+index,$event)" v-for="(item,index3) in storMoney" :key='index3'>{{item}}元 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bet-grid">
        <div class="row title">
          <div class="cell" style="width: 100%;">
            <div style="width: 20%;">五行</div>
            <div style="width: 30%;">号码</div>
            <div style="width: 20%;">赔率</div>
            <div style="width: 30%;">金额</div>
          </div>
        </div>
        <div class="row" v-for="(item,index) in sublotteryCode.sixOdds[1].children" :key="index">
          <div class="cell" style="width: 100%;">
            <div class="label" style="width: 20%;">{{item.name}}</div>
            <div class="number" style="width: 30%;">
              <span>{{item.numbers.join(",")}}</span>

            </div>
            <div class="odds false" style="width: 20%;" :class="{'item-selected':Inputprice['1'+index]}">
              <span>{{item.odds}}</span>
            </div>
            <div class="money false" style="width: 30%;" :class="{'item-selected':Inputprice['1'+index]}">
              <div style="position:relative" @mouseleave="hideFill($event)">
                <input type="text" v-model="Inputprice['1'+index]" @click="showFill($event)" @keyup="verify('1'+index)">
                <div class="quick-fill" v-show="false">
                <div @click="getNumber(item,'1'+index,$event)" v-for="(item,index3) in storMoney" :key='index3'>{{item}}元 </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 选完号后结果部分，包括注数和钱以及取消确认按钮 -->
      <betResult :count="count" :sumMoney="sumMoney" :Inputprice="Inputprice" :sublotteryCode="sublotteryCode" @onClearInputprice="ClearInputprice"></betResult>
      <!-- 选完号后结果部分，包括注数和钱以及取消确认按钮 -->
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
  props: ["sublotteryCode"],
  data() {
    return {
      Inputprice: {}, //收集输入框里输入的金额
      count: 0, //统计实时计算的注数
      sumMoney: 0, //收集一共的钱数
      quickSettingisShow: false //控制快捷金额设置是否显示
    };
  },
  methods: {
    showQuickMoneySetting(a) {
      this.quickSettingisShow = a;
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
  components: {
    quickSettingMoney,
    betResult,
    showSettingMoney
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
