<template>
  <div class="nav">
    <div class="menu">
      <div @mouseleave='hide1'></div>
      <div class="nav">
        <ul class="clearfix" id="headNav">
          <li>
            <router-link to="/index">首页</router-link>
            <sup>Home</sup>
          </li>
          <li class="nav-parent" @mouseenter='enter($event)' @mouseleave='leave($event)'>
            <!--<router-link to="buyLottery">购彩大厅</router-link>-->
            <a href="javascript:void(0);">购彩大厅</a>
            <sup>Lottery</sup>
            <div class="nav_child" style="display:none;">
              <dl class="category" v-for="(item,index) in result" :key="index">
                <dt class="category-info" @click="obj[item.catName]=!obj[item.catName]">{{item.catName}}</dt>
                <dd>
                  <router-link class="lottery-info" v-for="(item1,index) in item.lotteryList" :key="index"
                               :to="'/buyLottery/bet'+item1.id" active-class="active">
                    <span class="lo-name">{{item1.lotteryName}}</span>
                  </router-link>
                </dd>
              </dl>
            </div>
          </li>
          <li class="tit">
            <i class="icon_nav_new"></i>
            <router-link to="/mobile" :class='{active:this.$route.path=="/mobile"?true:false}'>
              <i class="icon_nav_mobile"></i>
              手机购彩
              <sup>Phone</sup>
            </router-link>
          </li>
          <li  class="nav-parent" @mouseenter='enter($event)' @mouseleave='leave($event)'>
            <!--<router-link to="memberCenter/person" :class='{active:this.$route.path=="memberCenter/person"?true:false}'>账户管理</router-link>-->
            <a href="javascript:void(0);">会员中心</a>
            <sup>Member</sup>
            <div class="nav_child nav_child3 same" style="display:none;">
              <p>
                <router-link to="/memberCenter/person" :class='{active:this.$route.path=="/memberCenter/person"?true:false}'>个人中心</router-link>
              </p>
              <p>
                <router-link to="/memberCenter/caiwu/1">财务中心</router-link>
              </p>
              <p>
                <router-link to="/memberCenter/bettingRecord">交易记录</router-link>
              </p>
              <p>
                <router-link to="/memberCenter/setting">详细设定</router-link>
              </p>
              <p>
                <router-link to="/memberCenter/peilv">赔率详情</router-link>
              </p>
            </div>
          </li>
          <li class="nav-parent" @mouseenter='enter($event)' @mouseleave='leave($event)'>
            <!--<router-link to="/activity" :class='{active:this.$route.path=="/activity"?true:false}'>团队管理</router-link>-->
            <a href="javascript:void(0);">代理中心</a>
            <sup>Agency</sup>
            <div class="nav_child nav_child3 same" style="display:none;">
              <p>
                <router-link to="/memberCenter/daili">团队总览</router-link>
              </p>
            </div>
          </li>
          <li class="nav-parent" @mouseenter='enter($event)' @mouseleave='leave($event)'>
            <a href="javascript:void(0);">优惠活动</a>
            <sup>Discount</sup>
            <div class="nav_child nav_child2 same" style="display:none;">
              <p>
                <router-link to="/activity">热门活动</router-link>
              </p>
              <p>
                <router-link to="/noticeList">系统公告</router-link>
              </p>
            </div>
          </li>
          <li>
            <router-link to="/notice">开奖公告</router-link>
            <sup>Notice</sup>
          </li>
          <li>
            <!--<router-link to="/charts" :class='{active:this.$route.path=="/charts"?true:false}'>走势图表</router-link>-->
            <router-link to="" :class='{active:this.$route.path=="/charts"?true:false}'>走势图表</router-link>
            <sup>Chart</sup>
          </li>
        </ul>
      </div>
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
        win: null,
        result: [],
        obj: {}//记录具体玩法列表是否展开的数据
      };
    } /* slice(start,end) */,
    computed: {
      isshow(){
        let obj = {};
        this.result.forEach(item => {
          obj[item.catName] = false;
        });
        this.obj = obj;
        return obj
      },
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
          return this.arr.includes(item.lotteryName);
        });
      }
    },
    methods: {
      getMenuList() {
        this.$http.post('/api/show/cat/list')
          .then(res => {
            //console.log(res.data)
            if (res.data.status == "200") {
              this.result = res.data.result;
            }
          })
          .catch(err => console.log(err))
      },
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
      this.getMenuList()
    },
  };
