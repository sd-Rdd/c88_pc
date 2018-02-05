<template>
  <div id="root">
    <div class="app-wrap">
      <!-- 上半部分 -->
      <div class="top">
        <div class="logo">
          <img src="../../assets/image/logo.png" style="width: 188px; height: auto;">
        </div>
        <div class="status-bar">
          <div class="left" v-if="!user.id">
            <div class="login">
              <div class="input-group">
                <div class="icon-wrap">
                  <i class="iconfont icon-mail" style="font-size: 26px; padding-top: 4px;"></i>
                </div>
                <input type="text" v-model="form.memberName" placeholder="请输入用户名">
              </div>
              <div class="input-group">
                <div class="icon-wrap">
                  <i class="iconfont  icon-mima" style="font-size: 22px; padding-top: 2px;"></i>
                </div>
                <input type="password" v-model="form.passWord" placeholder="请输入密码">
              </div>
              <div class="verfy-code">
                <span class="spanVerfy" @click="getRandom">{{verfyCode2}}</span>
                <input name="verfyCode" maxlength="4" v-model="verfyCode" @keyup.enter="login">
              </div>
              <button @click="login">登录</button>
              <button @click="gotoNewPage('/register')">注册</button>
              <button @click="gotoNewPage('/tryPlay')">免费试玩</button>
            </div>
          </div>
          <div class="left" v-else>
            <div class="landed">
              <div class="user-info">
                <span>
                  您好，
                  {{user.memberName}}
                  &nbsp;&nbsp; 可用余额
                  <span>¥{{balance|transforBalance}}</span>
                  <i class="iconfont icon-refresh refresh" @click="refreshBalance"></i>
                </span>
              </div>
              <div  @click="openWin('/memberCenter/person')">会员中心</div>
              <div @click="openWin('/memberCenter/caiwu/1')"  class="recharge" v-if="user.type!=0">充值</div>
              <div @click="openWin('/memberCenter/caiwu/2')" v-if="user.type!=0">提现</div>
              <div @click="openWin('/memberCenter/bettingRecord')">投注记录</div>
              <div @click="quit">退出</div>
            </div>
          </div>
          <div class="right" @click="gotoNewPage('/mobile')">
            <i class="iconfont icon-apple" style="color: rgb(105, 105, 105); font-size: 25px;"></i>
            <i class="iconfont icon-anzhuo" style="color: rgb(105, 105, 105); font-size: 25px;"></i>
            <span>手机app下载</span>
          </div>
        </div>
      </div>
      <!-- 上半部分结束 -->
      <!-- 主体部分开始 -->
      <div class="main">
        <div class="menu">
          <v-menu></v-menu>
        </div>
        <div class="content">
          <div class="notice">
            <i class="iconfont icon-notice"></i>
            <span>Hi, 欢迎来到彩票大厅</span>
          </div>
          <div style="position: relative; overflow: hidden; width: 100%; height: 100%; flex: 1 1 0%;">
            <div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: -17px; margin-bottom: -17px;">
              <router-view></router-view>
            </div>
            <div style="position: absolute; height: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; left: 2px; border-radius: 3px;">
              <div style="position: relative; display: block; height: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2);"></div>
            </div>
            <div style="position: absolute; width: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; top: 2px; border-radius: 3px;">
              <div style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2);"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vMenu from "./children/aside";
import lotteryLobby from "./children/lotteryLobby";
import vHeader from "components/header/header";
import vBody from "components/common/body_fixed";
import vFoot from "components/footer/footer";
import ccaa from "tools/tools.js";
import url from "static/url.js";
export default {
  components: { vMenu, lotteryLobby, vHeader, vBody, vFoot },
  data() {
    return {
      form: {
        memberName: null,
        passWord: null,
      },
      verfyCode: null,
      verfyCode2: null,
      user: null,
      balance: null,
      win:null,
    };
  },
  created() {
    this.getRandom();
    this.user = ccaa.store.getData("user");
    this.balance = JSON.parse(localStorage.getItem("balance"));
    this.refreshBalance()
  },
  methods: {
    gotoNewPage(ad) {
      window.open(url + ad, "");
    },
    openWin(ad){
      window.open(url + ad, "member","width=1200, height=700,left=50,top=50,");
    },
    login() {
      if (this.verfyCode == this.verfyCode2) {
        if (this.form.memberName && this.form.passWord) {
          let obj={};
          obj.memberName=this.form.memberName;
          obj.passWord=this.md5(this.form.passWord);
          obj.platform=0;
          this.$http
            .post("/member/login", obj)
            .then(res => {
              //console.log(res.data);
              if (res.data.status == 200) {
                ccaa.store.setData("user", res.data.member);
                ccaa.store.setData("balance", res.data.member.balance);
                window.location.reload();
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning"
                });
                this.getRandom();
              }
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          this.$message({
            message: "请输入正确的用户名和密码",
            type: "warning"
          });
          this.getRandom();
        }
      } else {
        this.$message({
          message: "验证码输入错误",
          type: "warning"
        });
        this.getRandom();
      }
    },
    getRandom() {
      this.verfyCode2 = ccaa.randomFn(1000, 9999);
    },
    quit() {
      localStorage.clear();
      window.location.reload();
    },
    refreshBalance() {
      this.$http
        .post("/member/getBlance", { memberId: this.user.id })
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 200) {
            ccaa.store.setData("balance", res.data.balance);
            this.balance = res.data.balance;
          }
        })
        .catch(res => console.log(res));
    }
  },
  filters: {
    transforBalance(a) {
      return Number(a).toFixed(3);
    }
  }
};
</script>
<style scoped>
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
</style>
