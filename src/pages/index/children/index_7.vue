<template>
  <div class="index_7">
    <div class="head">
      <i class="ic-ttGame" style="font-size:18px;"></i>
      彩票英雄榜

    </div>
    <div class="head_hero">
      <!--<div class="sub_head">-->
        <!--<em>用户名</em>-->
        <!--<em>奖金</em>-->
      <!--</div>-->
      <marquee  direction=up class="list" style="border-bottom: 1px solid #ddd">
        <ul v-if="result.length!=0" type="disc" >
          <li v-for="(item,index) in result" :key="index">
            <span class="number">{{index+1}}</span>
            <span class="username">
    恭喜{{item.memberName|filterMemberName}} </span>
            中奖<em class="red" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;font-weight: bold;font-size: 15px">
             {{item.winMoney|filterWinMoney}}
    </em>元
          </li>
        </ul>
      </marquee>
    </div>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        result: []
      }
    },
    created() {
      this.$http
        .post('/index/win/lottery')
        .then(res => {
          // console.log(res.data)
          if (res.data.status == 200) {
            for (let i = 0; i < 10; i++) {
              this.result.push(res.data.result[i])
            }
          }
        })
        .catch(res => console.log(res))
    },
    filters: {
      filterMemberName(a) {
        if (a) {
          return a.substring(0, 4) + '****'
        }
      },
      filterWinMoney(a) {
        return Number(a).toFixed(3)
      }
    }
  }
</script>
<style lang="less" scoped>

  .index_7 {
    float: left;
    width: 980px;
    /*margin-top: 25px;*/
  }

  .index_7 .head {
    margin-left: 20px;
    margin-bottom: 10px;
    font-size: 18px;
    i {
      display: inline-block;
      font-style: normal;
      font-weight: normal;
      line-height: 1;
      background-image: url(../../../assets/image/icon.png);
      background-repeat: no-repeat;
      vertical-align: -2px;
    }
    .ic-ttGame {
      width: 22px;
      height: 20px;
      background-position: -104px -2px;
    }
  }
  .head_hero {
    height: 126px;
    overflow: hidden;
    margin: 0 20px;
    padding: 0 20px;
    background: url(../../../assets/image/winning_bg.png);
  }

  .index_7 .head i {
    overflow: hidden;
    font-size: 25px;
    color: #4ab163;
  }

  .index_7 .sub_head {
    overflow: hidden;
    background: #f6f6f6;
    height: 42px;
    line-height: 40px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  .index_7 .sub_head em {
    overflow: hidden;
    display: inline-block;
    text-align: center;
    width: 49%;
    font-size: 14px;
  }

  .index_7 .list {
    overflow: hidden;
    /*border-left: 1px solid #ddd;*/
    /*border-right: 1px solid #ddd;*/
  }

  .index_7 .list ul {
    overflow: hidden;
  }

  .index_7 .list ul li {
    overflow: hidden;
    /*border-bottom: 1px solid #ddd;*/
    width:424px;
    line-height: 46px;
    height: 37px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
  }

  .index_7 .list ul li i {
    vertical-align: middle;
    overflow: hidden;
  }

  .index_7 .list ul li span {
    vertical-align: middle;
    overflow: hidden;
    /*width: 80px;*/
    display: inline-block;
    text-align: left;
    padding-left: 8px;
  }

  .index_7 .list ul li span.username {
    overflow: hidden;
  }

  .index_7 .list ul li em {
    display: inline-block;
    width: 79px;
  }

  .index_7 .list ul li em.red {
    vertical-align: middle;
    overflow: hidden;
    text-align: right;
    width: 120px;
  }

  .number {
    width: 18px !important;
    border: 1px solid #ffac5a;
    color: #e94335;
    background-color: #ffeedc;
    line-height: 18px;
    text-align: center !important;
    padding: 0px !important;
  }

  .red {
    color: red !important;
  }
</style>
