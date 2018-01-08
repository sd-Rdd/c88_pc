<template>
  <div class="tz_box_main" id="tz_box_main">
    <ul class="tz_box_tab" id="tz_box_tab">
      <h1>
        <i class="jinbi"></i>快速投注</h1>
      <div class="tz_tab">
        <li :class="{current:overNum==item.lotteryNo}" @mouseover="over(item.lotteryNo)" v-for="(item,index) in result" :key="index">{{item.lotteryName}}</li>
      </div>
    </ul>
    <div class="show_box_main" id="show_box_main">
      <div class="tz_item" v-show="overNum==item.lotteryNo" v-for="(item,index) in result" :key="index">
        <div class="t">
          <div class="left view_qi">
            第
            <span class="issure">{{item.newIssue}}</span>期截止：
            <span lottertid="1" class="red restTime1" nowtime="1501568334" endtime="1501568340"></span>
          </div>
          <div class="right cho">
            <a href="#" @click='openLotteryWin("/buyLottery/bet"+item.lotteryNo)'>手动选号</a>
            <a href="javascript:;" target="_blank">走势图</a>
          </div>
        </div>
        <div class="list qiu_box">
          <div class="ball-wrap" v-for="(item,index) in randomArr" :key="index">
            <div class="ball" number="0">{{item}}</div>
          </div>
        </div>
        <div class="foot">
          <div class="left add">
            <span class="plus" @click="add">+</span>
            <input type="text" class="plus_value" v-model="zero">
            <span class="sub" @click="sub">-</span>
          </div>
          <div class="left">
            倍，共
            <span class="red bet_money">{{2*zero}}</span> 元
          </div>
          <div class="right">
            <a class="rf" @click="getRandom">
              <i class="iconfont icon-shuaxin"></i>
              换一注
            </a>
            <a class="btn btn-default" @click="openLotteryWin2('/buyLottery/bet'+item.lotteryNo)">立即投注</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url from 'static/url.js'
import ccaa from 'tools/tools.js'
export default {
  data() {
    return {
      overNum: 11, //记录当前展示的彩种
      zero: 1, //倍数数据记录
      result: [],
      randomArr: [], //生成随机数的数组
      unit: null //对于天津时时彩特殊玩法记录随机数应用在哪个位置上
    }
  },
  watch: {
    overNum(val) {
      //改变彩种的时候生成随机数
      this.getRandom()
    }
  },
  methods: {
    /* 生成随机数的方法 */
    getRandom() {
      //根据当前彩种编号和玩法code生成相应的号码
      if (this.overNum == 11) {
        //山东11选5
        let arr = ccaa.getRandomArr(5, 1, 11)
        this.randomArr = arr.map(item => {
          if (item < 10) {
            return '0' + item
          } else {
            return item
          }
        })
      } else if (this.overNum == 23) {
        //天津时时彩
        this.randomArr = ccaa.getRandomArr(1, 0, 9)
        this.unit = ccaa.getRandomArr(1, 0, 4)
      } else if (this.overNum == 32) {
        //广西快三
        this.randomArr = ccaa.getRandomArr(1, 3, 18)
      } else if (this.overNum == 41) {
        //北京PK10
        let arr = ccaa.getRandomArr(3, 1, 10)
        this.randomArr = arr.map(item => {
          if (item < 10) {
            return '0' + item
          } else {
            return item
          }
        })
      }
    },
    //跳转到购彩页面，并传递选的号和默认玩法code数据
    openLotteryWin2(a) {
      let price = 2*this.zero
      let arr = []
      if (this.overNum == 23) {
        arr = this.unit.concat(this.randomArr)
        console.log(arr)
      } else {
        arr = this.randomArr
        console.log(arr)
      }
      let win = window.open(
        url + a + '?number=' + arr + '&price=' + price,
        'lottery',
        'width=1300, height=950,left=10,top=10,'
      )
      win.focus()
    },
    openLotteryWin(a) {
      let win = window.open(
        url + a,
        'lottery',
        'width=1300, height=950,left=10,top=10,'
      )
      win.focus()
    },
    over(a) {
      this.overNum = a
    },
    add() {
      this.zero++
    },
    sub() {
      if (this.zero > 1) {
        this.zero--
      } else {
        alert('最小投注1倍')
      }
    }
  },
  created() {
    //刚进来的时候生成第一个选项的随机数
    this.getRandom()
    this.$http
      .post('/index/quick/injection')
      .then(res => {
        //console.log(res.data);
        if (res.data.status == 200) {
          this.result = res.data.result
        }
      })
      .catch(res => console.log(res))
  }
}
</script>
<style scoped>
.tz_box_main {
  overflow: hidden;
}

.tz_box_main ul {
  overflow: hidden;
}

.tz_box_main ul.tz_box_tab {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
}

.tz_box_main ul.tz_box_tab h1 {
  overflow: hidden;
  color: #666666;
  font-size: 12px;
  font-weight: 100;
  float: left;
}

.tz_box_main ul.tz_box_tab h1 i {
  overflow: hidden;
  background: url('../../../assets/image/jinbi.png');
  background-size: 22px 27px;
  display: inline-block;
  width: 22px;
  height: 27px;
  vertical-align: middle;
  margin-right: 10px;
}

