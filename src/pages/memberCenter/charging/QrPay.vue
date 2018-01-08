<template>
  <div class="qrcode_success">
    <div id="pay_form">
      <div id="pay_title">
        <img src="../../../assets/image/register_success.png">
        <span>{{subPageData.merchantName}}</span>
      </div>
      <div id="pay_content">
        <span>
          {{subPageData.remark}}
        </span>
      </div>
      <div id="pay_param" class="form">
        <form method="post" id="pay_post_form">
          <div class="form_group">
            <div class="column">
              <label for="" class="three">
                存款金额：
              </label>
              <input type="text" placeholder="存款金额" v-model="amount">
            </div>
          </div>
          <div class="form_group">
            <div class="column">
              <label for="" class="three">
                存款时间：
              </label>
              <el-date-picker v-model="saveTime" type="datetime" placeholder="选择日期时间" :clearable="false" style="margin-left: 5px;width: 208px;">
              </el-date-picker>
            </div>
          </div>
          <div class="form_group">
            <div class="column">
              <label for="" class="three" title="支付方式" style="letter-spacing:1px;">
                备注(昵称)：
              </label>
              <input type="text" placeholder="昵称" v-model="nickName">
            </div>
          </div>
          <div class="form_group">
            <button type="button" class="btn btn-radius btn-default" style="margin-top:0" @click="submit">提交订单</button>
          </div>
        </form>
      </div>
    </div>
    <div class="qrcode_box">
      <div id="title">
        <span>扫描以下二维码添加备注会员号</span>
      </div>
      <div id="img_div">
        <img id="qrcode_img" :src="subPageData.qrCodeSrc">
        <p id="red_tips">任意支付方式转账备注会员号才能秒到账</p>
      </div>
    </div>

    <button type="button" class="btn btn-radius btn-default" @click="back">返回</button>
    <div class="qrcode_step">
      <p class="p_title">温馨提示：</p>
      <p>1、手机扫描右上角二维码图片，输入充值金额并填写会员账号作为备注，以便我们可以及时为您
        <br>添加款项，支付完成以后在当前页面填写验证信息(支付方式昵称)并提交订单。</p>
      <p>2、24小时存款不限次数，免除所有手续费，3分钟火速入账。</p>
      <p>3、存款遇到问题？立即联络在线客服为您服务。</p>
    </div>
  </div>
</template>
<script>
import tools from "tools/tools.js";
export default {
  props: ["subPageData", "money", "id"],
  data() {
    return {
      amount: this.money, //存款金额
      saveTime: new Date(), //存入时间
      nickName: null, //用户输入的昵称
      goodsName: ["小杜杜", "小鸟", "大毒枭", "飞飞"] //商品名字
    };
  },
  /* mounted() {
    console.log(this.subPageData);
  }, */
  methods: {
    back() {
      this.$emit("gotoNewPage", { chargingPage: "chargingIndex" });
    },
    submit() {
      /* 组装数据 */
      if (!this.amount) {
        this.$message({
          message: "请输入充值金额",
          type: "warning"
        });
      } else if (!this.nickName) {
        this.$message({
          message: "请输入昵称",
          type: "warning"
        });
      } else {
        let obj = {};
        obj.memberId = tools.store.getData("user").id;
        obj.currencyType = 1;
        obj.settingType = 0;
        obj.settingId = this.id;
        obj.description = {};
        obj.description.saveTime = this.saveTime.getTime();
        obj.description.nickName = this.nickName;
        obj.description = JSON.stringify(obj.description);
        obj.payMethod = this.radio2;
        obj.goodsName = this.goodsName[tools.randomFn(0, 3)];
        obj.amount = this.amount;
        console.log(obj);
        this.$http.post("/recharge/order/create", obj).then(res => {
          if (res.data.status == 200) {
            this.$alert(res.data.message, "温馨提示", {
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
    }
  }
};
</script>
<style lang="less" scoped>
@import "./btn.less";
.form {
  overflow: hidden;
  padding-bottom: 20px;
  .form_group {
    display: block;
    overflow: hidden;
    margin-bottom: 18px;
    position: relative;
    label {
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
}
.qrcode_success {
  padding-bottom: 70px;
  margin-top: 30px;
  #pay_form {
    width: 380px;
    float: left;
    border: 1px solid #999;
    overflow: hidden;
    height: 340px;
    #pay_title {
      width: 100%;
      height: 32px;
      border-bottom: 1px solid #999;
      text-align: left;
      padding-left: 20px;
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
      padding-bottom: 5px;
      img {
        width: 28px;
        line-height: 32px;
        float: left;
      }
      span {
        margin-left: 10px;
        line-height: 32px;
      }
    }
    #pay_content {
      width: 100%;
      border-bottom: 1px solid #999;
      text-align: left;
      padding: 5px 20px;
      font-size: 14px;
      box-sizing: border-box;
      line-height: 20px;
      max-height: 50px;
      overflow: hidden;
    }
    #pay_param {
      width: 100%;
      .form_group {
        margin-top: 15px;
        margin-left: 0px;
        .column {
          label {
            width: 30%;
            letter-spacing: 3px;
            font-size: 14px;
            height: 40px;
          }
          input {
            width: 200px;
            float: left;
            padding: 8px 0px 9px 5px;
          }
        }
        label.three {
          letter-spacing: 5px;
        }
      }
    }
  }
  .qrcode_box {
    width: 380px;
    overflow: hidden;
    margin-bottom: 20px;
    margin-left: 20px;
    height: 340px;
    float: left;
    border: 1px solid #999;
    #title {
      width: 100%;
      height: 46px;
      border-bottom: 1px solid #999;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      span {
        line-height: 46px;
      }
    }
    #img_div {
      width: 100%;
      text-align: center;
      #qrcode_img {
        margin: 20px 0px;
        width: 200px;
        height: 200px;
      }
      #red_tips {
        color: #e94335;
        font-size: 16px;
      }
    }
  }
}
.qrcode_step {
  padding-top: 40px;
  text-align: left;
  padding-left: 50px;
  padding-bottom: 100px;
  p {
    color: #989898;
    font-size: 1rem;
    line-height: 26px;
    overflow: hidden;
    padding: 6px 0;
  }
  .p_title {
    color: #f53730;
    font-weight: 700;
    font-size: 1.125rem;
  }
}
</style>
