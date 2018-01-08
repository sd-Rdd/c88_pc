<template>
  <div class="lhc-bet-result">
    <div class="desc">
      <div class="dotted"></div>
      <div class="info-check">
        <!-- react-text: 1240 -->您已经选中了
        <!-- /react-text -->
        <span>{{count}}</span>
        <!-- react-text: 1242 -->注， 共
        <!-- /react-text -->
        <span>{{sumMoney}}</span>
        <!-- react-text: 1244 -->元
        <!-- /react-text -->
      </div>
      <div class="dotted"></div>
    </div>
    <div class="btn-group">
      <button class="cancel" @click="cancel">取消</button>
      <button class="confirm" @click="confirm">确认</button>
    </div>
  </div>
</template>
<script>
import ccaa from "tools/tools.js";
import common from "./common.js";
export default {
  computed: {
    issue() {
      return this.$store.state.newIssue;
    }
  },
  props: {
    count: {
      type: Number,
      default: 0
    }, //页面显示的注数
    sumMoney: {
      type: Number,
      default: 0
    }, //页面显示的总金额
    Inputprice: Object, //输入框输入的钱数
    sublotteryCode: Object //一级玩法的相关数据
  },
  methods: {
    confirm() {
      if (this.count == 0) {
        this.$alert("请投注", "温馨提示", {
          confirmButtonText: "确定"
        });
      } else {
        if (ccaa.store.getData("user").id) {
        //第一步，组件sumlist数组
        let sumList = [];
        for (let key in this.Inputprice) {
          if (this.Inputprice[key]) {
            let obj = {}; //往sumlist数组放的对象
            let firstIndex = key.substring(0, 1);
            let secondIndex = key.substring(1);
            let unitObj = this.sublotteryCode.sixOdds[firstIndex].children[
              secondIndex
            ]; //找到对应单元的对象
            //console.log(key);
            //console.log(unitObj);
            obj.numberStrs = [[unitObj.code]];
            obj.playCode = this.sublotteryCode.codeNo;
            obj.selectedNumberTitle = unitObj.name;
            obj.oddsCodeNo = this.sublotteryCode.sixOdds[firstIndex].code;
            obj.price = this.Inputprice[key];
            obj.money = this.Inputprice[key];
            obj.odds = unitObj.odds;
            obj.count = 1;
            obj.rebates = unitObj.rebate;
            sumList.push(obj);
          }
        }
        for (let i in sumList) {
          if (Number(sumList[i].money) === 0) {
            this.$alert('单注金额需大于0', '温馨提示', {
              confirmButtonText: '确定',
              center: true
            }).then(() => {
              this.$emit('onClearInputprice',common.clearInputprice(this.Inputprice))
            })
            return
          }
        }
        console.log(sumList);
        //第二步：组建传给后台的最终数据
        let finalObj = {};
        finalObj.periodsList = [];
        finalObj.periodsList.push({ issue: this.issue, multiple: 1 });
        finalObj.isAfterNo = 0;
        finalObj.lotteryCode = "104";
        finalObj.sumMoney = this.sumMoney;
        finalObj.memberId = ccaa.store.getData("user").id;
        finalObj.sumList = sumList;
        console.log(finalObj);
        //第三步:发送请求
        this.$http.post("/member/buy/betting", finalObj).then(res => {
          if (res.data.status == 200) {
            /* this.$message(res.data.message); */
             this.$alert("投注成功", "温馨提示", {
                confirmButtonText: "确定",
                center: true
              });
            this.$emit('onClearInputprice',common.clearInputprice(this.Inputprice))
          } else {
            /* this.$message(res.data.message); */
             this.$alert(res.data.message, "温馨提示", {
                confirmButtonText: "确定",
                center: true
              });
          }
        });
      }else{
        this.$alert("请先登录然后投注", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
        });
      }

      }
    },
    cancel(){
      this.$emit('onClearInputprice',common.clearInputprice(this.Inputprice))
    }
  }
};
</script>
<style lang="less" scoped>

</style>

         
        