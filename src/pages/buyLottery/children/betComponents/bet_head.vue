<template>
  <div>
    <div class="announcement">
      <div class="currentLottery animated fadeInLeftBig">
        <div class="lottery_logo">
          <img :src="logo" alt="logo">
        </div>
        <div class="lottery_info">
          <div class="lottery_name">{{lotteryName}}</div>
          <div class="issue">
            第
            <span>
            {{newIssue}}</span>期
        </div>
          <!--<div class="btn">-->
          <!--<button>-->
          <!--<i class="iconfont"></i>-->
          <!--<a href="javascript:;" target="_blank">号码走势</a>-->
          <!--</button>-->
          <!--</div>-->
        </div>
      </div>
      <div class="lottery-time animated fadeInDownBig">
        <!--<div class="prompt" v-if="isShow">已开盘，欢迎投注。距离关盘还有：</div>-->
        <!--<div class="prompt" v-else>未开盘：</div>-->
        <div class="timer">
          <div class="board" v-if="time.hour">{{time.hour}}</div>
          <div class="board" v-else>00</div>
          <div class="splice">
            <!--<img src="../../../../assets/image/dian.png" alt=":" />-->
          </div>
          <div class="board" v-if="time.minute">{{time.minute}}</div>
          <div class="board" v-else>00</div>
          <div class="splice">
            <img src="../../../../assets/image/dian.png" alt=":" />
          </div>
          <div class="board" v-if="time.second">{{time.second}}</div>
          <div class="board" v-else>00</div>
        </div>
      </div>
      <component :is="headRight"></component>
    </div>
    <div class="tools">
        <balance></balance>
    </div>
  </div>

</template>
<script>
import one from "./bet_head_right1";
import two from "./bet_head_right2";
import three from "./bet_head_right3";
import Balance from "./balance";
export default {
  data() {
    return {
      copCha: null,
      fre: null, //时间定时器
      fre2: null, //定时去请求数据的定时器
      isShow: false
    };
  },
  props: ["headRight", "cha"],
  components: { one, two, three, Balance},
  methods: {
    formate(time) {
      let cha1 = time / 1000;
      let hour = parseInt(cha1 / 3600);
      let minute = parseInt((cha1 % 3600) / 60);
      let second = parseInt((cha1 % 3600) % 60);
      return {
        hour: this.p(hour),
        minute: this.p(minute),
        second: this.p(second)
      };
    },
    p(n) {
      return n < 10 ? "0" + n : n;
    },
    interval() {
      this.fre = setInterval(() => {
        if (this.copCha < 1000) {
          this.isShow = false;
          //console.log("该停了");
          clearInterval(this.fre);
          this.interval2();
        } else {
          //console.log("我在运行");
          this.copCha -= 1000;
        }
      }, 1000);
    },
    interval2() {
      this.fre2 = setInterval(() => {
        this.$emit("onGetData");
        console.log("每2秒去请求一次数据");
      }, 2000);
    }
  },
  computed: {
    //isTitle() { return this.$store.state.isTitle },
    time() {
      return this.formate(this.copCha);
    },
    lotteryNo() {
      return this.$store.state.lotteryCode;
    },
    logo() {
      return this.$store.state.logo;
    },
    lotteryName() {
      return this.$store.state.lotteryName;
    },
    newIssue() {
      return this.$store.state.newIssue;
    },
    nextIssue() {
      return this.$store.state.nextIssue;
    }
  },
  watch: {
    cha(val, oldval) {
      if (val > 1000) {
        clearInterval(this.fre2);
        clearInterval(this.fre);
        this.isShow = true;
        this.copCha = val;
        this.interval();
      } else {
        clearInterval(this.fre2);
        clearInterval(this.fre);
        this.interval2();
      }
    }
  },
  beforeDestroy() {
    //console.log("---------------------------------------------------------");
    clearInterval(this.fre);
    clearInterval(this.fre2);
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
</style>
