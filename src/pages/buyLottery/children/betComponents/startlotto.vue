<template>
  <div class="lottery-record animated fadeInRightBig">
    <div class="record">
      <div class="five-group">
        <div class="group" v-for="(val,index) in resultList" :key="index" >
                    <span class="five_issue" >
                        第
                        <span>{{val.issueNo}}</span>期:
                    </span>
          <span class="ball null" v-for="(val1,index) in val.lotteryResult" :key="index" >{{val1}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
      resultList() {
        let result = this.$store.state.lotteryResultList.slice(0, 20);
        let lotteryResultArr = [];
        result.forEach((item) => {
          let obj = {};
          if (item.lotteryResult) {
            obj.issueNo = item.issueNo;
            obj.lotteryResult = item.lotteryResult.split(',');
            lotteryResultArr.push(obj);
          } else {
            obj.issueNo = item.issueNo;
            obj.lotteryResult = ['正', '在', '开', '奖', '...'];
            lotteryResultArr.push(obj);
          }
        });
        return lotteryResultArr;
      }
    }
  }
</script>
<style lang="less" scoped>
  * {
    box-sizing: border-box;
    color: #333;
    font-family: Microsoft YaHei, Arial, Helvetica, "sans-serif";
    outline: none;
    cursor: inherit;
  }

  .recent {
    /*background: #5D4981;*/
    color: #f00;
  }
</style>