</script>
<style lang="less" scoped>
  .count-down {
    width: 500px;
    height: 533px;
    position: absolute;
    top: 313px;
    left: 10px;
    float: left;
    margin: 25px 0 0 20px;
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
  }

  .show {
    display: block !important;
  }

  .hide {
    display: none;
  }

  .sideNavB .hover {
    position: absolute;
    left: 0;
    top: 0;
    border-bottom: 2px solid #ffccbf;
    border-top: 2px solid #ffccbf !important;
    padding: 2px 3px 4px 15px !important;
    z-index: 1000;
    width: 225px;
    background-color: #ffffff;
  }

  .nav {
    /*background: #4E4277;*/
    width: 100%;
    min-width: 980px;
    height: 53px;
    position: relative;
    background: url(../../../assets/image/new_bg_nav.png) center top no-repeat;
    z-index: 99;
  }

  .menu {
    position: relative;
    width: 1000px;
    margin: 0 auto;
    height: 53px;
  }

  .menu .all-sort {
    left: 0;
    width: 250px;
    text-align: left;
    font-size: 0.875rem;
    /*background: #d51910;*/
    position: relative;
  }

  .menu .all-sort h2 {
    position: relative;
    display: block;
    width: 250px;
    box-shadow: 2px 0 9px rgba(90, 90, 90, 0.28);
    opacity: 1;
    height: 53px;
  }

  .menu .all-sort a {
    color: #fff;
    width: 100%;
    height: 100%;
    line-height: 53px;
    padding-left: 20px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 100;
  }

  .menu .all-sort h2 i.iconfont {
    font-size: 1.3rem;
    color: #fff;
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .sideNavB {
    box-sizing: border-box;
    border: 2px solid #d51910;
    border-top: none;
    width: 250px;
    line-height: 55px;
    background-color: #fff;
    z-index: 9999;
    position: absolute;
    top: 312px;
  }

  .sideNavB .hotMain {
    height: 342px;
    overflow: hidden;
    padding-top: 7px;
  }

  .sideNavB .oneLi {
    padding: 4px 0px 4px 15px;
    overflow: hidden;
    height: 40px;
    line-height: 35px;
  }

  .sideNavB .oneLi .imgL {
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    float: left;
  }

  .sideNavB .oneLi .imgL img {
    width: 32px;
    height: 32px;
  }

  .sideNavB .oneLi .title {
    float: left;
    padding: 0 1px;
    margin-left: 12px;
    color: #333;
    font-size: 16px;
    vertical-align: bottom;
  }

  .sideNavB .oneLi .desc {
    padding-top: 3px;
    font-size: 12px;
    float: left;
    margin-left: 5px;
    font-size: 12px;
    color: #999;
    line-height: 29px;
    height: 29px;
    width: 95px;
    overflow: hidden;
  }

  .sideNavB .sortMain {
    position: relative;
    height: 70px;
    font-size: 14px;
  }

  .sideNavB .sortDiv {
    position: absolute;
    left: 0;
    top: 0;
    padding: 3px 3px 3px 15px;
    border-top: 1px dashed #e6d3cf;
    width: 230px;
    color: #333;
  }

  .sideNavB .secondNav {
    position: absolute;
    z-index: 88;
    left: 246px;
    border: 2px solid #ffccbf;
    width: 742px;
    height: 208px;
    background-color: #ffffff;
    padding-left: 6px;
  }

  .sideNavB .secondNav .title {
    padding-top: 20px;
    padding-left: 10px;
    width: 100%;
    font-weight: 800;
    font-size: 18px;
    color: #999;
    height: 30px;
    line-height: 30px;
  }

  .sideNavB .secondNav .ulDiv {
    padding-left: 10px;
    margin-top: 7px;
    color: #333;
  }

  .sideNavB .secondNav ul {
    overflow: hidden;
  }

  .sideNavB .secondNav li {
    float: left;
    width: 94px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    margin-right: 10px;
    overflow: hidden;
  }

  .sideNavB .secondNav li a {
    color: #666;
  }

  .sideNavB .secondNav li a:hover {
    color: #1d1626;
  }

  .sideNavB .sLeft {
    float: left;
    width: 25px;
  }

  .sideNavB .sLeft .red {
    color: red;
    background-color: #ffcdcd;
    border: 1px solid #ffffff;
  }

  .sideNavB .sLeft .blue {
    color: #0040ff;
    background-color: #dce5ff;
    border: 1px solid #b4c7ff;
  }

  .sideNavB .sLeft .green {
    padding: 15px 5px 14px 5px !important;
    color: #005d19;
    background-color: #d9f9df;
    border: 1px solid #b0e6bb;
  }

  .sideNavB .sLeft .sTitle {
    width: 14px;
    line-height: 16px;
    font-size: 14px;
    margin-top: 1px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    text-align: center;
    padding: 5px;
  }

  .sideNavB .sRight {
    float: left;
    width: 180px;
    line-height: 24px;
    padding-left: 17px;
  }

  .sideNavB .sRight ul {
    overflow: hidden;
    padding-top: 2px;
    line-height: 25px;
    font-size: 14px;
  }

  .sideNavB .sRight li {
    color: #666;
    float: left;
    width: 90px;
    font-weight: 500;
  }

  /* 横向导航 */
  .menu .nav {
    position: absolute;
    width: 740px;
    left: 9px;
    top: 0;
  }

  .menu .nav ul li {
    float: left;
    width: 118px;
    height: 41px;
    margin-right: 2px;
    margin-left: 2px;
    padding-top: 12px;
  }

  .menu .nav #headNav li > a {
    display: block;
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 16px;
    text-decoration: none;
  }

  .menu .nav #headNav li  sup {
    font-size: 12px;
    display: block;
    /*line-height: 13px;*/
    font-family: arial;
    color: #fff;
    /*width: 30px;*/
    /*padding-left: 44px;*/
    text-align: center;
  }

  .menu .nav ul li:hover {
    background: #1d1626;
    text-decoration: none;
    color: #fff;
  }

  .active {
    background: #1d1626;
    color: #fff;
  }

  .icon_nav_new {
    display: block;
    background: url("https://cpweb.kosunmobile.com/c9/Public/static/images/hot_01.gif");
    height: 16px;
    width: 27px;
    position: absolute;
    bottom: 29px;
    right: 11px;
    z-index: 0;
    background-size: 27px 16px;
  }

  .icon_nav_mobile {
    display: block;
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/icon_nav_mobile.png);
    height: 21px;
    width: 13px;
    position: absolute;
    top: 17px;
    left: 4px;
    background-size: 13px 21px;
    z-index: 0;
    background-repeat: no-repeat;
  }

  .tit {
    position: relative;
  }

  /*浮窗*/
  #headNav .nav-parent {
    position: relative;
  }

  #headNav .nav_child {
    display: block;
    width: 520px;
    height: 309px;
    position: absolute;
    left: 0;
    top: 53px;
    text-align: left;
    background-color: #000;
    opacity: 0.8;
    filter: alpha(opacity=80);
    z-index: 101;
    overflow: hidden;
    color: #fff;
    dl {
      float: left;
      width: 240px;
      height: auto;
      line-height: 24px;
      font-size: 14px;
      margin: 10px 0 0 20px;
      dt {
        color: #bea7dd;
      }
      dd .lo-name {
        float: left;
        width: 49%;
        font-size: 13px;
        color: #fff;
      }
      dd .lo-name:hover {
        text-decoration: underline;
      }
      dd > a {
        height: auto;
        padding: 0;
      }
    }

  }
  .same a{
    float: none;
    color: #fff;
    width: 100%;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    height: auto;
    padding: 0;
    display: block;
  }
  #headNav div.nav_child2 {
    width: 118px;
    height: 100px;
  }

  #headNav div.nav_child3 {
    width: 118px;
    height: 42px;
  }

</style>
