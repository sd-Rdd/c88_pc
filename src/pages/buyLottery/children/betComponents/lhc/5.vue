<template>
  <div class="lhc-bet-area">
    <!-- 工具栏开始 -->
    <quickSettingMoney @showQuickMoneySetting="showQuickMoneySetting"></quickSettingMoney>
    <!-- 工具栏结束 -->
    <div>
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
            <div>尾大</div>
            <div>尾小</div>
            <div>红波</div>
            <div>绿波</div>
            <div>蓝波</div>
          </div>
          <div class="col-content" v-for="(item,index1) in sublotteryCode.sixOdds" :key="index1">
            <div class="cell1" v-for="(item,index2) in item.children" :key="index2">
              <div class="odds" style="width: 30%;" :class="{'item-selected':Inputprice[index1+''+Number(index2)]}">
                <span>{{item.odds}}</span>
              </div>
              <div class="money" style="width: 70%;" :class="{'item-selected':Inputprice[index1+''+Number(index2)]}">
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
    watch: {
      Inputprice: {
        handler: function (val) {
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
