<template>
  <div class="lottery-record animated fadeInRightBig">
    <div class="record">
      <div  v-if="resultList.length!=0">
        <div class="one_issue" >
          第
          <span>{{resultList[0].issueNo}}</span>期
        </div>
        <div class="ball-magic">
          <div class="lucky-reacords" v-if="resultList[0].lotteryResult.length!=0">
            <div>{{resultList[0].lotteryResult[0]}}</div>
            <span>+</span>
            <div>{{resultList[0].lotteryResult[1]}}</div>
            <span>+</span>
            <div>{{resultList[0].lotteryResult[2]}}</div>
            <span>=</span>
            <div>{{resultList[0].lotteryResult|getSum}}</div>
          </div>
        </div>
      </div>
      <!--<div class="five-group"  v-if="resultList.length!=0">-->
        <!--<div class="group" v-for="(item,index) in resultList" :key="index">-->
          <!--<span class="five_issue">-->
            <!--第-->
            <!--<span>{{item.issueNo}}</span>期：-->
          <!--</span>-->
          <!--<div class="lucky-reacords" v-if="item.lotteryResult.length!=0">-->
            <!--<div>{{item.lotteryResult[0]}}</div>-->
            <!--<span>+</span>-->
            <!--<div>{{item.lotteryResult[1]}}</div>-->
            <!--<span>+</span>-->
            <!--<div>{{item.lotteryResult[2]}}</div>-->
            <!--<span>=</span>-->
            <!--<div>{{item.lotteryResult|getSum}}</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <!--<div class="issue-select">-->
      <!--<button class="btn" @click="selectIssue(1)" :class="{active:Issue==1}">近一期</button>-->
      <!--<button class="btn" @click="selectIssue(2)" :class="{active:Issue==2}">近五期</button>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default {
    data() {
      return {
//        Issue: 1
      };
    },
    computed: {
      resultList() {
        let result = this.$store.state.lotteryResultList.slice(0,5);
        let lotteryResultArr = [];
        result.forEach(item => {
          let obj = {};
          if (item.lotteryResult) {
            obj.issueNo = item.issueNo;
            obj.lotteryResult = item.lotteryResult.split(",");
            lotteryResultArr.push(obj);
          } else {
            obj.issueNo = item.issueNo;
            obj.lotteryResult = [];
            lotteryResultArr.push(obj);
          }
        });
        return lotteryResultArr;
      }
    },
//    methods: {
//      selectIssue(a) {
//        this.Issue = a;
//      }
//    },
    filters: {
      getSum(arr) {
        if (arr.length != 0) {
          return arr.reduce((a, b) => {
            return Number(a) + Number(b);
          });
        }
      }
    }
  };
</script>
<style scoped>

</style>
