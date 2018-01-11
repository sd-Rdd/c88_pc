<template>
  <div class="index_7">
    <div class="head">
      <i class="iconfont icon-paihangbang" style="font-size:18px;"></i>
      中奖排行榜
    </div>
    <div class="sub_head">
      <em>用户名</em>
      <em>奖金</em>
    </div>
    <marquee  direction=up class="list" style="border-bottom: 1px solid #ddd">
      <ul v-if="result.length!=0">
        <li v-for="(item,index) in result" :key="index">
          <span class="number">{{index+1}}</span>
          <span class="username">
            {{item.memberName|filterMemberName}} </span>
          <em class="red" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
            {{item.winMoney|filterWinMoney}}元
          </em>
        </li>
      </ul>
    </marquee>

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
<style scoped>
.index_7 .head {
  overflow: hidden;
  background: #f4fff7;
  height: 40px;
  line-height: 40px;
  padding-left: 11px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
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
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.index_7 .list ul {
  overflow: hidden;
}

.index_7 .list ul li {
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  line-height: 46px;
  height: 46.4px;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
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
