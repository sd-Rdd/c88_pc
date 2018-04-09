<template>
  <div class="topup_main" v-loading.lock="loading" element-loading-customClass="loadingClass">
    <div class="main_header" >
      <div class="user">
        <em>会员账号:</em>
        <span>{{memberName}}</span>
      </div>
      <div class="money">
        <label for="">
          <em class="red">＊</em>充值金额:</label>
        <div class="form">
          <div class="form_group">
            <input type="text" placeholder="请输入充值金额" v-model="amount" id="amount" @blur="checkAmount"
                   autocomplete="off">
          </div>
        </div>
        <span class="remark" v-if="stopLimit">单笔充值限额: 最低
          <span class="red" id="min_amount">{{stopLimit.min}}</span> 元，最高
          <span class="red" id="max_amount">{{stopLimit.max}}</span> 元</span>
      </div>
    </div>
    <div class="pay_type">

      <h2 style="width:112px;">请选择充值方式：</h2>
      <div class="pay_main" id="pay_main">
        <ul>
          <li v-for="(item,index) in result" :key="index" @click="selectChargingType(index)"
              :class="{hover:currentChargingType==index}">
            <i class="left" :style="{'background-image':'url('+item.icon+')'}"></i>
            <div class="right">
              <a href="javascript:;" class="aline">{{item.name}}</a>
              <p>{{item.description}}</p>
            </div>
          </li>
        </ul>

      </div>
    </div>
    <button class="btn btn-radius btn-default" @click="next">下一步</button>
    <form :action="currentObj.configs[0].platformVO.url" method="post" ref="form1"
          v-if="currentObj&&currentObj.configs[0].platformVO"></form>
    <!--&lt;!&ndash;生成邀请码 模态框&ndash;&gt;-->
    <!--<div class="modal play" v-show="isCodeShow">-->
    <!--<div class="bg" @click="createCode"></div>-->
    <!--<div class="inner">-->
    <!--<qr-code ref="qrCode" :val="impListData.config.value" :size="impListData.config.size">-->
    <!--</qr-code>-->
    <!--<button @click="createCode"> 确定</button>-->
    <!--</div>-->
    <!--</div>-->

    <!--:\Microsoft VS Code\bin;C:\Users\xue\AppData\Local\GitHubDesktop\bin;C:\Users\xue\AppData\Roaming\npm-->

  </div>
