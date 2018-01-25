<template>
  <div class="qrcode_success">
    <div id="pay_form">
      <div id="pay_title">
        <img src="../../../assets/image/register_success.png">
        <span>{{subPageData.payTypeName}}</span>
      </div>
      <div id="pay_content">
        <span>
          {{subPageData.remark}}
        </span>
      </div>
      <!--<div>-->
        <!--<span>充值金额</span>-->
        <!--<span>subPageData.amount</span>-->
      <!--</div>-->
      <!--<div>-->
        <!--<span>订单号</span>-->
        <!--<span>subPageData.traceno</span>-->
      <!--</div>-->


      <div id="pay_param" class="form">
        <form method="post" id="pay_post_form">
          <div class="form_group">
            <div class="column">
              <label for="" class="three">
                存款金额：
              </label>
              <input type="text" v-model="amount" style="display: none" readonly>
              <span class="sum">￥{{amount}}</span>
            </div>
          </div>
          <!--<div class="form_group">-->
            <!--<div class="column">-->
              <!--<label for="" class="three">-->
                <!--存款时间：-->
              <!--</label>-->
              <!--<el-date-picker v-model="saveTime" type="datetime" placeholder="选择日期时间" :clearable="false" style="margin-left: 5px;width: 208px;">-->
              <!--</el-date-picker>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="form_group">-->
            <!--<div class="column">-->
              <!--<label for="" class="three" title="支付方式" style="letter-spacing:1px;">-->
                <!--昵称：-->
              <!--</label>-->
              <!--<input type="text" placeholder="昵称" v-model="nickName" readonly>-->
            <!--</div>-->
          <!--</div> -->
          <div class="form_group">
            <div class="column">
              <label for="" class="three" title="订单号">
                订单号：
              </label>
              <span class="input">{{subPageData.traceno}}</span>
            </div>
          </div>
          <!--<div class="form_group">-->
            <!--<button type="button" class="btn btn-radius btn-default" style="margin-top:0" @click="submit">提交订单</button>-->
          <!--</div>-->
        </form>
      </div>
    </div>
    <div class="qrcode_box">
      <div id="title">
        <span>扫描以下二维码支付</span>
      </div>
      <div id="img_div">
            <qr-code ref="qrCode" id="qrcode_img" :val="subPageData.barCode" :size="impListData.config.size">
            </qr-code>
        <!--<img id="qrcode_img" :src="subPageData.qrCodeSrc">-->
        <!--<p id="red_tips">任意支付方式转账备注会员号才能秒到账</p>-->
      </div>
    </div>
    <button type="button" class="btn btn-radius btn-default" @click="back">返回</button>
    <button type="button" class="btn btn-radius btn-default" @click="submit">已支付</button>
    <div class="qrcode_step">
      <p class="p_title">温馨提示：</p>
      <p>1、手机扫描右上角二维码图片</p>
      <p>2、24小时存款不限次数，免除所有手续费，3分钟火速入账。</p>
      <p>3、存款遇到问题？立即联络在线客服为您服务。</p>
    </div>
  </div>
</template>
<script>
import tools from "tools/tools.js";
import QrCode from 'components/qrCode';
export default {
  props: ["subPageData", "money", "id"],
  components: {
    QrCode
  },
  data() {
    return {
      amount: this.money, //存款金额
//      saveTime: new Date(), //存入时间
//      nickName: null, //用户输入的昵称
      goodsName: ["小杜杜", "小鸟", "大毒枭", "飞飞"], //商品名字
      impListData: {
        config: {
          value: '',
          bgColor: '#FFFFFF',
          fgColor: '#000000',
          size: 230
        }
      },
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
      }
//      else if (!this.nickName) {
//        this.$message({
//          message: "请输入昵称",
//          type: "warning"
//        });
//      }
      else {
        let obj = {};
        obj.memberId = tools.store.getData("user").id;
        obj.currencyType = 1;
        obj.settingType = 0;
        obj.settingId = this.id;
        obj.description = {};
//        obj.description.saveTime = this.saveTime.getTime();
//        obj.description.nickName = this.nickName;
        obj.description = JSON.stringify(obj.description);
        obj.payMethod = this.radio2;
        obj.goodsName = this.goodsName[tools.randomFn(0, 3)];
        obj.amount = this.amount;
        console.log(obj);
        this.$http.post("/recharge/order/create", obj).then(res => {
          if (res.data.status == 200) {
            this.$emit("gotoNewPage", { safe: 3 });
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
      line-height: 38px;
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
      /*border-bottom: 1px solid #999;*/
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
        margin-top: 25px;
        margin-left: 0px;
        .column {
          label {
            width: 25%;
            /*letter-spacing: 1px;*/
            font-size: 16px;
            height: 30px;
          }
          .input {
            width: 300px;
            float: left;
            padding: 8px 0px 9px 5px;
            border:0;
            font-size: 21px;
            color: #000;
            margin-left: 49px;
            margin-top: 15px;
          }
          .sum {
            width: 300px;
            float: left;
            padding: 8px 0px 9px 5px;
            border: 0;
            color: #000;
            margin-left: 49px;
            margin-top: 15px;font-size: 35px
          }
        }
        label.three {
          /*letter-spacing: 5px;*/
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
        margin: 30px 0px;
        /*width: 200px;*/
        height: 200px;
      }
      #red_tips {
        color: #e94335;
        font-size: 16px;
      }
    }
  }
  .btn {
    display: inline-block;
    margin-left: 105px;
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
