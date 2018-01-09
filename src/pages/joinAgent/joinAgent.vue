<template>
    <div>
        <v-header></v-header>
        <div class="main register">
            <div class="register_forms">
                <h1>代理注册</h1>
                <div class="form">
                    <form method="post" action="" id="reg_form">
                        <div class="form_group">
                            <label for="">
                                <span class="form_required">*</span>用户名</label>
                            <input type="text" placeholder="用户名" v-model="form.user" id="reg_username" @blur="checkMemberName('用户名','user')"/> </div>
                        <div class="form_group">
                            <label for="">
                                <span class="form_required">*</span> 登录密码</label>
                            <input type="password" placeholder="登录密码" v-model="form.psw1" @blur="checkMemberPsw('密码','psw1')">
                        </div>
                        <div class="form_group">
                            <label for="">
                                <span class="form_required">*</span> 确认密码</label>
                            <input type="password" placeholder="确认密码" v-model="form.psw2" @blur="checkMemberPsw('密码','psw2')">
                        </div>
                        <div class="form_group">
                            <label for="">
                                <span class="form_required">*</span>联系方式</label>
                            <input type="text" v-model="form.phone" placeholder="手机号/邮箱">
                        </div>
                        <div class="form_group">
                            <label for="">
                                <span class="form_required">*</span>QQ联系号</label>
                            <input type="text" v-model="form.qq" placeholder="QQ联系号">
                        </div>
                        <div class="form_group">
                            <label for="">
                                <span class="form_required">*</span> 验证码</label>
                            <input type="text" size="4" v-model="form.verify" placeholder="验证码" id="input_code">
                            <!-- <img id="verify_code" src="" /> -->
                            <span type="text" @click="getRandom()" class="spanVerify">{{verify}}</span>
                        </div>
                        <div class="select-tos">
                            <el-checkbox v-model="form.ischeck"></el-checkbox>我已经满合法博彩年龄，且同意各项开户条约，
                            <a href="javascript:;" @click="gotoNewPage('/regAgreement')" width="1000" height="653" border="0">“开户协议”</a>
                        </div>
                        <button type="button" class="btn btn-radius btn-default btn-register" name="button" id="goto_reg" @click="register($event)">立即注册</button>
                    </form>
                </div>
            </div>
        </div>
        <v-foot></v-foot>
        <v-body></v-body>
    </div>