</template>
<script>
  import tools from "tools/tools.js";
  import axios from 'axios';
  import QrCode from 'components/qrCode';
  export default {
    components: {
      QrCode
    },
    data() {
      return {
        loading: false,
        /* 充值部分数据开始 */
        result: [], //借口返回来的充值方式数据列表
        currentChargingType: 0, //当前所选择的充值方式
        amount: null, //充值金额
        memberName: tools.store.getData("user").memberName,
        /* 充值部分数据结束 */
      };
    },
    computed: {
      currentObj() {
        console.log(this.result[this.currentChargingType])
        return this.result[this.currentChargingType];
      },
      stopLimit() {
        if (this.currentObj) {
          if (this.currentObj.configs[0].onOrDown) {
            return {
              max: this.currentObj.configs[0].layers[0].onlineDepositMax,
              min: this.currentObj.configs[0].layers[0].onlineDepositMin
            };
          } else {
            return {
              max: this.currentObj.configs[0].layers[0].coltdDepositMax,
              min: this.currentObj.configs[0].layers[0].coltdDepositMin
            };
          }
          /* return this.currentObj.configs[0].stopAmount; */
        }
      },
      onDownOrBankOther() {
        if (this.currentObj) {
          return {
            onOrDown: this.currentObj.configs[0].onOrDown,
            bankOrOther: this.currentObj.configs[0].bankOrOther,
            isShow: this.currentObj.isShow
          };
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
//        关闭二维码
      createCode() {
        this.isCodeShow = false
      },
      checkAmount() {
        let reg = /^((?:-?0)|(?:-?[1-9]\d*))(?:\.\d{1,2})?$/g;
        if (this.amount) {
          if (
            !reg.test(this.amount) ||
            this.amount < this.stopLimit.min ||
            this.amount > this.stopLimit.max
          ) {
            this.$message({
              message: "请正确填写金额",
              type: "warning"
            });
            this.amount = null;
          }
        }
      },
      getList() {
        this.$http
          .post("/pay/setting/list", {
            layerId: tools.store.getData("user").hierarchyId
          })
          .then(res => {
            console.log(tools.store.getData("user").hierarchyId);
            if (res.data.status == 200) {
              //支付方式适用平台（1：PC，2：WAP，3：通用）
              let result = res.data.result.filter((item) => {
                return item.configs[0].plateform !== 2;
              });
              this.result = result;
              console.log(res)
            }
          })
          .catch(res => {
            console.log(res);
          });
      },
      selectChargingType(id) {
        this.currentChargingType = id;
      },
      next() {
        if (!this.amount) {
          this.$message({
            message: "请输入金额",
            type: "warning"
          });
        } else {
          //线下银行卡
          if (
            this.onDownOrBankOther.onOrDown == 0 &&
            this.onDownOrBankOther.bankOrOther == 1
          ) {
            this.$emit("onNext", {
              data: this.currentObj.configs,
              page: "downLineBankCard",
              money: this.amount,
              id: this.currentObj.id
            });
          } else if (
            //线上非银行卡（即第三方支付）
            this.onDownOrBankOther.onOrDown == 1 &&
            this.onDownOrBankOther.bankOrOther == 0
          ) {
            // 第三方支付平台不需要本商户系统展示二维码isShow=0
            if (this.onDownOrBankOther.isShow === 0) {
              let obj = {};
              obj.memberId = tools.store.getData("user").id;
              obj.settingType = this.currentObj.configs[0].onOrDown;
              obj.settingId = this.currentObj.id;
              obj.amount = this.amount;
              obj.payMethod = "ALL";
              obj.goodsName = "彩豆";
              obj.remark = "线上充值";
              // console.log(obj);
              this.$http
                .post("/recharge/order/create", obj)
                .then(res => {
                  if (res.data.status == 200) {
                    console.log(res.data);
                    for (let key in res.data.payArgs) {
                      let input = document.createElement("input"); //创建input节点
                      input.setAttribute("type", "hidden"); //定义类型是文本输入
                      input.setAttribute("name", key); //定义类型是文本输入
                      input.value = res.data.payArgs[key]; //定义类型是文本输入
                      this.$refs.form1.appendChild(input); //添加到form中显示
                    }
                    this.$refs.form1.submit();
                  } else {
                    console.log(res.data);
                  }
                })
                .catch(res => {
                  console.log(res);
                });
              //第三方支付平台需要本商户系统展示二维码isShow!=0
            } else {
              this.loading = true;
              let scan = {
                memberId: tools.store.getData("user").id,
                settingType: this.currentObj.configs[0].onOrDown,
                settingId: this.currentObj.id,
                amount: this.amount,
                payMethod: this.currentObj.payMethod,
                goodsName: "彩豆",
                remark: "线上充值"
              };
              this.$http
                .post("/recharge/order/create", scan)
                .then(res => {
                  if (res.data.status == 200) {
                    console.log(res)
                    let respCode = res.data.result.respCode
                    if (respCode === '00') {
                      let result = {
                        barCode: res.data.result.barCode,
                        traceno: res.data.result.traceno,
                        payTypeName: this.result.filter((item, index) => {
                          return index === this.currentChargingType
                        })[0].name
                      };
                      let data = Object.assign(new Object(), this.currentObj.configs[0], result);
                      console.log(data);
                      this.$emit("onNext", {
                        data: data,
                        page: "QrGmPay",
                        money: this.amount,
                        id: this.currentObj.id
                      })
                    } else {
                      this.$alert(res.data.result.message, {
                        confirmButtonText: "确定",
                        center: true
                      });
                    }

//                  this.impListData.config.value = this.barCode
                  }
                  this.loading = false;
                })
                .catch(res => {
                  console.log(res);
                  this.loading = false;
                });
            }
            //线下非银行卡
          } else if (
            this.onDownOrBankOther.onOrDown == 0 &&
            this.onDownOrBankOther.bankOrOther == 0
          ) {
            this.$emit("onNext", {
              data: this.currentObj.configs[0],
              page: "QrPay",
              money: this.amount,
              id: this.currentObj.id
            });
          }
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "./charging.less";
  @import "./btn.less";

  .topup_main {
    position: relative;
  }

  .play {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    * {
      box-sizing: border-box;
    }
    .inner {
      position: fixed;
      top: 300px;
      left: 500px;
      width: 280px;
      height: 356px;
      background: #fff;
      border-radius: 5%;
      padding: 20px;
      .bg {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>
