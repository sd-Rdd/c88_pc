<template>
  <div class="tools">
    <div class="yu_e">
      <div class="toggle-money show-money">
        余额
        <span  class="money">{{balance | transforBalance}}</span>
        元
       <i class="iconfont icon-refresh refresh" @click="refreshBalance"></i>
      </div>
    </div>
    <div class="toolslist">
      <ul class="ctqc">
        <li>
          <a @click="openWin('/memberCenter/caiwu/1')" class="recharge" v-if="user.type!=0" >充值</a>
        </li>
        <li>
          <a @click="openWin('/memberCenter/caiwu/2')" v-if="user.type!=0">提款</a>
        </li>
      </ul>
      <ul class="twbb">
        <li>
          <a @click="openWin('/memberCenter/bettingRecord')">投注记录</a>
        </li>
        <li>
          <a @click="openWin('/rules')">玩法介绍</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//  import vMenu from "../../children/aside";
  import lotteryLobby from "../../children/lotteryLobby";
  import vHeader from "components/header/header";
  import vBody from "components/common/body_fixed";
  import vFoot from "components/footer/footer";
  import betResult from '../../children/betComponents/bet_result'
  import betChaseNumber from '../../children/betComponents/bet_chasenumber'
  import ccaa from "tools/tools.js";
  import url from "static/url.js";
  export default {
    components: { lotteryLobby, vHeader, vBody, vFoot, betResult, betChaseNumber},
    data() {
      return {
        form: {
          memberName: null,
          passWord: null,
        },
        verfyCode: null,
        verfyCode2: null,
        user: null,
        balance: null,
        win: null,
      };
    },
    created() {
      this.getRandom();
      this.user = ccaa.store.getData("user");
      this.balance = JSON.parse(localStorage.getItem("balance"));
      this.refreshBalance()
    },
    methods: {
      openWin(ad){
        window.open(url + ad, "member", "width=1200, height=700,left=50,top=50,");
      },
      getRandom() {
        this.verfyCode2 = ccaa.randomFn(1000, 9999);
      },
      quit() {
        localStorage.clear();
        window.location.reload();
      },
      refreshBalance() {
        this.$http
          .post("/member/getBlance", {memberId: this.user.id})
          .then(res => {
            //console.log(res.data);
            if (res.data.status == 200) {
              ccaa.store.setData("balance", res.data.balance);
              this.balance = res.data.balance;
            }
          })
          .catch(res => console.log(res));
      }
    },
    filters: {
      transforBalance(a) {
        return Number(a).toFixed(3);
      }
    }
  };
</script>
<style scoped>


</style>
