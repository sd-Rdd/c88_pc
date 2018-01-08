<template>
  <div class="lhc-bet-area" v-if="sublotteryCode.codeNo">
    <!-- 工具栏开始 -->
    <quickSettingMoney @showQuickMoneySetting="showQuickMoneySetting"></quickSettingMoney>
    <!-- 工具栏结束 -->
    <div>
      <div class="bet-grid">
        <div class="row title">
          <div class="cell" style="width: 25%;">
            <div style="width: 20%;">号码</div>
            <div style="width: 20%;">赔率</div>
            <div style="width: 60%;">金额</div>
          </div>
          <div class="cell" style="width: 25%;">
            <div style="width: 20%;">号码</div>
            <div style="width: 20%;">赔率</div>
            <div style="width: 60%;">金额</div>
          </div>
          <div class="cell" style="width: 25%;">
            <div style="width: 20%;">号码</div>
            <div style="width: 20%;">赔率</div>
            <div style="width: 60%;">金额</div>
          </div>
          <div class="cell" style="width: 25%;">
            <div style="width: 20%;">号码</div>
            <div style="width: 20%;">赔率</div>
            <div style="width: 60%;">金额</div>
          </div>
        </div>
        <div class="cell" style="width: 25%;" v-for="(item,index) in sublotteryCode.sixOdds[0].children" :key="index" ref="cell11">
          <div class="label" style="width: 20%;">{{item.name}}</div>
          <div class="odds " style="width: 20%;" :class="{'item-selected':Inputprice['0'+index]}">
            <span>{{item.odds}}</span>
          </div>
          <div class="money" style="width: 60%;" :class="{'item-selected':Inputprice['0'+index]}">
            <div style="position:relative" @mouseleave="hideFill($event)">
              <input type="text" v-model="Inputprice['0'+index]" @click="showFill($event)" @keyup="verify('0'+index)"/>
              <div class="quick-fill" v-show="false">
                <div @click="getNumber(item,'0'+index,$event)" v-for="(item,index2) in storMoney" :key='index2'>{{item}}元 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <div style="width: 30%; color: rgb(51, 51, 51);">赔率</div>
            <div style="width: 70%; color: rgb(51, 51, 51);">金额</div>
          </div>
          <div class="cell" style="width: 15%;">
            <div style="width: 30%; color: rgb(51, 51, 51);">赔率</div>
            <div style="width: 70%; color: rgb(51, 51, 51);">金额</div>
          </div>
          <div class="cell" style="width: 15%;">
            <div style="width: 30%; color: rgb(51, 51, 51);">赔率</div>
            <div style="width: 70%; color: rgb(51, 51, 51);">金额</div>
          </div>
          <div class="cell" style="width: 15%;">
            <div style="width: 30%; color: rgb(51, 51, 51);">赔率</div>
            <div style="width: 70%; color: rgb(51, 51, 51);">金额</div>
          </div>
          <div class="cell" style="width: 15%;">
            <div style="width: 30%; color: rgb(51, 51, 51);">赔率</div>
            <div style="width: 70%; color: rgb(51, 51, 51);">金额</div>
          </div>
          <div class="cell" style="width: 15%;">
            <div style="width: 30%; color: rgb(51, 51, 51);">赔率</div>
            <div style="width: 70%; color: rgb(51, 51, 51);">金额</div>
          </div>
        </div>
        <div class="table-content">
          <div class="col-title">
            <div>单</div>
            <div>双</div>
            <div>大</div>
            <div>小</div>
            <div>和单</div>
            <div>和双</div>
            <div>和大</div>
            <div>和小</div>
          </div>
          <div class="col-content" v-for="(item,index1) in sublotteryCode2" :key="index1">
            <div class="cell1" v-for="(item,index2) in item.children" :key="index2" ref="cell11" :col="index1" :numberStrs="item.code">
              <div class="odds" style="width: 30%;" :class="{'item-selected':Inputprice[index1+1+''+Number(index2)]}">
                <span>{{item.odds}}</span>
              </div>
              <div class="money" style="width: 70%;position:relative" @mouseleave="hideFill($event)" :class="{'item-selected':Inputprice[index1+1+''+Number(index2)]}">
                <input type="text" name="NO1_ODD" v-model="Inputprice[index1+1+''+Number(index2)]" @click="showFill($event)" @keyup="verify(index1+1+''+Number(index2))"/>
                <div class="quick-fill" v-show="false">
                <div @click="getNumber(item,index1+1+''+Number(index2),$event)" v-for="(item,index) in storMoney" :key='index'>{{item}} 元</div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- betResult部分开始 -->
      <betResult :count="count" :sumMoney="sumMoney" :Inputprice="Inputprice" :sublotteryCode="sublotteryCode" @onClearInputprice="ClearInputprice"></betResult>
      <!-- betResult部分结束 -->
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
  data() {
    return {
      Inputprice: {}, //收集输入框里输入的金额
      count: 0, //统计实时计算的注数
      sumMoney: 0, //收集一共的钱数
      quickSettingisShow: false //控制快捷金额设置是否显示
    };
  },
  props: ["sublotteryCode"],
  computed: {
    sublotteryCode2() {
      return this.sublotteryCode.sixOdds.slice(1);
    },
    storMoney() {
      let finalObj = {};
      let obj = this.$store.state.lhc.quickSettingMoney;
      for(let key in obj){
        if(obj[key]){
          finalObj[key]=obj[key];
        }
      }
      delete finalObj.isCheckBox;
      return finalObj;
    },
    isCheckBox(){
      return this.$store.state.lhc.quickSettingMoney.isCheckBox;
    }
  },
  components: {
    quickSettingMoney,
    betResult,
    showSettingMoney
  },
  methods: {
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
    verify(a){
      this.Inputprice[a]=this.Inputprice[a].replace(/\D/g,'')//验证只能输入正整数
    }
  },
  watch: {
    Inputprice: {
      handler: function(val) {
        //console.log(val)
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
