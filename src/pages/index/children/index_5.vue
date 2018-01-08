<template>
  <div class="kj">
    <div class="head">
  
      <i class="iconfont icon-peilv" ></i>
  
      开奖公告
  
    </div>
  
    <div class="kjmain">
  
      <div class="item" v-for="(item,index) in lotteryList" :key="index">
        <div class="top">
          <em>{{item.lotteryName}}</em>
          <span>{{item.issue}}期</span>
        </div>
        <div class="med">
          <span class="red" v-for="(item,index) in item.lotteryResult" :key="index">&nbsp;{{item}} </span>
        </div>
        <div class="bott">
  
          <div class="left">{{item.resultDate|filterDate}}</div>
          <div class="right">
            <router-link :to="'/notice/detailNumbers/'+item.lotteryNo">详细</router-link>
            <a href="javascript:;">走势</a>
            <a @click='openLotteryWin("/buyLottery/bet"+item.lotteryNo)'>投注</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url from 'static/url.js';
export default {
  data(){
    return {
      lotteryList:[]
    }
  },
  methods:{
    openLotteryWin(a){
      window.open(url+a,"lottery","width=1300, height=950,left=10,top=10,")
    }
  },
created () {
  this.$http.post("/index/result",{})
        .then(res=>{
            if(res.data.status==200){
              this.lotteryList=res.data.lotteryList
            }
        })
        .catch(res=>console.log(res))
},
filters:{
  filterDate(dd){
     let date = new Date(dd);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() ;
    return Y + M + D 
  }
}
}
</script>
<style scoped>
  .kj .head {
    overflow: hidden;
    background: #FFF4F4;
    height: 40px;
    padding-left: 15px;
    font-size: 14px;
    line-height: 40px;
    border: 1px solid #E5E5E5
}

.kj .head i {
    overflow: hidden;
    color: #FF5D5D;
    font-size: 21px;
    vertical-align: middle;
    margin-right: 4px
}

.kj .kjmain {
    overflow: hidden
}

.kj .kjmain .item {
    overflow: hidden;
    height: 80px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 5px 8px 17px 8px
}

.kj .kjmain .item .top {
    overflow: hidden;
    line-height: 35px
}

.kj .kjmain .item .top em {
    color: #333;
    width: 70px;
    overflow: hidden;
    font-size: 14px;
    display: inline-block;
    vertical-align: middle
}

.kj .kjmain .item .top span {
    overflow: hidden;
    font-size: 10px;
    color: #999;
    display: inline-block;
    margin-left: 10px;
    vertical-align: bottom
}

.kj .kjmain .item .med {
    overflow: hidden;
    line-height: 25px
}

.kj .kjmain .item .med span {
    overflow: hidden;
    font-size: 14px;
    font-weight: bold
}

.kj .kjmain .item .bott {
    overflow: hidden;
    line-height: 24px
}

.kj .kjmain .item .bott .left {
    overflow: hidden;
    font-size: 10px;
    color: #999
}

.kj .kjmain .item .bott .right {
    overflow: hidden
}

.kj .kjmain .item .bott .right a {
    color: #286EFF;
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
    margin-right: 10px
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
</style>