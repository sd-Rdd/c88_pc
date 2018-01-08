<template>
    <div class="lottery-main">
        <bet-header headRight="two" :cha="cha" @onGetData="getData"></bet-header>
        <lucky28></lucky28>
    </div>
</template>
<script>
import betHeader from "../betComponents/bet_head";
import lucky28 from "../betComponents/bet_lucky_28";
import tools from 'tools/tools.js';
export default {
  data() {
    return {
      cha: null
    };
  },
  methods: {
    getData() {
      this.$store
        .dispatch("getLotteryData", {
          this: this,
          data: { lotteryNo: "51" ,memberId: tools.store.getData("user").id}
        })
        .then(() => {
          this.cha = this.$store.state.runLotteryTime-this.$store.state.sysDate;
        });
      /* 向vuex中发送彩种编号 */
      this.$store.commit("changeLotteryCode", { a: "51" });
    }
  },
  created() {
    this.getData();
  },
  components: { betHeader, lucky28 },
  destroyed(){
    this.$store.commit('initLotteryData');
  }
};
</script>
<style scoped>

</style>