<template>
  <div class='header'>
    <div class='main'>
      <div class='left logo'>
        <router-link class='logo-link' to="/index">
          <img src='../../../assets/image/logo.png' class='logo-img'>
        </router-link>
      </div>
      <div class='right login_and_userinfo'>
        <div class="login" v-if="!user.id">
          <form id="login_form">
            <div class="username left">
              <i class="iconfont icon-mail"></i>
              <input type="text" placeholder="用户名" v-model="form.memberName" autocomplete="false">
            </div>
            <div class="password left">
              <i class="iconfont icon-mima"></i>
              <input type="password" placeholder="密码" v-model="form.passWord" id="password" autocomplete="new-password">
            </div>
            <div class="code left">
              <input type="text" size="4" v-model="verfyCode" placeholder="验证码" id="login_code_input" style="padding-left:74px;padding-right:10px;width:42px;" @keyup.enter="login" />
              <span class="spanVerfy" @click="getRandom">{{verfyCode2}}</span>
            </div>
            <button type="button" class="left btn-default login-btn btn" name="login" id="login_button" @click="login">登录</button>
          </form>
          <router-link tag="button" type="button" class="left d-btn reg-btn btn" name="register" id="register" to="/register">注册</router-link>
        </div>
        <div class="logined" v-else>
          <div>
            <em>欢迎您，</em>
            <span class="username" id="usernameShow">{{user.memberName}}</span>
            <span>预留信息：</span>
            <a id="userLogout" @click="quit">退出</a>
          </div>
          <div class="fbottom">
            <em>余额：</em>
            <span class="money" id="moneyShow">{{balance|transforBalance}}</span>
            <!--<a @click="refreshBalance">刷新</a>-->
            <!--<a @click="openWin('/memberCenter/person')">会员中心</a>-->
            <a class="user_goto_recharge isTry t_btn" @click="openWin('/memberCenter/caiwu/1')" v-if="user.type!=0">充值</a>
            <i v-if="user.type!=0"></i>
            <a class="user_goto_withdraw isTry t_btn" @click="openWin('/memberCenter/caiwu/2')" v-if="user.type!=0">提款</a>
            <!--<i v-if="user.type!=0"></i>-->
            <!--<a @click="openWin('/memberCenter/bettingRecord')">投注记录</a>-->
            <a href="https://ssg.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=934991&configID=41704&jid=7704799059&s=1" style=" border-bottom: 1px solid #B2ACAC;
    padding-bottom: 4px;font-size: 13px"> 客服</a>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ccaa from "tools/tools.js";
