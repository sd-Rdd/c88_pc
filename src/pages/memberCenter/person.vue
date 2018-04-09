<template>
  <div>
    <div class="usercenter_info">
      <div class="left">
        <div class="avatar left">
          <img src="../../assets/image/user_icon.png" alt="" class="avatar_img">
        </div>
        <div class="right user_info">
          <ul>
            <li>
              <label for="username">用 户 名 : </label>
              <span class="userinfo_username">{{memberData.memberName}}</span>
            </li>
            <li>
              <label for="safe_lavel">安全等级: </label>
              <i class="user_star start_light" v-for="item in start_num" :key="item"></i>
              <i class="user_star start_dark" v-for="item in (5-start_num)" :key="item"></i>
            </li>
            <li>
              <label for="login_time">登录时间：</label> {{getLoginData.finallyLoginTime}}
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="account_info">
          <div class="account_balance">
            <label for="_balance">账户总额 :</label>
            <em>{{balance}}</em>
            <a @click="getBalance" style="margin-left: 10px;font-size:12px">刷新</a>
          </div>
          <div class="account_topup">
            <router-link class="btn btn-default topup-btn user_goto_recharge" to="/memberCenter/caiwu/1">充值
            </router-link>
            <a class="btn btn-dark withdraw-btn user_goto_withdraw" @click="tixian">提现</a>
          </div>
        </div>
      </div>
    </div>


    <!-- 主体 -->
    <MemberCommon>
      <div slot="nav">
        <li :class="{hover:safe==1}" @click="changeSafe(1)">
          <a href="javascript:;">安全中心</a>
        </li>
        <li :class="{hover:safe==2}" @click="changeSafe(2)">
          <a href="javascript:;">安全信息</a>
        </li>
        <li :class="{hover:safe==3}" @click="changeSafe(3)">
          <a href="javascript:;">我的银行卡</a>
        </li>
      </div>
      <div slot="body">
        <div v-show="safe==1">
          <div class="safe_item">
            <div class="accordion-header">
              <ul class="menus-li">
                <li class="on" @click="isShow('a')">修改登录密码</li>
                <li class="fund" @click="isShow('b')">设定资金密码</li>
              </ul>
            </div>
            <div class="safe_item_body accordion-content" v-show="show.a">
              <div class="change_password">
                <div class="form">
                  <form id="changePwdFrom" autocomplete="off">
                    <div class="form_group">
                      <label class="psd-label">输入旧登录密码：</label>
                      <input type="password" v-model="logPSW.oldPassword"
                             @blur="checkLoginPsw('oldPassword')" autocomplete="new-password">
                    </div>
                    <div class="form_group">
                      <label class="psd-label">输入新登录密码：</label>
                      <input type="password" v-model="logPSW.newPassword1"
                             @blur="checkLoginPsw('newPassword1')" autocomplete="new-password">
                      <span class="text_hint">密码长度至少6位字母+数字</span>
                    </div>
                    <div class="form_group">
                      <label class="psd-label">确认新登录密码：</label>
                      <input type="password" v-model="logPSW.newPassword2"
                             @blur="checkLoginPsw('newPassword2')" autocomplete="new-password">
                    </div>
                    <div class="form_remark">
                      <span class="red">备注：定期更换密码，让您的账户更安全</span>
                    </div>
                    <button type="button" class="btn btn-radius" @click='changeLoginPsw'>确 认</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="safe_item_body accordion-content" v-show="show.b" id="fund_password_body">
              <div class="change_password" v-if="pword==0">
                <div class="form" autocomplete="off">
                  <form id="changeTradePwdFrom">
                    <div class="form_group">
                      <input type="password" placeholder="请设置资金密码" @blur="checkzijinPsw('firstZinjin','firstZinjin')"
                             v-model="firstZinjin.firstZinjin">
                    </div>
                    <div class="form_remark">
                      密码规则：
                      <span class="red">6位纯数字</span>
                    </div>
                    <button type="button" class="btn btn-radius btn-default" @click="confirm">确 认</button>
                  </form>
                </div>
              </div>
              <div class="change_password" v-if="pword==1">
                <div class="form">
                  <form id="changePwdFrom" autocomplete="off">
                    <div class="form_group">
                      <label class="psd-label">请输入当前资金密码：</label>
                      <input type="password" v-model="secondZinjin.oldPassword"
                             @blur="checkzijinPsw('secondZinjin','oldPassword')" autocomplete="new-password">
                    </div>
                    <div class="form_group">
                      <label class="psd-label">请输入新资 金 密 码： </label>
                      <input type="password" v-model="secondZinjin.newPassword1"
                             @blur="checkzijinPsw('secondZinjin','newPassword1')" autocomplete="new-password">
                      <span class="text_hint">密码规则：6位纯数字</span>
                    </div>
                    <div class="form_group">
                      <label class="psd-label">再次确认新资金密码：</label>
                      <input type="password" v-model="secondZinjin.newPassword2"
                             @blur="checkzijinPsw('secondZinjin','newPassword2')" autocomplete="new-password">
                    </div>
                    <div class="form_remark">
                      <span class="red">备注：为您账户安全，真实姓名要与绑定银行卡姓名一致</span>
                    </div>
                    <button type="button" class="btn btn-radius btn-default" @click='confirm2'>确 认</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="safe==2">
          <div class="safe_item">
            <div class="safe_item_head login_password pointer">
              <div class="left info_view">
                <i class="iconfont icon-jiancha"></i>
                <div class="left">
                  <h3>安全信息</h3>
                  <span>如发现登录信息不是您本人操作，请立即修改您的密码。</span>
                </div>
              </div>

            </div>

            <div class="safe_item_body">
              <div class="safe_info">
                <table class="safe_info_table">
                  <tbody>
                  <tr>
                    <td class="tit">最后登录时间</td>
                    <td class="wid">{{getLoginData.finallyLoginTime}}</td>
                    <td class="tit">上一次登录时间</td>
                    <td class="wid">{{getLoginData.lastLoginTime}}</td>
                  </tr>
                  <tr>
                    <td class="tit">最后登录IP</td>
                    <td class="wid">{{getLoginData.finallyLoginIp}}</td>
                    <td class="tit">上一次登录IP</td>
                    <td class="wid">{{getLoginData.lastLoginIp}}</td>
                  </tr>
                  <tr>
                    <td class="tit">最后登录地点</td>
                    <td class="wid">
                      {{getLoginData.finallyLoginAddr}}


                    </td>
                    <td class="tit">上一次登录地点</td>
                    <td class="wid">
                      {{getLoginData.lastLoginAddr}}


                    </td>
                  </tr>
                  <tr>
                    <td class="tit">注册时间</td>
                    <td class="wid">
                      {{getLoginData.registerTime}}


                    </td>
                    <td class="tit">注册IP</td>
                    <td class="wid">
                      {{getLoginData.registerIp}}


                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div v-show="safe==3">
          <div class="safe_item" id="bindBankHead">
            <div class="accordion-header" @click="isShow('c')">
              <div class="safe_item_head login_password pointer">

                <div class="left info_view">
                  <i class="iconfont icon-card"></i>
                  <div class="left">
                    <h3>我的银行卡</h3>
                    <span>为保证您的用卡安全，请绑定持卡人本人的银行卡</span>
                  </div>
                </div>
                <div class="right tool_control" v-if="isBank==0">
                  <div class="tool_group" id="set_three">
                    <span class="red" id="addBankCard">去绑定</span>
                  </div>

                  <div class="tool_group tool_change">
                    <span id="addBankCard">绑卡</span>
                  </div>
                </div>
                <div class="right tool_control" v-if="isBank==1">
                  <div class="tool_group">
                    <i class="iconfont icon-Selected"></i>
                    <span>已设置</span>
                  </div>

                  <div class="tool_group tool_change">
                    <span>查看</span>
                  </div>
                </div>

              </div>
            </div>
            <el-collapse-transition>
              <div class="safe_item_body accordion-content" v-show="show.c" id="user_bank_list">
                <div class="change_password" v-if="isBank==0">
                  <div class="form">
                    <form id="bindBankCardFrom" method="post" autocomplete="off">
                      <div class="form_group disabled_group">
                        <input type="text" placeholder="真实姓名" v-model="bankInfo.cardholder">
                        <i class="iconfont icon-gantanhao"></i>
                        <div class="info_window"></div>
                      </div>
                      <div class="form_group">
                        <select class="select select_k" v-model="bankInfo.bankCatId" id="bank_id">
                          <option :value="0">请选择银行卡</option>
                          <option :value="item.id" v-for="(item,index) in bankList" :key="index">{{item.bankName}}
                          </option>
                        </select>
                      </div>

                      <div class="form_group">
                        <input type="text" placeholder="请输入银行卡号" v-model="bankInfo.bankNo">
                      </div>

                      <div class="form_group">
                        <input type="text" placeholder="开户行具体地址" v-model="bankInfo.branch">
                      </div>

                      <!-- <div class="form_group">
                                                                    <input type="password" placeholder="校验资金密码" name="pass" id="pass" autocomplete="new-password">
                                                                  </div> -->

                      <button type="button" class="btn btn-radius btn-default" @click="addBank">确 认</button>
                    </form>
                  </div>
                </div>
                <div class="bank_list_div" v-if="isBank==1">
                  <div class="form">
                    <div class="user_bank_item">
                      <img :src="bankCard.pcImg" alt="" class="bank_logo">
                      <label class="label_bank_name">{{bankCard.bankName}}</label>
                      <div class="item_title">
                        <label class="label_bank_account">{{bankCard.bankNo}}</label>
                        <label class="label_default">(默认)</label>

                        <label class="label_default"></label>

                      </div>
                      <i class="iconfont icon-duigou1"></i>
                    </div>

                    <div class="user_bank_item_body">
                      <div class="form_group disabled_group">
                        <input type="text" disabled :value="bankCard.cardholder" readonly>
                      </div>
                      <div class="form_group">
                        <input readonly type="text" :value="bankCard.bankNo">
                      </div>

                      <div class="form_group">
                        <input readonly type="text" :value="bankCard.bankName">
                      </div>
                      <!-- <div class="form_group">
                                                                    <input type="text" value="北京上地支行">
                                                                  </div> -->

                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </div>
    </MemberCommon>
  </div>
