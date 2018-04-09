<template>
  <div class="lhc-bet-area" v-if="sublotteryCode.codeNo">
    <!-- 工具栏开始 -->
    <quickSettingMoney @showQuickMoneySetting="showQuickMoneySetting"></quickSettingMoney>
    <!-- 工具栏结束 -->
    <!-- 二级玩法选择栏 -->
    <div class="tabs">
      <div class="false " :class="{'tab-selected':subPlay==1}" @click="selectAB(1)">
        <label>特码A</label>
      </div>
      <div class="false " :class="{'tab-selected':subPlay==2}" @click="selectAB(2)">
        <label>特码B</label>
      </div>
    </div>
    <!-- 二级玩法选择栏结束 -->
    <div>
      <!-- 特码A选号盘开始 -->
      <div v-if="subPlay==1">
        <div class="bet-grid">
          <div class="row title">
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
          </div>
          <div class="cell" style="width: 20%;" v-for="(item,index) in sublotteryCode.sixOdds[2].children" :key="index">
            <div class="number" style="width: 20%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">{{item.name}}</span>
            </div>
            <div class="odds false" style="width: 20%;" :class="{'item-selected':Inputprice['2'+index]}">
              <span>{{item.odds}}</span>
            </div>
            <div class="money false" style="width: 60%;" :class="{'item-selected':Inputprice['2'+index]}">
              <div style="position:relative" @mouseleave="hideFill($event)">
                <input type="text" v-model="Inputprice['2'+index]" @click="showFill($event)" @keyup="verify('2'+index)"/>
                <div class="quick-fill" v-show="false">
                  <div @click="getNumber(item,'2'+index,$event)" v-for="(item,index2) in storMoney" :key='index2'>{{item}}元 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 特码A选号盘结束 -->
      <!-- 特码B选号盘开始 -->
      <div v-if="subPlay==2">
        <div class="bet-grid">
          <div class="row title">
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
            <div class="cell" style="width: 20%;">
              <div style="width: 20%;">号码</div>
              <div style="width: 20%;">赔率</div>
              <div style="width: 60%;">金额</div>
            </div>
          </div>
          <div class="cell" style="width: 20%;" v-for="(item,index) in sublotteryCode.sixOdds[0].children" :key="index">
            <div class="number" style="width: 20%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">{{item.name}}</span>
            </div>
            <div class="odds false" style="width: 20%;" :class="{'item-selected':Inputprice['0'+index]}">
              <span>{{item.odds}}</span>
            </div>
            <div class="money false" style="width: 60%;" :class="{'item-selected':Inputprice['0'+index]}">
              <div style="position:relative" @mouseleave="hideFill($event)">
                <input type="text" v-model="Inputprice['0'+index]" @click="showFill($event)" @keyup="verify('0'+index)">
                <div class="quick-fill" v-show="false">
                  <div @click="getNumber(item,'0'+index,$event)" v-for="(item,index2) in storMoney" :key='index2'>{{item}}元 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 特码B选号盘结束 -->
      <!-- 公共部分开始 -->
      <div style="margin-top:30px;">
        <div class="bet-grid">
          <div class="cell" style="width: 20%;" v-for="(item,index) in sublotteryCode.sixOdds[1].children" :key="index">
            <div class="label" style="width: 25%;">{{item.name}}</div>
            <div class="odds false" style="width: 20%;" :class="{'item-selected':Inputprice['1'+index]}">
              <span>{{item.odds}}</span>
            </div>
            <div class="money false" style="width: 60%;" :class="{'item-selected':Inputprice['1'+index]}">
              <div style="position:relative" @mouseleave="hideFill($event)">
                <input type="text" v-model="Inputprice['1'+index]" @click="showFill($event)" @keyup="verify('1'+index)">
                <div class="quick-fill" v-show="false">
                  <div @click="getNumber(item,'1'+index,$event)" v-for="(item,index2) in storMoney" :key='index2'>{{item}}元 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 公共部分结束 -->
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
      subPlay: 2,
      Inputprice: {}, //收集输入框里输入的金额
      count: 0, //统计实时计算的注数
      sumMoney: 0, //收集一共的钱数
      quickSettingisShow: false //控制快捷金额设置是否显示
    };
  },
  components: {
    quickSettingMoney,
    betResult,
    showSettingMoney
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
    selectAB(a) {
      this.subPlay = a;
      this.Inputprice = common.clearInputprice(this.Inputprice);
    },
    ClearInputprice(Inputprice) {
      this.Inputprice = Inputprice;
    },
    showQuickMoneySetting(a) {
      this.quickSettingisShow = a;
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