import url from "static/url.js";
export default {
  data() {
    return {
      user: null, //用户信息
      form: {
        memberName: null,
        passWord: null
      },
      verfyCode: null,
      verfyCode2: null,
       balance: JSON.parse(localStorage.getItem('balance'))
    };
  },
  created() {
    this.getRandom();
    this.user = ccaa.store.getData("user");
    this.refreshBalance();
  },
  methods: {
    quit() {
      localStorage.clear();
      window.location.reload();
    },
    login() {
      if (this.verfyCode == this.verfyCode2) {
        if (this.form.memberName && this.form.passWord) {
          let obj={};
          obj.memberName=this.form.memberName;
          obj.passWord=this.md5(this.form.passWord);
          obj.platform=0;
          console.log(obj);
          this.$http
            .post("/member/login", obj)
            .then(res => {
              //console.log(res.data)
              if (res.data.status == 200) {
                ccaa.store.setData("user", res.data.member);
                ccaa.store.setData("balance", res.data.member.balance);
                if (this.$route.path === "/index") {
                  location.reload();
                } else {
                  this.$router.push({ path: "/index" });
                }

                //console.log(ccaa.store.getData('user'));
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
    openWin(a) {
      if(a==='/memberCenter/caiwu/2'){
        this.$http.post('/member/getBankcardList',{memberId:this.user.id}).then(res=>{
          if(res.data.isBank){
            this.$http.post('/member/isPayPass',{memberId:this.user.id}).then(res=>{
              if(res.data.pword){
                  window.open(url + a, "member","width=1200, height=700,left=50,top=50,");
              }else{
                this.$message({
                  message: '请设置资金密码',
                  type: 'warning'
                });
              }
            })
          }else{
              this.$message({
              message: '请绑定银行卡',
              type: 'warning'
            });
          }
        })
      }else{
        window.open(url + a, "member","width=1200, height=700,left=50,top=50,");
      }
    },
    getRandom() {
      this.verfyCode2 = ccaa.randomFn(1000, 9999);
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
//  computed: {
//    balance: {
//      get: function() {
//        return JSON.parse(localStorage.getItem('balance'))
//      },
//      set: function(newValue) {
//        window.onstorage = function(e) { // 监视localstorge的值
//          if (e.key === 'balance') {
//            return e.newValue
//          }
//        }
//        return newValue
//      }
//    }
//  }
};
</script>
<style lang="less" scoped>
.header {
  width: 1000px;
  margin: 0 auto;
}

.red {
  color: #DB60AE !important;
}

.main {
  overflow: hidden;
}

.left,
.right {
  overflow: hidden;
  float: left;
}
.logo {
  width: 30%;
}
.header .logo .logo-link {
  overflow: hidden;
  margin-top: 10px;
  display: block;
  margin-bottom: 10px;
}

.logo-img {
  width: 188px;
  height: auto;
}

.header .main .login_and_userinfo {
  /*width: 685px;*/
  width: 70%;
  overflow: hidden;
  font-size: 18px;
  color: #4c4a4d;
  font-family: 'Microsoft YaHei';
  /*margin-top: 26px;*/
}

.header .main .login_and_userinfo .login {
  width: 685px;
  height: 40px;
  overflow: hidden;
  clear: both;
  padding-top: 2px;
}

.header .main .login_and_userinfo .login input {
  outline: none;
}

/* 登录上之后的样式 */

.header .main .login_and_userinfo .logined {
  width: 100%;
  /*height: 53px;*/
  overflow: hidden;
  font-size: 14px;
  text-align: right;
  /*line-height: 48px;*/
  color: #333333;
  div{
    color: #858383;
    font-family: microsoft yahei;
    font-size: 13px;
    text-align: right;
    margin: 10px 0 12px 0;
  }
  #userLogout{
    color: #a6a6a6;
    font-style: italic;
    text-decoration: underline;
    font-weight: bold;
    vertical-align: 2px;
  }
  .fbottom {
    font-size: 18px;
    color: #4c4a4d;
  }
  .t_btn {
    font-size: 14px;
    color: #fff;
    padding: 4px 13px 5px;
    background: #a7678c;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    margin-left: 8px;
  }
}

.header .main .login_and_userinfo .logined em {
  overflow: hidden;
  margin-left: 10px;
}

.header .main .login_and_userinfo .logined span {
  overflow: hidden;
}

.header .main .login_and_userinfo .logined span.username {
  overflow: hidden;
}

.header .main .login_and_userinfo .logined span.money {
  color: #DB60AE;
  margin-right: 4px;
}

/*.header .main .login_and_userinfo .logined i {*/
  /*overflow: hidden;*/
  /*display: inline-block;*/
  /*width: 2px;*/
  /*height: 14px;*/
  /*background: #ddd;*/
  /*vertical-align: middle;*/
/*}*/

.header .main .login_and_userinfo .logined a {
  overflow: hidden;
  color: #333333;
  display: inline-block;
  vertical-align: middle;
  padding-left: 5px;
  padding-right: 5px;
}

.header .main .login_and_userinfo .logined a:hover {
  overflow: hidden;
}

/* 登录上之后的样式结束  */

.header .main .login_and_userinfo .login .username,
.header .main .login_and_userinfo .login .password {
  margin-right: 14px;
  position: relative;
}

.header .main .login_and_userinfo .login i.iconfont {
  font-size: 1.25rem;
  line-height: 35px;
  display: block;
  float: left;
  padding-left: 6px;
  padding-right: 6px;
  background: #fff1eb;
  border: 1px solid #e94335;
  border-right: none;
  color: #e94335;
  position: absolute;
  /* vertical-align: middle; */
  width: 28px;
  line-height: 37px;
  text-align: center;
  height: 35px;
}

.header .main .login_and_userinfo .login i.icon-mail {
  font-size: 1.5rem;
  line-height: 38px;
}

.header .main .login_and_userinfo .login input {
  border: 1px solid #e94335;
  padding-left: 48px;
  font-size: 0.8125rem;
  width: 91px;
  color: #333;
  padding-top: 9px;
  padding-bottom: 9px;
  height: 17px;
  padding-right: 9px;
  vertical-align: middle;
  line-height: 23px;
}

.header .main .login_and_userinfo .login .login-btn,
.header .main .login_and_userinfo .login .reg-btn {
  width: 90px;
  height: 36px;
  padding: 0;
  line-height: 26px;
  font-size: 0.9375rem;
}

.header .main .login_and_userinfo .login .login-btn {
  margin-right: 19px;
}

.header .main .login_and_userinfo .login .code {
  margin-right: 18px;
  position: relative;
}

a.btn-default,
button.btn-default,
input.btn-default,
.btn-default {
  background: #e94335;
  color: #fff;
}

a:hover.btn-default,
button.btn-default:hover,
input.btn-default:hover,
.btn-hover {
  background: #fb6053;
  color: #fff;
}

a:hover.d-btn,
button.d-btn:hover,
input.d-btn:hover,
.d-btn-hover {
  background: #ff8434;
  color: #fff;
}

.btn {
  display: inline-block;
  padding: 10px;
  border: 0px;
  font-size: 1.0625rem;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  outline: none;
}

.d-btn {
  background: #ff6400;
  color: #fff;
}

.spanVerfy {
  position: absolute;
  top: 1px;
  left: 1px;
  background: #ccc;
  display: block;
  width: 50%;
  line-height: 35px;
  letter-spacing: 8px;
}
</style>
