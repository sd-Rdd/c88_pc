<template>
    <div class="lottery-lobby" style="position:relative;" v-loading.lock="fullscreenLoading" element-loading-customClass="loadingClass">
        <div class="lobby-item" v-for="(val,index) in lotteryCard" :key="index">
            <div class="detal">
                <div class="info">
                    <!--<img :src="val.logo" />-->
                    <div class="ct">
                        <div class="lottery-name">{{val.lotteryName}}</div>
                        <div class="issue-cd">
                            <!--<div>第{{val.newIssue}}期</div>-->
                            <counter :endtime="val.runLotteryTime" :startTime="sysDate" @onTimeOut="onTimeOut(val.id)"></counter>
                        </div>
                    </div>
                </div>
                <!-- 等接口里有开奖结果数据时再打开！！！！！！！！！！！ -->
                <!--<div class="results">-->
                    <!--<span>上期开奖</span>-->
                    <!--<div class="inLottery" v-if="!val.lotteryResult">正在开奖</div>-->
                    <!--<div v-else-if="val.lotteryResult.split(',').length>5" class="sBall" v-for="(val1,index) in val.lotteryResult.split(',')" :key="index">{{val1}}</div>-->
                    <!--<div class="ball" v-else v-for="(val1,index) in val.lotteryResult.split(',')" :key="index">{{val1}}</div>-->
                <!--</div>-->
            </div>
            <!--<div class="bottom">-->
              <!--&lt;!&ndash;href="javascript:;"&ndash;&gt;-->
                <!--<a class="fun"  @click="routerNumberMoves">-->
                    <!--<i class="iconfont" style="color: rgb(248, 77, 77); font-size: 20px;"></i>-->
                    <!--<span>号码走势</span>-->
                <!--</a>-->
                <!--<a class="fun" @click="gotoNewPage(val.id)">-->
                    <!--<i class="iconfont" style="color: rgb(96, 199, 140); font-size: 20px;"></i>-->
                    <!--<span>玩法规则</span>-->
                <!--</a>-->
                <!--<router-link class="bet-btn" :to="'/buyLottery/bet'+val.id">立即投注</router-link>-->
            <!--</div>-->
        </div>

        <div class="lobby-item-placeholder"></div>
        <div class="lobby-item-placeholder"></div>
        <div class="lobby-item-placeholder"></div>
        <div class="lobby-item-placeholder"></div>
        <div class="lobby-item-placeholder"></div>
    </div>
</template>
<script>
import counter from './betComponents/counter'
import url from "static/url.js";
export default {
  data() {
    return {
      lotteryCard: null,
      sysDate: '',
      fullscreenLoading: true
    }
  },
  components: { counter },
  methods: {
    routerNumberMoves() {
      this.$router.push('charts')
    },
    gotoNewPage(id) {
      window.open(url + '/rules?lotteryNumber='+id, '')
    },
    getList(){
      this.$http.post('/api/lottery/listLottery', {})
      .then(res => {
        console.log(res.data)
        if (res.data.status == 200) {
          this.lotteryCard = res.data.lotteryList
          this.sysDate = res.data.sysDate
          this.fullscreenLoading = false
        }
      })
      .catch(err => console.log(err))
    },
    onTimeOut(id){
      this.getList()
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style scoped>
a:hover {
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
</style>
