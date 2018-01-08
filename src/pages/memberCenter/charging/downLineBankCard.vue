<template>
  <div class="sk_main">
    <h2>平台收款</h2>
    <form method="post" action="/Finance/platformPay.html" id="payFrom">
      <section id="step1_section" v-show="step==1">
        <div class="step step1">
        </div>
        <div class="bank_list">
          <div class="bank_item" style="width: 778px;height: 83px;padding-top: 12px;margin: 0 auto;" v-for="(item,index) in subPageData" :key="index">
            <table class="table">
              <thead>
                <tr>
                  <th width="80"></th>
                  <th>银行</th>
                  <th>收款人</th>
                  <th>汇款资讯</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="80">
                    <div class="iradio_square-rc" style="position: relative;">
                      <el-radio v-model="radio" :label="index" style="margin-left: 10px;margin-bottom:0">
                        <span></span>
                      </el-radio>
                    </div>
                  </td>
                  <td width="180" class="imgTd">
                    <img :src="item.bank.pcImg" alt="logo">
                  </td>
                  <td width="120" id="pa_user_name_1">{{item.merchantName}}</td>
                  <td style=" text-align: left; color: #333333; ">
                    <span id="pa_account_1">账号：{{item.merchantNo}}</span>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <div class="from_group" style="color: red">
            <label style="padding-left: 4px;font-size:12px;">* 提交订单前，请先进行转帐操作,以便更迅速的为您服务</label>
          </div>
        </div>
        <input type="button" class="btn btn-radius btn-default" @click="nextStep(2)" value="下一步">
      </section>
      <section id="step2_section" v-show="step==2">
        <div class="step step2">
        </div>
        <div class="step2_form form">
          <div class="form_group">
            <label for="" class="four">存入时间:</label>
            <el-date-picker v-model="saveTime" type="datetime" placeholder="选择日期时间" :clearable="false" style="margin-left: 6px;width: 239px;">
            </el-date-picker>
          </div>
          <div class="form_group">
            <label for="" class="five">存款人姓名:</label>
            <input type="text" placeholder="请输入存款人姓名" v-model="saveName">
          </div>
          <div class="form_group">
            <label for="" class="four">存入金额:</label>
            <input type="text" placeholder="请输入存款金额" v-model="saveAccount">
          </div>
          <div class="form_group">
            <label for="" class="four">存款方式:</label>
            <div id="recharge_type">
              <el-radio-group v-model="radio2">
                <el-radio label="OnlineBanking">网银转账</el-radio>
                <el-radio label="ATMAuto">ATM自动柜员机</el-radio>
                <el-radio label="ATMCash">ATM现金入款</el-radio>
                <el-radio label="BankCounter">银行柜台</el-radio>
                <el-radio label="MobileBank">手机银行转账</el-radio>
                <el-radio label="Wechat" style="margin-left:0">微信转账</el-radio>
                <el-radio label="Alipay">支付宝转账</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="form_group" id="address_bank" v-if="(radio2=='ATMAuto')||(radio2=='ATMCash')">
            <label class="four">所属分行:</label>
            <input style="width:380px;" type="text" placeholder="请输入银行支行名称" v-model="branch">
            <p style="font-size: 14px;color: #636363;margin-left: 110px;margin-top:10px;">例如：（广东省深圳市龙华新区支行）</p>
          </div>
        </div>
        <div class="bank_select">
          <h2>存款银行:</h2>
          <div class="pay_sk2_main" id="pay_sk2_main">
            <ul v-if="step2Data">
              <li @click="getSaveBank(index)" v-for="(item,index) in step2Data.banks" :key="index" :class="{hover:index==saveBankIndex}">
                <img :src="item.pcImg">
              </li>
            </ul>
          </div>
        </div>
        <input type="button" class="btn btn-radius btn-default" @click="nextStep3(3)" value="下一步" />
      </section>
      <section id="step3_section" v-show="step==3">
        <div class="step step3">
        </div>
        <div class="step3_table">
          <table class="table q">
            <tbody class="show_border">
              <tr>
                <td class="td_left">存款人姓名</td>
                <td class="td_right" id="step3_user_name">{{saveName}}</td>
              </tr>
              <tr>
                <td class="td_left">存款金额</td>
                <td class="td_right" id="step3_amount">{{saveAccount}}</td>
              </tr>

              <tr v-if="step2Data">
                <td class="td_left">存入银行</td>
                <td class="td_right" id="step3_to_bank">{{step2Data.bank.name}}</td>
              </tr>

              <tr v-if="branch">
                <td class="td_left">所属支行</td>
                <td class="td_right" id="step3_blong_bank">{{branch}}</td>
              </tr>

              <tr>
                <td class="td_left">存款方式</td>
                <td class="td_right" id="step3_type">{{radio2|filterRadio2}}</td>
              </tr>
              <tr v-if="saveBank">
                <td class="td_left">您使用的银行</td>
                <td class="td_right" id="step3_save_bank">{{saveBank.name}}</td>
              </tr>
              <tr>
                <td class="td_left">存款时间</td>
                <td class="td_right" id="step3_save_time">{{saveTime|filterSaveTime}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <input type="button" class="btn btn-radius btn-default" @click="submit" value="提 交">

      </section>
    </form>
  </div>
</template>
<script>
import tools from "tools/tools.js";
export default {
  data() {
    return {
      radio: 0, //第一步选择银行卡
      step: 1, //控制走哪一步
      step2Data: null, //第二步页面所需数据

      /* 以下为第二步收集的数据 */
      saveTime: Date(), //存入时间
      saveName: null, //存款人姓名
      saveAccount: null, //存款金额
      radio2: null, //存款方式
      saveBank: null, //存款银行数据
      saveBankIndex: null, //当前选择的存款银行下标
      branch: null, //银行支行名称
      goodsName: ["小杜杜", "小鸟", "大毒枭", "飞飞"] //商品名字
    };
  },
  props: ["subPageData", "money","id"],
  created() {
    //console.log(this.id);
    this.saveAccount = this.money;
  },
  methods: {
    nextStep(a) {
      this.step = a;
      this.step2Data = this.subPageData[this.radio];
      // console.log(this.step2Data);
    },
    nextStep3(a) {
      if (!this.saveName) {
        this.$message({
          message: "请输入存款人姓名",
          type: "warning"
        });
      } else if (!this.radio2) {
        this.$message({
          message: "请选择存款方式",
          type: "warning"
        });
      } else if (!this.saveTime) {
        this.$message({
          message: "请输入存款时间",
          type: "warning"
        });
      } else if (!this.saveAccount) {
        this.$message({
          message: "请输入存款金额",
          type: "warning"
        });
      } else if (!this.saveBank) {
        this.$message({
          message: "请选择存款银行",
          type: "warning"
        });
      } else {
        this.step = a;
      }
    },
    getSaveBank(a) {
      this.saveBankIndex = a;
      this.saveBank = this.step2Data.banks[a];
      // console.log(this.saveBank);
    },
    submit() {
      /* 组装数据 */
      let obj = {};
      obj.memberId = tools.store.getData("user").id;
      obj.currencyType = 1;
      obj.settingType = 0;
      obj.settingId = this.id;
      obj.description = {};
      obj.description.saveName = this.saveName;
      obj.description.saveAccount = this.saveAccount;
      obj.description.branch = this.branch;
      obj.description.saveBank_code = this.saveBank.code;
      obj.description.saveBank_name = this.saveBank.name;
      obj.description = JSON.stringify(obj.description);
      obj.payMethod = this.radio2;
      obj.goodsName = this.goodsName[tools.randomFn(0, 3)];
      obj.amount = this.saveAccount;
      console.log(obj);
      this.$http.post("/recharge/order/create", obj).then(res => {
        if (res.status == 200) {
          this.$alert("充值成功", "温馨提示", {
            confirmButtonText: "确定",
            center: true,
            callback: action => {
              this.$emit("gotoNewPage", { safe: 3 });
            }
          });
        } else {
          this.$alert("出错了", {
            confirmButtonText: "确定",
            center: true
          });
        }
      });
    }
  },
  filters: {
    filterSaveTime(a) {
      return tools.getDate(a);
    },
    filterRadio2(a) {
      switch (a) {
        case "OnlineBanking":
          return "网银转账";
          break;
        case "ATMAuto":
          return "ATM自动柜员机";
          break;
        case "ATMCash":
          return "ATM现金入款";
          break;
        case "BankCounter":
          return "银行柜台";
          break;
        case "MobileBank":
          return "手机银行转账";
          break;
        case "Wechat":
          return "微信转账";
          break;
        case "Alipay":
          return "支付宝转账";
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "./btn.less";
.table {
  width: 100%;
  margin-bottom: 20px;
}

.el-radio {
  margin-bottom: 20px;
}

input.btn-default:hover {
  background: #fb6053;
  color: #fff;
}

.form .form_group {
  display: block;
  overflow: hidden;
  margin-bottom: 18px;
  position: relative;
  & > label {
    width: 140px;
    display: block;
    float: left;
    text-align: right;
    font-size: 1rem;
    line-height: 48px;
    padding-right: 10px;
    color: #636363;
  }
  input {
    border: 1px solid #ddd;
    border-radius: 2px;
    width: 296px;
    margin-left: 5px;
    padding-left: 12px;
    color: #999;
    padding-top: 14px;
    font-size: 16px;
    padding-bottom: 15px;
  }
}

.sk_main {
  overflow: hidden;
  padding-bottom: 30px;
  h2 {
    font-size: 14px;
    color: #999999;
    font-weight: 200;
    display: inline-block;
    margin-bottom: 15px;
  }
  .step {
    width: 780px;
    margin: 0 auto;
    height: 60px;
    background-size: 780px 55px;
    background-repeat: no-repeat;
    margin-bottom: 20px;
  }
  .step.step1 {
    background-image: url("../../../assets/image/step1.png");
  }
  .step.step2 {
    background-image: url("../../../assets/image/step2.png");
  }
  .step.step3 {
    background-image: url("../../../assets/image/step3.png");
  }
  .bank_list {
    overflow: hidden;
    margin-bottom: 20px;
  }
  .bank_list {
    .bank_item {
      table {
        border: #eeeae1 solid 1px;
        thead {
          background: #fff8e7;
          height: 33px;
          th {
            border-bottom: 1px solid #ddd;
            text-align: center;
            font-weight: 100;
            color: #666666;
            height: 33px;
            padding: 0px;
            line-height: 33px;
            border-top: 2px solid #e94335;
            border-right: 1px solid #ddd;
            font-size: 14px;
          }
        }
        tbody {
          width: inherit;
          tr {
            td {
              border-right: 1px solid #ddd;
              text-align: center;
              padding: 6px;
              font-size: 12px;
            }
            td.imgTd {
              img {
                width: 131px;
                height: 27.88px;
              }
            }
          }
        }
      }
    }
  }

  .step2_form {
    width: inherit;
    .form_group {
      width: inherit;
      & > label {
        width: 94px;
        letter-spacing: 3px;
        font-size: 14px;
      }
      input {
        width: 228px;
        height: 33px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 10px;
        line-height: 33px;
      }
      #recharge_type {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
  .bank_select {
    margin-bottom: 60px;
    h2 {
      width: 94px;
      letter-spacing: 3px;
      font-size: 14px;
      text-align: right;
      padding-right: 10px;
      color: #636363;
      display: block;
      float: left;
    }
    .pay_sk2_main {
      width: inherit;
      overflow: hidden;
      ul {
        width: inherit;
        li {
          float: left;
          height: 55px;
          padding-left: 20px;
          padding-right: 20px;
          line-height: 73px;
          border: #e1dbd6 solid 1px;
          margin-right: 14px;
          margin-left: 10px;
          width: 140px;
          margin-bottom: 10px;
          &:hover {
            border: #e94335 solid 1px;
            background: url("../../../assets/image/dui.png") right bottom;
            background-size: 33px 34px;
            background-repeat: no-repeat;
          }
          &.hover {
            border: #e94335 solid 1px;
            background: url("../../../assets/image/dui.png") right bottom;
            background-size: 33px 34px;
            background-repeat: no-repeat;
          }
          img {
            width: 140px;
            height: 29.79px;
            border: none;
            display: inline-block;
          }
        }
      }
    }
  }
  .step3_table {
    overflow: hidden;
    margin-bottom: 30px;
    table.table {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      tbody {
        tr {
          overflow: hidden;
          td {
            border-bottom: 1px solid #ddd;
            line-height: 22px;
            font-size: 14px;
            padding: 8px;
          }
          td.td_left {
            overflow: hidden;
            background: #fff8e7;
            border-right: solid #ddd 1px;
            width: 220px;
            padding-left: 20px;
          }
          td.td_right {
            overflow: hidden;
            padding-left: 30px;
          }
        }
      }
    }
  }
}
</style>
