<template>
    <div>
        <v-header></v-header>
        <div class="trendLhc">
          <table id="testtd" class="number-moves-table" border="0" cellpadding="0" cellspacing="1">
            <thead style="    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;">
            <tr>
              <th rowspan="2">期号</th>
              <th rowspan="2" colspan="5">开奖号码</th>
              <th  v-for="item in countingUnit"  colspan="10">
                {{item}}
              </th>
            </tr>
            <tr>
              <th v-for="itemNum in defaultNum" >{{itemNum-1}}</th>
              <th v-for="itemNum in defaultNum" >{{itemNum-1}}</th>
              <th v-for="itemNum in defaultNum" >{{itemNum-1}}</th>
              <th v-for="itemNum in defaultNum" >{{itemNum-1}}</th>
              <th v-for="itemNum in defaultNum" >{{itemNum-1}}</th>
            </tr>
            </thead>
            <tbody>
            <tr  v-for="itemNum in countingUnit">
              <td style="background: #fff;">201802081345</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">3</div>
              </td>
              <td class="white">
                <div class="historycode">7</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td class="white">
                <div class="historycode">2</div>
              </td>
              <td class="white">
                <div class="historycode">8</div>
              </td>
              <td v-for="(itemLeave, index) in leaveOutNum" :id="tdId(index)">{{itemLeave-1}}</td>
              <td v-for="(itemLeave, index) in leaveOutNum" :id="tdId2(index)">{{itemLeave-1}}</td>
              <td v-for="(itemLeave, index) in leaveOutNum" :id="tdId3(index)">{{itemLeave-1}}</td>
              <td v-for="(itemLeave, index) in leaveOutNum" :id="tdId4(index)">{{itemLeave-1}}</td>
              <td v-for="(itemLeave, index) in leaveOutNum" :id="tdId5(index)">{{itemLeave-1}}</td>
              <!--<td v-for="(itemLeave, index) in leaveOutNum" :id="tdId(index)">{{itemLeave-1}}</td>-->
            </tr>
            <tr>
              <td style="background: #fff;">201802081346</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">2</div>
              </td>
              <td class="white">
                <div class="historycode">5</div>
              </td>
              <td class="white">
                <div class="historycode">7</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td class="white">
                <div class="historycode">6</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081347</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">5</div>
              </td>
              <td class="white">
                <div class="historycode">9</div>
              </td>
              <td class="white">
                <div class="historycode">7</div>
              </td>
              <td class="white">
                <div class="historycode">5</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081348</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">5</div>
              </td>
              <td class="white">
                <div class="historycode">1</div>
              </td>
              <td class="white">
                <div class="historycode">6</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081349</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">5</div>
              </td>
              <td class="white">
                <div class="historycode">7</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td class="white">
                <div class="historycode">2</div>
              </td>
              <td class="white">
                <div class="historycode">6</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081350</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">5</div>
              </td>
              <td class="white">
                <div class="historycode">5</div>
              </td>
              <td class="white">
                <div class="historycode">5</div>
              </td>
              <td class="white">
                <div class="historycode">2</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081351</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">7</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td class="white">
                <div class="historycode">2</div>
              </td>
              <td class="white">
                <div class="historycode">2</div>
              </td>
              <td class="white">
                <div class="historycode">6</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081352</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">6</div>
              </td>
              <td class="white">
                <div class="historycode">2</div>
              </td>
              <td class="white">
                <div class="historycode">8</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td class="white">
                <div class="historycode">6</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081353</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">4</div>
              </td>
              <td class="white">
                <div class="historycode">6</div>
              </td>
              <td class="white">
                <div class="historycode">8</div>
              </td>
              <td class="white">
                <div class="historycode">8</div>
              </td>
              <td class="white">
                <div class="historycode">2</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081354</td>
              <td class="codetd white"  style="background: #fff;">
                <div class="historycode">2</div>
              </td>
              <td class="white">
                <div class="historycode">8</div>
              </td>
              <td class="white">
                <div class="historycode">5</div>
              </td>
              <td class="white">
                <div class="historycode">6</div>
              </td>
              <td class="white">
                <div class="historycode">4</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            </tbody>
          </table>
          <canvas id="myCanvas" width="1800" height="800" style=" top:193px; left:47px; position:absolute;"></canvas>
        </div>




      <form id="form1" runat="server">
        <table id="zstable">
          <thead></thead>
          <tbody></tbody>
        </table>
        <div id="canvasdiv">
        </div>
      </form>

        <v-body></v-body>
        <v-foot></v-foot>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import vBody from 'components/common/body_fixed';
import vFoot from 'components/footer/footer';
export default {
    components: { vHeader, vBody, vFoot },
    props: {
      defaultNum:{
        type: Number,
        default: 10
      },
      leaveOutNum:{
        type: Number,
        default: 10
      },
    },
    data() {
        return {
          countingUnit:['万位','千位','百位','十位','个位']
        }
    },
    created(){
//     this.CreateLine()
    },
    methods: {
      tdId: function (index){
        return "t1_" +index
      },
      tdId2: function (index){
        return "t2_" +index
      },
      tdId3: function (index){
        return "t3_" +index
      },
      tdId4: function (index){
        return "t4_" +index
      },
      tdId5: function (index){
        return "t5_" +index
      },
      CreateLine() {
        var c=document.getElementById("myCanvas");
        var table1  = document.getElementById("testtd");
        var  TDS = table1.getElementsByClassName("historycode");
        var cxt2=c.getContext("2d");
        cxt2.strokeStyle = 'rgba(255,0,0,0.5)'; //颜色
        var icount =0;
        for(var i=0; i < TDS.length ; i++)
        {
          if (TDS[i].innerHTML == "0")
          {
            var H = TDS[i].offsetHeight/2;
            if (icount==0){
              cxt2.moveTo(TDS[i].offsetLeft,TDS[i].offsetTop + H) ;
            }
            else
            {
              cxt2.lineTo(TDS[i].offsetLeft,TDS[i].offsetTop + H) ;
            }
            icount = icount +1;
          }
        }
        cxt2.stroke();
      }

    }
}
</script>
<style lang="less" scoped>
.main {
    width: 1000px !important;
    margin: 0 auto;
    overflow: hidden;
}
.trendLhc {
  margin: 40px 0;
}
.trendLhc td{
  border:1px solid #ddd;
}
  .number-moves-table{
    width: 95%;
    border: 0;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 11px;
    font-family: Arial;
    margin: 0 auto;
    th {
      border: 1px solid #dddddd;
      padding: 2px;
      vertical-align: middle;
      height: 30px;
      border-collapse: collapse;
    }
    td {
      border: 1px solid #dddddd;
      /*padding: 2px;*/
      width: 26px;
      vertical-align: middle;
      height: 30px;
      text-align: center;
      background: #FFFFEE;
    }
    .historycode {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 20px;
      border: 1px #dd5e00 solid;
      box-shadow: 1px 1px 2px #6a2e01;
      font-size: 14px;
      text-align: center;
      color: #fff;
      background: #dd5e00;
      font-weight: 800;
    }
    .white {
      background: #fff;
    }
  }
</style>