.tz_box_main ul.tz_box_tab .tz_tab {
  width: 370px;
  float: right;
  position: relative;
  height: 40px;
}

.tz_box_main ul.tz_box_tab .tz_tab li {
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  width: 70px;
  height: 38px;
  text-align: center;
  display: block;
  z-index: 6;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
}

.tz_box_main ul.tz_box_tab .tz_tab li.current {
  overflow: hidden;
  color: #e94335;
  border-bottom: 2px solid #e94335;
}

.tz_box_main .show_box_main {
  overflow: hidden;
}

.tz_box_main .show_box_main .tz_item {
  overflow: hidden;
}

.tz_box_main .show_box_main .tz_item .t {
  overflow: hidden;
  height: 60px;
  line-height: 70px;
  margin-bottom: 5px;
  clear: both;
  border: 1px solid transparent;
}

.tz_box_main .show_box_main .tz_item .t .view_qi {
  overflow: hidden;
  padding-left: 14px;
  font-size: 12px;
}

.tz_box_main .show_box_main .tz_item .t .view_qi span {
  overflow: hidden;
}

.tz_box_main .show_box_main .tz_item .t .cho {
  overflow: hidden;
  padding-right: 10px;
  font-size: 12px;
}

.tz_box_main .show_box_main .tz_item .t .cho a {
  overflow: hidden;
  color: #276dff;
}

.tz_box_main .show_box_main .tz_item .t .cho a a:hover {
  overflow: hidden;
}

.tz_box_main .show_box_main .tz_item .list {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-top: 20px;
}

.tz_box_main .show_box_main .tz_item .ball-wrap {
  width: 40px;
  height: 40px;
  background-color: #e94335;
  border-radius: 50%;
  display: flex;
  justify-content: center;
}

.tz_box_main .show_box_main .tz_item .ball {
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  margin-top: 3px;
  font-size: 16px;
  color: #e94335;
}

.tz_box_main .show_box_main .tz_item .ball-wrap + .ball-wrap {
  margin-left: 10px;
}

.tz_box_main .show_box_main .tz_item .qiu_box {
  overflow: hidden;
  background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/qiuqiu@2x.png);
  background-size: 459px 75px;
  background-repeat: no-repeat;
  width: 379px;
  height: 75px;
  margin: 0 auto;
  padding-left: 40px;
  line-height: 105px;
  padding-right: 40px;
  margin-bottom: 20px;
  margin-top: 5px;
  clear: both;
  border: 1px solid transparent;
}

.tz_box_main .show_box_main .tz_item .qiu_box .qiu_box_number {
  border-radius: 50%;
  background-color: #00a1cb;
  padding: 5px;
}

.tz_box_main .show_box_main .tz_item .foot {
  overflow: hidden;
  margin-top: 1px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid transparent;
}

.tz_box_main .show_box_main .tz_item .foot .left {
  overflow: hidden;
  width: 108px;
  height: 28px;
  margin-right: 14px;
  vertical-align: middle;
  margin-top: 4px;
}

.tz_box_main .show_box_main .tz_item .foot .left:not(.add) {
  line-height: 28px;
}

.tz_box_main .show_box_main .tz_item .foot .left.add {
  overflow: hidden;
  width: 108px;
  height: 28px;
  margin-right: 14px;
}

.tz_box_main .show_box_main .tz_item .foot .left.add span {
  overflow: hidden;
}

.tz_box_main .show_box_main .tz_item .foot .left.add span.plus,
.tz_box_main .show_box_main .tz_item .foot .left.add span.sub {
  overflow: hidden;
  width: 26px;
  height: 26px;
  background: #fff;
  border: 1px solid #ddd;
  text-align: center;
  line-height: 26px;
  vertical-align: middle;
  float: left;
  cursor: pointer;
}

.tz_box_main .show_box_main .tz_item .foot .left.add input {
  overflow: hidden;
  width: 42px;
  height: 26px;
  margin: 0;
  padding: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-left: none;
  border-right: none;
  vertical-align: middle;
  float: left;
  color: #666;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
}

.tz_box_main .show_box_main .tz_item .foot .left span {
  overflow: hidden;
}

.tz_box_main .show_box_main .tz_item .foot .right {
  overflow: hidden;
  vertical-align: middle;
}

.tz_box_main .show_box_main .tz_item .foot .right a {
  overflow: hidden;
}

.tz_box_main .show_box_main .tz_item .foot .right a.rf {
  overflow: hidden;
  font-size: 14px;
  color: #333333;
  vertical-align: middle;
  text-decoration: none;
}

.tz_box_main .show_box_main .tz_item .foot .right a.btn {
  overflow: hidden;
  width: 100px;
  height: 36px;
  padding: 0;
  line-height: 36px;
  font-size: 14px;
  vertical-align: middle;
  border-radius: 0px;
  text-decoration: none;
}

.left {
  overflow: hidden;
  float: left;
}

.right {
  overflow: hidden;
  float: right;
}

.red {
  color: red !important;
}

a.btn-default,
button.btn-default,
input.btn-default,
.btn-default {
  background: #e94335;
  color: #fff;
}

.btn {
  display: inline-block;
  padding: 10px;
  border: 0px;
  font-size: 1.0625rem;
  color: #fff;
  text-align: center;
  border-radius: 4px;
}

.foot .left {
  font-size: 12px;
}
</style>