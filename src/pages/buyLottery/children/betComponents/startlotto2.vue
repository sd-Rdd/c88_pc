<template>
  <div >
    <div class="record">
      <div class="five-group"  style="padding-left: 12px" v-if="resultList.length!=0">
        <div class="group" v-for="(item,index) in resultList" :key="index">
          <span class="five_issue">
            第
            <span>{{item.issueNo}}</span>期：
          </span>

          <div class="lucky-reacords" v-if="item.lotteryResult.length!=0">
            <span>{{item.lotteryResult[0]}}</span>
            <span>+</span>
            <span>{{item.lotteryResult[1]}}</span>
            <span>+</span>
            <span>{{item.lotteryResult[2]}}</span>
            <span>=</span>
            <span>{{item.lotteryResult|getSum}}</span>
          </div>
        </div>
      </div>
    </div>
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
        let result = this.$store.state.lotteryResultList.slice(0,20);
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
