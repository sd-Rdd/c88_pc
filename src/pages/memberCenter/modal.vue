<template>
    <div class="jquery-modal blocker current">
        <div class="buyrecord_box modal">
            <h1>
                注单详情
            </h1>
            <div class="record_info">
                <div class="left"> 注单号 &nbsp; {{recordDtail.orderNo}}</div>
                <div class="right"> 下注时间:{{recordDtail.createDate|datee}} </div>
            </div>
            <div class="record_body">
                <div class="record_data">
                    <div class="left">
                        <em>期号:</em>
                        <span>{{recordDtail.lotteryIssue}}</span>
                    </div>
                    <div class="right">
                        <em>赔率/返点:</em>
                        <span style="max-width:100%;word-wrap:break-word;">{{recordDtail.betOdds+'/'+ recordDtail.rebates}}</span>
                    </div>
                </div>

                <div class="record_data">
                    <div class="left">
                        <em>彩种:</em>
                        <span>{{recordDtail.lotteryName}}</span>
                    </div>
                    <div class="right">
                        <em>投注注数:</em>
                        <span>{{recordDtail.betNum}}</span>
                    </div>
                </div>

                <div class="record_data">
                    <div class="left">
                        <em>单注金额:</em>
                        <span>{{recordDtail.price}}元</span>
                    </div>
                    <div class="right">
                        <em>投注金额:</em>
                        <span>{{recordDtail.betMoney}}元</span>
                    </div>
                </div>

                <div class="record_data">
                    <div class="left">
                        <em>玩法:</em>
                        <span>{{recordDtail.codeName}}</span>
                    </div>
                </div>
                <div class="record_data">
                    <div class="left">
                        <em>下注号码:</em>
                        <span style="max-width:250px;word-wrap:break-word;">{{recordDtail.betNumString}}</span>
                    </div>
                    <div class="right">
                        <em>中奖金额:</em>
                        <span>{{recordDtail.winMoney}}</span>
                    </div>
                </div>

                <div class="record_data">
                    <div class="left">
                        <em>状态:</em>
                        <span>{{recordDtail.isWin|filterStatus(recordDtail.isRepeal)}}</span>
                    </div>
                    <div class="right">
                        <em>盈亏:</em>
                        <template v-if="recordDtail.isRepeal === 1">
                            <span>0元</span>
                        </template>
                        <template v-else>
                            <span>{{recordDtail.betMoney.sub(recordDtail.winMoney)}}元</span>
                        </template>

                    </div>
                </div>

                <div class="record_data">
                    <div class="kaijiang">
                        <div class="open_number_text">
                            <em>开奖号码:</em>
                        </div>
                        <div>
                            <div class="six_number_div" v-if="recordDtail.lotteryResult">
                                <div class="six_number" style="background-color:#FF7F00" v-for="(item,index) in recordDtail.lotteryResult.split(',')" :key="index">{{item}}</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="close-modal " @click="$emit('onClose')">Close</a>
        </div>
    </div>
</template>
<script>
import ccaa from 'tools/tools.js'
export default {
  props: ['recordDtail'],
  filters: {
    filterStatus(a, b) {
      if (a == 0 && b == 0) {
        return '未中奖'
      } else if (a == -1 && b == 0) {
        return '待开奖'
      } else if ((a > 1 || a == 1) && b == 0) {
        return '已中奖'
      } else if (a == -1 && b == 1) {
        return '已撤单'
      }
    },
    datee(a) {
      return ccaa.getDate(a)
    }
  }
}
</script>
<style lang="less" scoped>
.blocker {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 999;
  padding: 20px;
  box-sizing: border-box;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.75);
  text-align: center;
  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    margin-right: -0.05em;
  }
}

.buyrecord_box,
.view_withdraw_box {
  overflow: hidden;
  padding-bottom: 15px;
}

.buyrecord_box {
  width: 620px;
  min-width: 620px !important;
  h1 {
    font-size: 1.125rem;
    font-weight: 100;
    padding: 10px 20px;
    color: #e94335;
  }
  .record_info {
    background: #f7f7f7;
    overflow: hidden;
    padding-top: 7px;
    padding-bottom: 7px;
    line-height: 15px;
    padding-left: 20px;
    padding-right: 20px;
    clear: both;
    color: #666;
    font-size: 0.8125rem;
  }
  .record_body {
    overflow: hidden;
    .record_data {
      margin: 8px auto;
      overflow: hidden;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
      margin-left: 20px;
      margin-right: 20px;
      padding-top: 5px;
      line-height: 34px;
      font-size: 0.875rem;
      em {
        display: inline-block;
        width: 76px;
        text-align: left;
        display: block;
        float: left;
      }
      span {
        display: inline-block;
      }
    }
  }
}

.open_number_text {
  float: left;
  height: 68px;
}

.six_number_div {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.six_number {
  font-size: 16px;
  background-size: 100%;
  cursor: default;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  margin: 0px 2px;
}

.modal {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  z-index: 2;
  max-width: 730px;
  box-sizing: border-box;
  width: 90%;
  background: #fff;
  text-align: left;
  border: 10px solid #ede2d4;
  a.close-modal {
    position: absolute;
    top: 9.5px;
    right: 9.5px;
    display: block;
    width: 22px;
    height: 22px;
    text-indent: -9999px;
    background: url(https://cpweb.kosungames.com/cp1516/Public/static/images/cs.png)
      no-repeat 0 0;
    background-size: 22px;
  }
}

.left {
  overflow: hidden;
  float: left;
}

.right {
  overflow: hidden;
  float: right;
}
</style>
