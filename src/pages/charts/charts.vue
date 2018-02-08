<template>
    <div>
        <v-header></v-header>
        <div class="trendLhc">
          <table class="number-moves-table" border="0" cellpadding="0" cellspacing="1">
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
            <tr></tr>
            </thead>
            <tbody>
            <tr>
              <td style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd" style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">3</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd" style="background: #fff;">
                <div class="historycode">9</div>
                <div class="historycode">9</div>
                <div class="historycode">8</div>
                <div class="historycode">7</div>
                <div class="historycode">5</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">3</div>
                <div class="historycode">7</div>
                <div class="historycode">4</div>
                <div class="historycode">2</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">4</div>
                <div class="historycode">1</div>
                <div class="historycode">3</div>
                <div class="historycode">5</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">5</div>
                <div class="historycode">6</div>
                <div class="historycode">6</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">6</div>
                <div class="historycode">1</div>
                <div class="historycode">3</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">8</div>
                <div class="historycode">2</div>
                <div class="historycode">2</div>
                <div class="historycode">5</div>
                <div class="historycode">1</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">8</div>
                <div class="historycode">6</div>
                <div class="historycode">5</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">3</div>
                <div class="historycode">9</div>
                <div class="historycode">5</div>
                <div class="historycode">7</div>
                <div class="historycode">6</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
                <div class="historycode">2</div>
                <div class="historycode">4</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd" style="background: #fff;">
                <div class="historycode">3</div>
                <div class="historycode">8</div>
                <div class="historycode">8</div>
                <div class="historycode">5</div>
                <div class="historycode">3</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd" style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            <tr>
              <td  style="background: #fff;">201802081345</td>
              <td colspan="5" class="codetd"  style="background: #fff;">
                <div class="historycode">7</div>
                <div class="historycode">2</div>
                <div class="historycode">1</div>
                <div class="historycode">5</div>
                <div class="historycode">8</div>
              </td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
              <td v-for="itemLeave in leaveOutNum">{{itemLeave-1}}</td>
            </tr>
            </tbody>
          </table>
        </div>
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
    methods: {
      CreateLine(ids, w, c, div, bg) {
        var list = ids.split(",");
        for (var j = list.length - 1; j > 0; j--) {
          var tid = $("#" + list[j]);
          var fid = $("#" + list[j - 1]);
          var f_width = fid.outerWidth();
          var f_height = fid.outerHeight();
          var f_offset = fid.offset();
          var f_top = f_offset.top;
          var f_left = f_offset.left;
          var t_offset = tid.offset();
          var t_top = t_offset.top;
          var t_left = t_offset.left;
          var cvs_left = Math.min(f_left, t_left);
          var cvs_top = Math.min(f_top, t_top);
          tid.css("background", bg).css("color", "red");
          fid.css("background", bg).css("color", "red");
          var cvs = document.createElement("canvas");
          cvs.width = Math.abs(f_left - t_left) < w ? w : Math.abs(f_left - t_left);
          cvs.height = Math.abs(f_top - t_top);
          cvs.style.top = cvs_top + parseInt(f_height / 2) + "px";
          cvs.style.left = cvs_left + parseInt(f_width / 2) + "px";
          cvs.style.position = "absolute";
          var cxt = cvs.getContext("2d");
          cxt.save();
          cxt.strokeStyle = c;
          cxt.lineWidth = 1;
          cxt.lineJoin = "round";
          cxt.beginPath();
          cxt.moveTo(f_left - cvs_left, f_top - cvs_top);
          cxt.lineTo(t_left - cvs_left, t_top - cvs_top);
          cxt.closePath();
          cxt.stroke();
          cxt.restore();
          $("#" + div).append(cvs);
        }
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
      padding: 2px;
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
  }
</style>
