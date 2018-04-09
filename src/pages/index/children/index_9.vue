<template>
  <div class="cp-game">
    <div class="cp_title">
      <h1>
        <i class="ic-tt8game"></i>
        彩票游戏
        </h1>
    </div>
    <div class="cp_g_list">
      <!--<img src="../../../assets/image/img_cpgame.jpg" alt="">-->
      <ul>
        <li class="cp_list_01" id="lottery_L-35" v-for="(item,index) in topList " :key="index">
          <div class="imgL">
            <img :src='item.logo'/>
          </div>
          <div class="title">
            <a>{{item.lotteryName}}</a>
          </div>
          <div class="cp_g_xh">
            <span @click="openWin('/buyLottery/bet'+item.lotteryNumber)">立即投注</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import url from "static/url.js";
  export default {
    props: {
      styl: String
    },
    data() {
      return {
        AllHideList: [],
        arr: ["天津时时彩", "山东11选5", "新疆时时彩", "北京PK拾", "广西快三", "香港六合彩", "重庆时时彩"],
        win: null
      };
    } /* slice(start,end) */,
    computed: {
      AllShowList() {
        return this.AllHideList.slice(0, 4);
      },
      downShowList() {
        return this.AllHideList.filter(item => {
          return item.lotteryType == 1;
        });
      },
      highHideList() {
        return this.AllHideList.filter(item => {
          return item.lotteryType == 0;
        });
      },
      highShowList() {
        return this.highHideList.slice(0, 4);
      },
      topList() {
        return this.AllHideList.filter(item => {
          return this.arr.slice(0, 6).includes(item.lotteryName);
        });
      }
    },
    methods: {
      close(){
        if (this.win) {
          this.win.close()
        }
      },
      openWin(a) {
        this.win = window.open(url + a, "lottery", "width=1300, height=950,left=10,top=10,");
      },
      show1() {
        var sort = document.getElementById("wrap-sort-all");
        sort.classList.add("show");
      },
      hide1() {
        var sort = document.getElementById("wrap-sort-all");
        if (sort.classList.contains("show")) {
          sort.classList.remove("show");
        }
      },
      enter(a) {
        var target = a.target;
        if (target.childNodes.length != 1) {
          target.firstChild.classList.add("hover");
          target.lastChild.style.display = "block";
        }
      },
      leave(a) {
        var target = a.target;
        if (target.childNodes.length != 1) {
          target.firstChild.classList.remove("hover");
          target.lastChild.style.display = "none";
        }
      },
      openLotteryWin() {
        let lottery = window.open(
          url + "/buyLottery",
          'lottery',
          "width=1300, height=950,left=10,top=10,attention"
        );
        lottery.focus()
      }
    },
    created() {
      this.$http
        .post("/api/lottery/list")
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 200) {
            this.AllHideList = res.data.lotteryList;
          }
        })
        .catch(res => console.log(res));
    },
  }
</script>
<style lang="less" scoped>
  .cp-game {
    .cp_title {
      margin-bottom: 10px;
    }
    .cp_title h1 {
      font: normal 20px/24px "Microsoft YaHei";
      color: #333;
    }
    .cp_title h1 > i {
      display: inline-block;
      font-style: normal;
      font-weight: normal;
      line-height: 1;
      background-image: url(../../../assets/image/icon.png);
      background-repeat: no-repeat;
      vertical-align: -2px;
    }
    .ic-tt8game {
      width: 22px;
      height: 22px;
      background-position: -70px -67px;
    }
    .cp_g_list {
      width: 500px;
      background: #fffaf7 url(../../../assets/image/img_cpgame.jpg) no-repeat;
      .imgL img {
        width: 120px;
        height: 120px;
        margin-top: 20px;
      }
      .title {
        margin-top: 15px;
      }
      .title>a {
        color: #fff;
        margin-top: 15px;
      }
      .title a:hover {
        text-decoration: none;
      }
      .cp_g_xh > span {
        display: inline-block;
        width: 100px;
        line-height: 30px;
        font-size: 16px;
        font-family: 'Microsoft YaHei';
        padding-bottom: 2px;
        color: #fff;
        margin-top: 15px;
        border: #fff solid 1px;
        border-radius: 5px;
        transition: background-color 0.3s;
        cursor: pointer;
      }
    }
    .cp_g_list li {
      float: left;
      width: 160px;
      height: 129px;
      margin-top: 5px;
      margin-right: 5px;
      text-align: center;
      background: url(../../../assets/image/img_cpgame.jpg) left top no-repeat;
      position: relative;
    }
    .cp_g_list li.cp_list_01 {
      height: 260px;
    }
    .cp_g_list li.cp_list_02 {
      height: 260px;
      background-position: -166px top;
    }
    .cp_g_list li.cp_list_03 {
      height: 260px;
      background-position: -335px top;
    }
    .cp_g_list li.cp_list_04 {
      background-position: left -266px;
    }
    .cp_g_list li.cp_list_05 {
      background-position: -167px -266px;
    }
    .cp_g_list li.cp_list_06 {
      background-position: -335px -266px;
    }
    .cp_g_list li.cp_list_07 {
      background-position: left -398px;
    }
    .cp_g_list li.cp_list_08 {
      background-position: -167px -398px;
    }
    .cp_g_list li.cp_list_09 {
      background-position: -335px -398px;
    }
  }
</style>