</template>
<script>
import ccaa from "tools/tools.js";
import vHeader from "components/header/header";
import vBody from "components/common/body_fixed";
import vFoot from "components/footer/footer";
import url from "static/url.js";
export default {
  data() {
    return {
      form: {
        user: null,
        psw1: null,
        psw2: null,
        phone: null,
        qq: null,
        verify: null,
        ischeck: true
      },
      verify: null
    };
  },
  created() {
    this.getRandom();
  },
  methods: {
    getRandom() {
      this.verify = ccaa.randomFn(1000, 9999);
    },
    gotoNewPage(ad) {
      window.open(
        url + ad,
        "regAgreement",
        "width=1000, height=750,left=10,top=10,"
      );
    },
    checkMemberName(a,b) {
      let reg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_-]{6,16}$/g;
      if (!reg.test(this.form[b])) {
        this.$message({
          message: a+"必须是6-12位字母数字或下划线组合",
          type: "warning"
        });
        this.form[b] = null;
      }
    },
    checkMemberPsw(a,b){
      let reg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/g;
      if (!reg.test(this.form[b])) {
        this.$message({
          message: a+"只能输入6-16位字母数字组合",
          type: "warning"
        });
        this.form[b] = null;
      }
    },
    register() {
      if (
        this.form.user &&
        this.form.psw1 &&
        this.form.psw2 &&
        this.form.phone &&
        this.form.qq &&
        this.form.verify &&
        this.form.ischeck
      ) {
        if (this.form.psw1 == this.form.psw2) {
          if (this.form.verify == this.verify) {
            // console.log('jinlaile')
            let obj = {};
            obj.memberName = this.form.user;
            obj.passWord = this.md5(this.form.psw1);
            obj.phone = this.form.phone;
            obj.qq = this.form.qq;
            this.$http
              .post("/member/register/agent", obj)
              .then(res => {
                //console.log(res.data)
                if (res.data.status == 200) {
                  this.$alert("申请成功,请保持联系方式畅通,工作人员会第一时间联系您", {
                    confirmButtonText: "确定",
                    callback: () => {
                      this.$router.push({
                        path: "/index",
                        component: resolve =>
                          require(["pages/index/index"], resolve)
                      });
                    }
                  });
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
            e.target.disabled = true; //防止在网络不好的情况下多次请求，使数据库数据重复
          } else {
            this.$message({
              message: "验证码输入错误",
              type: "warning"
            });
            this.getRandom();
          }
        } else {
          this.$message({
            message: "两次密码输入不一致",
            type: "warning"
          });
          this.getRandom();
        }
      } else {
        this.$message({
          message: "请将信息填写完整",
          type: "warning"
        });
        this.getRandom();
      }
    }
  },
  components: { vHeader, vBody, vFoot }
};
</script>

<style scoped>
.register {
  background: #fffdfa;
  border: 1px solid #f4f0ed;
  width: 998px !important;
}

.main {
  width: 1000px !important;
  margin: 0 auto;
  overflow: hidden;
}

.register .register_forms {
  width: 570px;
  margin: 0 auto;
  margin-bottom: 50px;
  padding-top: 30px;
  overflow: hidden;
}

.register .register_forms h1 {
  color: #e94335;
  font-size: 22px;
  text-align: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-weight: bold;
}

.form .form_group .form_required {
  font-size: 1.25rem;
  color: #ff4b00;
  width: 13px;
  text-align: right;
  overflow: hidden;
  position: absolute;
  left: 51px;
  top: 3px;
  height: 40px;
}

.form {
  overflow: hidden;
  padding-bottom: 20px;
}

.register .register_remark {
  padding-left: 40px;
  line-height: 29px;
  margin-top: 30px;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.register .register_forms .form_group {
  display: flex;
  flex-wrap: wrap;
}

.form .form_group {
  display: block;
  overflow: hidden;
  margin-bottom: 18px;
  position: relative;
}

.form .select-tos {
  font-size: 0.875rem;
  color: #a8a7a7;
  margin-left: 154px;
  margin-bottom: 30px;
  margin-top: 0px;
  padding-top: 10px;
  overflow: hidden;
  clear: both;
}

button.btn-register {
  margin-left: 154px;
  width: 310px;
  height: 30px;
  line-height: 30px;
  font-size: 22px;
  height: 50px;
  margin-bottom: 20px;
  overflow: hidden;
  background: #e94335;
  color: #fff;
  border-radius: 4px;
  display: inline-block;
  padding: 10px;
  border: 0px;
  text-align: center;
}

.form .form_group #input_code {
  width: 106px;
  float: left;
}

.form .form_group label {
  width: 140px;
  display: block;
  float: left;
  text-align: right;
  font-size: 1rem;
  line-height: 48px;
  padding-right: 10px;
  color: #636363;
}

.form .form_group input {
  border: 1px solid #ddd;
  border-radius: 2px;
  width: 296px;
  margin-left: 5px;
  padding-left: 12px;
  color: #999;
  padding-top: 14px;
  font-size: 16px;
  padding-bottom: 15px;
  outline: none;
}

.form .form_group input:focus {
  border: 1px solid #e94335;
}

.form .form_group #verify_code {
  height: 50px;
  margin-left: 30px;
}

.icheckbox_square-blue {
  background-position: -3px -3px;
}

.icheckbox_square-blue.hover {
  background-position: -30px -3px;
}

.icheckbox_square-blue.checked {
  background-position: -57px -3px;
}

.icheckbox_square-blue,
.iradio_square-blue {
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  padding: 0;
  width: 22px;
  height: 22px;
  background-image: url(https://cpweb.kosunmobile.com/c9/Public/static/images/select@2x.png);
  -webkit-background-size: 287px;
  background-size: 287px;
  border: none;
  cursor: pointer;
}

.form .select-tos a {
  color: #ff8307;
}

.form .select-tos a:hover {
  text-decoration: underline;
}

.register .register_remark {
  padding-left: 40px;
  line-height: 29px;
  margin-top: 30px;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.register .register_remark h2 {
  font-size: 1rem;
  color: red;
  font-weight: 100;
}

.register .register_remark p {
  font-size: 0.875rem;
  color: #666;
}
.spanVerify {
  display: block;
  background: #ccc;
  width: 90px;
  line-height: 49px;
  font-size: 20px;
  color: #666;
  letter-spacing: 8px;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
