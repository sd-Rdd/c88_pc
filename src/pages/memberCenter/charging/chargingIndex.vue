<template>
  <div class="topup_main">
    <div class="main_header">
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
  </div>
</template>
<script>
  import tools from "tools/tools.js";
  import axios from 'axios';
  export default {
    data() {
      return {
        /* 充值部分数据开始 */
        result: [], //借口返回来的充值方式数据列表
        currentChargingType: 0, //当前所选择的充值方式
        amount: null, //充值金额
        memberName: tools.store.getData("user").memberName
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
              this.result = res.data.result;
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
          if (this.onDownOrBankOther.isShow === 0) {
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
              this.onDownOrBankOther.onOrDown == 1 &&
              this.onDownOrBankOther.bankOrOther == 0
            ) {
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
          } else {
            let scan = {
              memberId: tools.store.getData("user").id,
              settingType: this.currentObj.configs[0].onOrDown,
              settingId: this.currentObj.id,
              amount: this.amount,
              payMethod: this.currentObj.sort,
              goodsName: "通扫",
              remark: "线上充值"
            };
            // console.log(obj);
            this.$http
              .post("/recharge/order/create", scan)
              .then(res => {
                if (res.data.status == 200) {
                  console.log(res);
                  let resualt = res.data.payArgs
                  axios.post({
                    url: 'http://i.kldgz.com/18/passivePay',
                    data: resualt
                  }).then((response) => {
                      console.log(response)
                  })
//                  this.$http.post("http://i.kldgz.com/18/passivePay",resualt).then((resolve) => {
//                      console.log(resolve)
//                  })
                }
              })
              .catch(res => {
                console.log(res);
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
</style>