</template>
<script>
  import ccaa from "tools/tools.js";
  import MemberCommon from "components/common/memberCommon";
  export default {
    data() {
      return {
        show: {
          a: true,
          b: true,
          c: true
        },
        safe: 1, //此模块下控制选项卡的数据
        getLoginData: {}, //用户登录信息，包括登录地点等
        memberData: null, //从session取出来的用户登录信息
        balance: null, //用户余额
        pword: 0, //判断是否有支付密码
        isBank: 0, //判断是否有银行卡
        bankList: [], //银行卡列表
        start_num: 2, //星级的个数
        logPSW: {
          //设置登录密码
          oldPassword: null,
          newPassword1: null,
          newPassword2: null
        },
        firstZinjin: {
          //初次设置资金密码
          firstZinjin: null
        },
        secondZinjin: {
          //修改资金密码
          oldPassword: null,
          newPassword1: null,
          newPassword2: null
        },
        bankInfo: {
          cardholder: null,
          bankCatId: "0", //已选择的银行卡
          bankNo: null,
          branch: null
        },
        bankCard: null
      };
    },
    components: {
      MemberCommon
    },
    created() {
      this.memberData = ccaa.store.getData("user");
      this.getBalance();
      this.getLogin();
      this.getIsPayPass();
      this.getBankcardList();
      this.safeGrade();
    },
    methods: {
      // 去往提现页面
      tixian(){
        this.$http.post('/member/getBankcardList', {memberId: this.memberData.id}).then(res => {
          if (res.data.isBank) {
            this.$http.post('/member/isPayPass', {memberId: this.memberData.id}).then(res => {
              if (res.data.pword) {
                this.$router.push('/memberCenter/caiwu/2')
              } else {
                this.$message({
                  message: '请设置资金密码',
                  type: 'warning'
                });
                /* this.$router.push('/memberCenter/person') */
              }
            })
          } else {
            this.$message({
              message: '试玩账号不能提现',
              type: 'warning'
            });
          }
        })
      },
      checkzijinPsw(a, b) {
        let reg = /^\d{6}$/g;
        if (!reg.test(this[a][b])) {
          this.$message({
            message: "请输入6位纯数字",
            type: "warning"
          });
          this[a][b] = null;
        }
      },
      checkLoginPsw(a) {
        if (a == "newPassword2" && this.logPSW[a]) {
          if (this.logPSW[a] != this.logPSW.newPassword1) {
            this.$message({
              message: "两次密码不一致",
              type: "warning"
            });
            this.logPSW.newPassword2 = null;
          } else if (this.logPSW[a].length < 6) {
            this.$message({
              message: "密码长度至少 6 位字母+数字",
              type: "warning"
            });
            this.logPSW[a] = null;
          }
        } else if (this.logPSW[a]) {
          if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/g.test(this.logPSW[a]))) {
            this.$message({
              message: "密码必须为 6-16 位字母+数字",
              type: "warning"
            });
            this.logPSW[a] = null;
          }
        }
      },
      changeLoginPsw() {
        if (this.logPSW.oldPassword && this.logPSW.newPassword1 && this.logPSW.newPassword2) {
          let obj = {};
          obj.memberId = ccaa.store.getData("user").id;
          obj.oldPassword = this.md5(this.logPSW.oldPassword);
          obj.newPassword = this.md5(this.logPSW.newPassword1);
          console.log(obj);
          this.$http.post("/member/updateLoginPassword", obj).then(res => {
            if (res.data.status == 200) {
              //console.log(res.data)
              this.$message({
                message: res.data.message,
                type: "success"
              });
              this.logPSW.oldPassword = '';
              this.logPSW.newPassword1 = '';
              this.logPSW.newPassword2 = '';
            } else {
              this.$message({
                message: res.data.message,
                type: "warning"
              });
            }
          });
        }
      },
      addBank() {
        let obj = {};
        obj.memberId = ccaa.store.getData("user").id;
        obj.cardholder = this.bankInfo.cardholder;
        obj.bankCatId = this.bankInfo.bankCatId;
        obj.bankNo = this.bankInfo.bankNo;
        obj.branch = this.bankInfo.branch;
        //console.log(obj);
        this.$http.post("/member/addBankCard", obj).then(res => {
          if (res.data.status == 200) {
            console.log(res.data);
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getBankcardList();
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
      },
      confirm() {
        let obj = {};
        obj.memberId = ccaa.store.getData("user").id;
        obj.payPassword = this.md5(this.firstZinjin.firstZinjin);
        this.$http.post("/member/set/pwd", obj).then(res => {
          if (res.data.status == 200) {
            //console.log(res.data)
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getIsPayPass();
            this.isShow('b')
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
      },
      confirm2() {
        if (this.secondZinjin.newPassword1 != this.secondZinjin.newPassword2) {
          this.$message({
            message: "两次密码不一致",
            type: "warning"
          });
          this.secondZinjin.newPassword2 = null;
        } else {
          let obj = {};
          obj.memberId = ccaa.store.getData("user").id;
          obj.oldPassword = this.md5(this.secondZinjin.oldPassword);
          obj.newPassword = this.md5(this.secondZinjin.newPassword1);
          console.log(obj);
          this.$http.post("/member/update/pwd", obj).then(res => {
            if (res.data.status == 200) {
              //console.log(res.data)
              this.$message({
                message: res.data.message,
                type: "success"
              });
              this.secondZinjin = {};
            } else {
              this.$message({
                message: res.data.message,
                type: "warning"
              });
            }
          });
        }
      },
      getBalance() {
        this.$http
          .post("/member/getBlance", {
            memberId: ccaa.store.getData("user").id
          })
          .then(res => {
            if (res.data.status == 200) {
              this.balance = res.data.balance;
              ccaa.store.setData("balance", res.data.balance);
            }
          });
      },
      isShow(index) {
//        if (this.show[index]) {
//          this.show[index] = false;
//        } else {
//          for (let i in this.show) {
//            this.show[i] = false;
//          }
//          this.show[index] = true;
//        }

        for (let i in this.show) {
          this.show[i] = false;
        }
        this.show[index] = true;
      },
      changeSafe(a) {
        this.safe = a;
      },
      /* 算安全等级 */
      safeGrade() {
        this.start_num = 2;
        if (this.pword == 1) {
          this.start_num += 2;
        }
        if (this.isBank == 1) {
          this.start_num += 1;
        }
      },
      /* 获取用户登录信息 */
      getLogin() {
        this.$http
          .post("member/get/login", {
            memberId: ccaa.store.getData("user").id
          })
          .then(res => {
            //console.log(res.data);
            if (res.data.status == 200) {
              this.getLoginData = res.data;
            }
          })
          .catch(err => console.log(err));
      },
      /* 判断用户是否有支付密码 */
      getIsPayPass() {
        this.$http
          .post("/member/isPayPass", {
            memberId: ccaa.store.getData("user").id
          })
          .then(res => {
            if (res.data.status == 200) {
              //console.log(res.data.pword);
              this.pword = res.data.pword;
              this.safeGrade();
              //console.log(this.pword)
            }
          })
          .catch(err => console.log(err));
      },
      /* 获取用户绑定的银行卡 */
      getBankcardList() {
        this.$http
          .post("/member/getBankcardList", {
            memberId: ccaa.store.getData("user").id
          })
          .then(res => {
            if (res.data.status == 200) {
              this.isBank = res.data.isBank;
              console.log(this.isBank);
              this.safeGrade();
              //console.log(res.data.isBank)
              //如果用户没有绑定银行卡，在去请求银行卡接口
              if (!res.data.isBank) {
                this.getBankList();
              } else {
                console.log(res.data);
                this.bankCard = res.data.bankCard;
              }
            } else {
              console.log(res.data.message);
            }
          })
          .catch(err => console.log(err));
      },
      /* 获取银行类型列表 */
      getBankList() {
        this.$http
          .post("/member/bankList")
          .then(res => {
            //console.log(res.data);
            if (res.data.status == 200) {
              this.bankList = res.data.bankList;
            }
          })
          .catch(err => console.log(err));
      }
    },
    beforeRouteLeave(to, from, next) {
      if (
        this.memberData.type == 0 &&
        (to.path == "/memberCenter/caiwu/1" || to.path == "/memberCenter/caiwu/2")
      ) {
        this.$alert("试玩账号不能充值或提现", "温馨提示", {
          confirmButtonText: "确定",
          type: "info",
          center: true
        });
      } else {
        next();
      }
    }
  };
</script>
<style lang="less" scoped>
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

  .pointer {
    cursor: pointer;
  }

  .safe_info_table {
    width: 100%;
    td {
      border: 1px solid #ddd;
      height: 40px;
      padding-left: 2%;
      color: #666;
      font-size: 14px;
    }
    .tit {
      position: relative;
      color: #3e3e3e;
    }
    .wid {
      width: 30%;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .form {
    /*padding-bottom: 20px;*/
    .form_group {
      display: block;
      overflow: hidden;
      margin-bottom: 10px;
      position: relative;
      .psd-label {
        font-size: 14px;
        color: #666;
        padding-right: 15px;
        padding-left: 110px;
      }
      .text_hint {
        color: #c3c3c3;
        padding-left: 10px;
        font-size: 12px;
      }
      input {
        outline: none;
        margin: 0 auto;
        width: 220px;
        height: 7px;
        clear: both;
        margin-bottom: 5px;
        margin-top: 5px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding-left: 12px;
        color: #999;
        padding-top: 14px;
        font-size: 16px;
        padding-bottom: 15px;
      }
      &.disabled_group {
        overflow: inherit;
        i {
          overflow: inherit;
          position: absolute;
          left: 507px;
          top: 15px;
          font-size: 20px;
          width: 25px;
          text-align: center;
          color: #e94335;
          &:hover + .info_window {
            display: block;
          }
        }
        .info_window {
          background: url("../../assets/image/notice_window.png");
          background-repeat: no-repeat;
          background-size: 250px 84px;
          display: none;
          height: 84px;
          width: 250px;
          color: #fff;
          position: absolute;
          right: 3px;
          z-index: 9;
          top: -13px;
        }
      }
      select {
        font-size: 15px;
        margin-left: 5px;
        border: 1px solid #ddd;
        background: #fff;
        outline: none;
      }
      .select_k {
        height: 45px;
        line-height: 45px;
        padding-left: 5px;
        padding-right: 5px;
        width: 285px;
        margin: 0 auto;
        display: block;
      }
    }
    .form_remark {
      color: #333;
      font-size: 14px;
      margin-bottom: 20px;
      padding-left: 110px;
    }
    button {
      display: block;
      margin: 0 auto;
      width: 195px;
      height: 36px;
      line-height: 17px;
      overflow: hidden;
      background: #E6561D;
    }
  }

  .usercenter_info {
    border: 1px solid #ddd;
    overflow: hidden;
    padding: 10px 10px 5px 10px;
    background: url("../../assets/image/usercenter_background.png");
    .left {
      .avatar {
        padding: 10px;
        img {
          width: 85px;
          height: 85px;
          display: block;
        }
      }
      .user_info {
        width: 310px;
        border-right: 1px solid #ddd;
        margin-top: 10px;
        line-height: 29px;
        margin-left: 10px;
        margin-right: 10px;
        ul {
          li {
            font-size: 0.75rem;
            overflow: hidden;
            label {
              float: left;
              padding-right: 10px;
            }
            span.userinfo_username {
              font-size: 1rem;
            }
            i.user_star {
              float: left;
              margin-top: 3px;
            }
            .start_light {
              display: block;
              background: url(https://cpweb.kosungames.com/c9/Public/static/images/start_light.png);
              width: 22px;
              height: 20px;
              background-size: 22px 20px;
              overflow: hidden;
            }
            .start_dark {
              display: block;
              background: url(https://cpweb.kosungames.com/c9/Public/static/images/start_dark.png);
              width: 22px;
              height: 20px;
              background-size: 22px 20px;
              overflow: hidden;
            }
          }
        }
      }
    }
    .right {
      .account_info {
        width: 310px;
        padding-right: 25px;
        overflow: hidden;
        margin-left: 25px;
        .account_balance {
          margin-left: 50px;
          margin-top: 12px;
          label {
            font-size: 0.75rem;
            vertical-align: text-bottom;
            margin-right: 5px;
            padding-right: 5px;
          }
          em {
            color: #e94335;
            font-size: 1.25rem;
          }
        }
        .account_topup {
          padding-top: 25px;
          overflow: hidden;
          margin-left: 50px;
          a.btn {
            width: 100px;
            height: 30px;
            padding: 0px;
            line-height: 30px;
            font-size: 0.9375rem;
            float: left;
            text-decoration: none;
          }
        }
      }
    }
  }

  .btn {
    display: inline-block;
    padding: 10px;
    border: 0px;
    font-size: 1.0625rem;
    color: #fff;
    text-align: center;
    border-radius: 4px;
  }

  .btn-default {
    background: #e94335;
    color: #fff;
  }

  .btn-dark,
  a.btn-dark:hover,
  input.btn-dark:hover,
  .btn-dark-hover {
    background: #d4d7e1;
    color: #fff;
  }

  a.withdraw-btn {
    margin-left: 40px;
  }

  .safe_item {
    /*overflow: hidden;*/
    background: #fff;
    padding: 10px 12px;
    min-height: 438px;
    .safe_item_head {
      padding: 10px;
      overflow: hidden;
      border-bottom: dashed 1px #ddd;
      .info_view {
        width: 520px;
        line-height: 60px;
        i {
          float: left;
          color: #d4d7e1;
          font-size: 40px;
          display: block;
          margin-right: 10px;
        }
        .left {
          h3 {
            float: left;
            font-size: 16px;
            overflow: hidden;
            margin-left: 10px;
            color: #323232;
            line-height: 60px;
            font-weight: 100;
          }
          span {
            float: left;
            font-size: 14px;
            margin-left: 30px;
            color: #999;
            line-height: 60px;
          }
        }
      }
      .tool_control {
        font-size: 14px;
        .tool_group {
          float: left;
          overflow: hidden;
          line-height: 60px;
          font-size: 14px;
          padding-right: 10px;
          text-align: right;
          margin-left: 50px;
          i.iconfont {
            color: #5fdd75;
          }
        }
      }
    }
    .safe_item_body {
      border: 1px solid #dcdcdc;
      width: 680px;
      margin: 20px auto 50px;
      padding: 60px 0;
      position: relative;
    }
  }

  .bank_list_div {
    border: 1px solid #ddd;
    margin-left: 60px;
    margin-right: 60px;
    .user_bank_item {
      display: flex;
      height: 40px;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #ddd;
      padding: 10px 0px;
      align-items: center;
      img {
        margin-left: 30px;
        width: 100px;
        height: 30px;
      }
      .label_bank_name {
        margin-left: 5px;
        height: 24px;
        min-width: 96px;
        max-width: 134px;
        flex: 10%;
      }
      .item_title {
        flex: 40%;
      }
      .icon-duigou1 {
        color: #0f95f6;
        font-size: 20px;
        flex: 1%;
      }
    }
    .user_bank_item_body {
      padding-top: 20px;
      border-bottom: 1px solid #ddd;
    }
  }

  .menus-li {
    overflow: hidden;
    zoom: 1;
    li {
      float: left;
      padding: 0 20px;
      height: 32px;
      line-height: 32px;
      color: #303030;
      cursor: pointer;
      font-size: 14px;
      margin: 0 0 10px 0;
    }
    .on {
      background: #694d85;
      color: #fff;
    }
    .fund:hover {
      color: #A96B94;
    }
  }
</style>
