<template>
  <div>
    <lottery-tag style="margin:20px auto 0"></lottery-tag>
    <div class="codeNav">
      <a href="">最近20期</a>
      <a href="">最近30期</a>
      <a href="">最近50期</a>
      <a href="">最近100期</a>
      <a href="">前天</a>
      <a href="">昨天</a>
      <a href="">今天</a>
    </div>
    <div class="page_list chartsTable" id="chartsDiv">
      <table id="chartsTable" border="0" cellpadding="0" cellspacing="1">
        <tr class="th">
          <td rowspan="2" class="jiangqi">期号</td>
          <td rowspan="2" colspan="5">开奖号码</td>
          <td rowspan="1" colspan="10">万位</td>
          <td rowspan="1" colspan="10">千位</td>
          <td rowspan="1" colspan="10">百位</td>
          <td rowspan="1" colspan="10">十位</td>
          <td rowspan="1" colspan="10">个位</td>
        </tr>
        <tr class='th'>
          <td class="wdh">0</td>
          <td class="wdh">1</td>
          <td class="wdh">2</td>
          <td class="wdh">3</td>
          <td class="wdh">4</td>
          <td class="wdh">5</td>
          <td class="wdh">6</td>
          <td class="wdh">7</td>
          <td class="wdh">8</td>
          <td class="wdh">9</td>
          <td class="wdh">0</td>
          <td class="wdh">1</td>
          <td class="wdh">2</td>
          <td class="wdh">3</td>
          <td class="wdh">4</td>
          <td class="wdh">5</td>
          <td class="wdh">6</td>
          <td class="wdh">7</td>
          <td class="wdh">8</td>
          <td class="wdh">9</td>
          <td class="wdh">0</td>
          <td class="wdh">1</td>
          <td class="wdh">2</td>
          <td class="wdh">3</td>
          <td class="wdh">4</td>
          <td class="wdh">5</td>
          <td class="wdh">6</td>
          <td class="wdh">7</td>
          <td class="wdh">8</td>
          <td class="wdh">9</td>
          <td class="wdh">0</td>
          <td class="wdh">1</td>
          <td class="wdh">2</td>
          <td class="wdh">3</td>
          <td class="wdh">4</td>
          <td class="wdh">5</td>
          <td class="wdh">6</td>
          <td class="wdh">7</td>
          <td class="wdh">8</td>
          <td class="wdh">9</td>
          <td class="wdh">0</td>
          <td class="wdh">1</td>
          <td class="wdh">2</td>
          <td class="wdh">3</td>
          <td class="wdh">4</td>
          <td class="wdh">5</td>
          <td class="wdh">6</td>
          <td class="wdh">7</td>
          <td class="wdh">8</td>
          <td class="wdh">9</td>
        </tr>
        <tr name="ball_row">
          <td class='issue'>
            <div class="issueinfo">20170808116</div>
          </td>
          <td align="center" class="codetd">
            <div class="historycode">4</div>
          </td>
          <td align="center" class="codetd">
            <div class="historycode">0</div>
          </td>
          <td align="center" class="codetd">
            <div class="historycode">1</div>
          </td>
          <td align="center" class="codetd">
            <div class="historycode">6</div>
          </td>
          <td align="center" class="codetd">
            <div class="historycode">8</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">4</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">1</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">34</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">9</div>
          </td>
          <td class="charball td0" align="center">
            <div class="ball01">4</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">24</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">6</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">5</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">11</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">3</div>
          </td>
          <td class="charball td0" align="center">
            <div class="ball01">0</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">5</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">3</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">4</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">11</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">7</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">1</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">2</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">30</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">10</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">2</div>
          </td>
          <td class="charball td0" align="center">
            <div class="ball01">1</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">3</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">15</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">5</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">12</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">4</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">6</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">8</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">1</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">4</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">3</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">27</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">10</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">14</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">19</div>
          </td>
          <td class="charball td0" align="center">
            <div class="ball01">6</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">1</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">6</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">5</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">18</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">5</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">7</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">1</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">36</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">6</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">4</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">2</div>
          </td>
          <td class="charball td0" align="center">
            <div class="ball01">8</div>
          </td>
          <td class="wdh td0" align="center">
            <div class="ball13">14</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import lotteryTag from '@/components/common/headlottery';
export default {
  components: { lotteryTag, },
}
</script>
<style scoped>
.codeNav {
  margin: 20px auto;
  width: 800px;
  overflow: hidden;
  height: 30px;
}

.codeNav a {
  border: 1px solid #ea721a;
  border-radius: 5px;
  color: #ea721a;
  display: inline-block;
  margin-right: 7px;
  padding: 0 10px;
  transition: all 0.2s linear 0s;
  text-decoration: none;
  font-size: 12px;
  line-height: 20px;
}

.codeNav a:hover {
  background-color: #ea721a;
  color: #fff;
}

#chartsDiv {
  width: 1806px;
  margin: 0 auto;
  position: relative;
  width: auto;
  min-width: 100%;
  height: auto;
}

#chartsTable {
  width: 95%;
  margin: 20px auto;
  text-align: center;
}

#chartsTable td {
  border: 1px solid #dddddd;
  padding: 2px;
  vertical-align: middle;
  height: 30px;
  color: #333;
  font-size: 12px;
}

.jiangqi {
  width: 120px;
}
td.codetd {
    padding: 0 !important;
    margin: 0;
}
.codetd {
    width: 30px;
}
.historycode, .ball01 {
    text-align: center;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 20px;
    border: 1px #dd5e00 solid;
    box-shadow: 1px 1px 2px #6a2e01;
    font-size: 14px;
    color: #fff;
    background: #dd5e00;
    font-weight: 800;
    -webkit-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -o-transition: all .2s linear;
    -ms-transition: all .2s linear;
    transition: all .2s linear;
}
td.td0 {
    background: #ffe;
}
.ball13 {
    color: #cecece;
}
.ball01 {
    border: 1px #11B35E solid;
    color: #fff;
    background: #11B35E;
}
.ball01_yellow {
    border: 1px #EA721A solid;
    color: #fff;
    background: #EA721A!important;
}
.charball{
  width: 30px;
}
</style>
