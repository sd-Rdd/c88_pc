<template>
  <div id="root"  >
    <div class="app-wrap" >
      <!-- 上半部分 -->
      <div class="top">
          <div class="logo">
            <img src="../../assets/image/logo.png" style="width: 188px; height: 42px;">
            <div class="nav">
              <ul class="clearfix">
                <li>
                  <router-link to="/index" :class='{active:this.$route.path=="/index"?true:false}'>首页</router-link>
                </li>

                <li class="nav-parent" @mouseenter='enter($event)' @mouseleave='leave($event)'>
                  <!--<router-link to="buyLottery">购彩大厅</router-link>-->
                  <a href="javascript:void(0);">购彩大厅</a>
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
                <li  class="nav-parent" @mouseenter='enter($event)' @mouseleave='leave($event)'>
                  <a href="javascript:void(0);">会员中心</a>
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
                  <a href="javascript:void(0);">代理中心</a>
                  <div class="nav_child nav_child3 same" style="display:none;">
                    <p>
                      <router-link to="/memberCenter/daili">团队总览</router-link>
                    </p>
                  </div>
                </li>
                <li>
                  <router-link to="/activity" :class='{active:this.$route.path=="/activity"?true:false}'>优惠活动</router-link>
                </li>
                <li>
                  <router-link to="/notice" :class='{active:this.$route.path=="/notice"?true:false}'>开奖公告</router-link>
                </li>
                <li>
                  <router-link to="/" :class='{active:this.$route.path=="/charts"?true:false}'>走势图表</router-link>
                </li>
              </ul>
            </div>
            <div class="status-bar">
              <div class="left">
                <div class="landed">
                  <div class="user-info">
                <span>
                  欢迎您，
                  {{user.memberName}}
                </span>
                  </div>
                  <div @click="quit" class="quit">退出</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <!-- 上半部分结束 -->
      <!-- 主体部分开始 -->
      <div class="main"  >
        <div class="menu">
          <v-menu></v-menu>
        </div>
        <div class="content">
            <div style="width: 980px; margin: 0 auto">
              <!--<div style="">-->
              <!--</div>-->
              <router-view></router-view>
            </div>



          <!--<div style="position: absolute; width: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; top: 2px; border-radius: 3px;">-->
            <!--<div style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2);"></div>-->
          <!--</div>-->

          <v-foot></v-foot>

        </div>


        <!--<v-foot></v-foot>-->
      </div>

      <!--<div style="width: 300px;height: 200px;background: #f00;z-index: 999999"></div>-->

    </div>
  </div>
</template>
<script>
import vMenu from "./children/aside";
import lotteryLobby from "./children/lotteryLobby";
import vHeader from "components/header/header";
import vBody from "components/common/body_fixed";
import vFoot from "components/footer/footer";
import betResult from './children/betComponents/bet_result'
import betChaseNumber from './children/betComponents/bet_chasenumber'
import ccaa from "tools/tools.js";
import url from "static/url.js";
export default {
  components: { vMenu, lotteryLobby, vHeader, vBody, vFoot ,betResult, betChaseNumber},
  data() {
    return {
      user: null,
      result: [],
    };
  },
  created() {
    this.user = ccaa.store.getData("user");
    this.getMenuList()
  },
  methods: {
    quit() {
      localStorage.clear();
      window.location.reload();
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
    getMenuList() {
      this.$http.post('/api/show/cat/list')
        .then(res => {
          //console.log(res.data)
          if (res.data.status == "200") {
            this.result = res.data.result;
          }
        })
        .catch(err => console.log(err))
    }
  }
};
</script>
<style lang="less" scoped>
@import "./static/css/index.css";
@import "./static/css/animate.css";
@import "./static/css/lucky28.css";
@import "./static/css/lhc.css";
* {
  box-sizing: border-box;
  color: #333;
  font-family: "Microsoft YaHei", Arial, Helvetica, "sans-serif";
  outline: none;
  cursor: inherit;
}

.refresh {
  font-size: 1.25rem;
  color: #e94335;
  margin-left: 0.3125rem;
  cursor: pointer;
}

.spanVerfy {
  background: #ccc;
  display: block;
  width: 50%;
  letter-spacing: 8px;
  line-height: 34px;
}


/*浮窗*/
.clearfix li {
  position: relative;
}

.clearfix .nav_child {
  display: block;
  width: 520px;
  height: 309px;
  position: absolute;
  left: 0;
  top: 40px;
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
.clearfix div.nav_child2 {
  width: 78px;
  height: 100px;
}

.clearfix div.nav_child3 {
  width: 78px;
  height: 42px;
}


</style>
