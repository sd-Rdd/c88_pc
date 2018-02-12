<template>
  <div class="hello">
    <v-header></v-header>

    <table class="table-style">
      <thead>
      <tr>
        <td rowspan="2">期号</td>
        <td rowspan="2" colspan="5">开奖号码</td>
        <td  v-for="item in countingUnit"  colspan="10" :key="item">
          {{item}}
        </td>
      </tr>
      <tr>
        <td v-for='(a, s) of arr' :key='s'> {{a}}</td>
        <td v-for='(a, s) of arr' :key='s'> {{a}}</td>
        <td v-for='(a, s) of arr' :key='s'> {{a}}</td>
        <td v-for='(a, s) of arr' :key='s'> {{a}}</td>
        <td v-for='(a, s) of arr' :key='s'> {{a}}</td>
      </tr>

      </thead>
      <tbody>
      <tr v-for='(i, index) of data' :key='i'>
        <td>201802081345</td>
        <td v-for="(item5,r) in counting" :key="item" :class="item">
          <span>{{item5}}</span>
        </td>
        <td v-for="(item,r) in counting" colspan="10" :key="item" :class="item">
          <span v-for='(j, n) of arr' :key='n' class="gezi" :class="{'ball01': j===i[r]}" style="">{{arr[index]+1}} </span>
        </td>
        <!-- <td v-for='(j, n) of arr' :key='n' name='wan'  :class="{'ball01': j===i[0]}">{{arr[index]+1}} </td>
        <td v-for='(j, n) of arr' :key='n' name='qian' :class="{'historycode': j===i[1]}"> {{arr[index]+1}}</td>
        <td v-for='(j, n) of arr' :key='n' name='bai'  :class="{'ball01': j===i[2]}"> {{arr[index]+1}}</td>
        <td v-for='(j, n) of arr' :key='n' name='shi' :class="{'historycode': j===i[3]}"> {{arr[index]+1}}</td>
        <td v-for='(j, n) of arr' :key='n' name='ge' :class="{'ball01': j===i[4]}"> {{arr[index]+1}}</td> -->
      </tr>
      </tbody>
      <canvas id="myCanvas"></canvas>
    </table>


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
      defaultNum: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        data: [
          [9, 3, 4, 3, 6],
          [1, 8, 6, 1, 4],
          [2, 0, 8, 7, 8],
          [0, 2, 5, 7, 0],
          [7, 8, 6, 1, 4],
          [8, 0, 8, 7, 8],
          [5, 2, 5, 7, 0],
          [6, 4, 6, 4, 9],
          [0, 4, 6, 4, 9]
        ],
        countingUnit: ['万位', '千位', '百位', '十位', '个位'],
        counting: ['wan', 'qian', 'bai', 'shi', 'ge']
      }
    },
    mounted () {
      // var DOMdata = document.getElementsByClassName('ball01')
      this.canvs()
    },
    methods: {
      canvs () {
        var c = document.getElementById('myCanvas')
        var t = document.querySelector('.table-style')
        c.width = t.clientWidth
        c.height = t.clientHeight
        var ctx = c.getContext('2d')
        ctx.strokeStyle = 'rgba(17,179,94,1)'
        for (let i = 0; i < this.counting.length; i++) {
          let str = '.' + this.counting[i] + ' .ball01'
          let DOMdata = document.querySelectorAll(str)
          ctx.beginPath()
          for (var j = 0; j < DOMdata.length; j++) {
            if (j === 0) {
              ctx.moveTo(DOMdata[j].offsetLeft + (DOMdata[j].offsetWidth / 2), DOMdata[j].offsetTop + (DOMdata[j].offsetHeight / 2))
            } else {
              ctx.lineTo(DOMdata[j].offsetLeft + (DOMdata[j].offsetWidth / 2), DOMdata[j].offsetTop + (DOMdata[j].offsetHeight / 2))
            }
          }
          ctx.stroke()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .title{
    width: 100px;
  }
  td {
    height:30px;
  }
  .gezi{
    display: inline-block;
    width: 24px;
    height: 24px;
    box-sizing: border-box;
  }
  .table-style{
    width: 95%;
    margin:  50px;
    position: relative;
    top: 0;
    left: 0;
    border: 0;
    border-collapse: collapse;
    border-spacing: 0;
  }
  tbody td {
    border: 1px solid #dddddd;
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
    margin-top: 4px;
    margin-left: 2px;
    z-index: 90;
  }
  .ball01 {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 20px;
    position: relative;
    top: 0;
    left: 0;
    z-index: 90;
    border: 1px #11B35E solid;
    box-shadow: 1px 1px 2px #2C3B34;
    color: #fff;
    background: #11B35E;
    font-weight: 800;
    margin-top: 4px;
    margin-left: 2px;
  }
  #myCanvas{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border:none;
  }
  table { border: 0; margin: 0; border-collapse: collapse; border-spacing: 0; font-size: 11px; font-family: Arial; margin: 0 auto; }
  table td, table th { padding: 0; border: 1px solid #d8d8d8; height: 23px; width: 23px; text-align: center; color: #666; }
  table th { font-weight: bold; color: #000;}
</style>
