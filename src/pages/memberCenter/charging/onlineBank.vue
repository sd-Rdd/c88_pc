<template>
  <div class="recharge_bank_select" style="">
    <form method="post" id="online_bank_form">
      <div class="form_group">
        <em>会员账号:</em>
        <span>ileux1234</span>
      </div>
      <div class="form_group">
        <label for="">充值金额:</label>
        <span id="recharge_amount">1</span>
      </div>
      <div class="form_group">
        <label id="pay_bank">选择支付银行:</label>
      </div>
      <div class="from_group" style="color: red">
        <label style="padding-left: 4px">* 提交订单前，请先进行转帐操作,以便更迅速的为您服务</label>
      </div>

      <div class="pay_sk2_main" id="pay_sk2_main">
        <ul>
          <li onclick="sk2_pay(1)" id="pay_1">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d9046d251d7.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_1" value="中国工商银行"/> -->
          </li>
          <li onclick="sk2_pay(2)" id="pay_2">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d90455b6903.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_2" value="中国建设银行"/> -->
          </li>
          <li onclick="sk2_pay(3)" id="pay_3">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d9044749c05.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_3" value="招商银行"/> -->
          </li>
          <li onclick="sk2_pay(4)" id="pay_4">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d904380bb24.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_4" value="中国农业银行"/> -->
          </li>
          <li onclick="sk2_pay(5)" id="pay_5">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d90427803b7.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_5" value="交通银行"/> -->
          </li>
          <li onclick="sk2_pay(6)" id="pay_6">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d90418c0bba.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_6" value="广发银行"/> -->
          </li>
          <li onclick="sk2_pay(7)" id="pay_7">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d9040aae259.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_7" value="中国银行"/> -->
          </li>
          <li onclick="sk2_pay(8)" id="pay_8">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d903f62a1c6.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_8" value="中国民生银行"/> -->
          </li>
          <li onclick="sk2_pay(9)" id="pay_9">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d903e8a0a5e.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_9" value="华夏银行"/> -->
          </li>
          <li onclick="sk2_pay(12)" id="pay_12">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d903d9a75fc.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_12" value="中信银行"/> -->
          </li>
          <li onclick="sk2_pay(13)" id="pay_13">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d903cb9ce66.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_13" value="北京银行"/> -->
          </li>
          <li onclick="sk2_pay(14)" id="pay_14">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d903b999085.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_14" value="兴业银行"/> -->
          </li>
          <li onclick="sk2_pay(15)" id="pay_15">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d903a01c361.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_15" value="平安银行"/> -->
          </li>
          <li onclick="sk2_pay(16)" id="pay_16">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d90391090f1.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_16" value="中国邮政储蓄银行"/> -->
          </li>
          <li onclick="sk2_pay(17)" id="pay_17">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d9037f5a600.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_17" value="上海银行"/> -->
          </li>
          <li onclick="sk2_pay(18)" id="pay_18">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d903682078c.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_18" value="浦发银行"/> -->
          </li>
          <li onclick="sk2_pay(19)" id="pay_19">
            <img src="https://cpweb.kosungames.com/cp77.kosungames.com/uploads/images/20170327/58d90358a1902.png" alt="" class="bank_logo">
            <!-- <input type="hidden" id="save_bank_name_19" value="中国光大银行"/> -->
          </li>
        </ul>
      </div>
      <input type="button" value="确定" id="confirm_bt" class="btn btn-default btn-radius">
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import "./btn.less";
.recharge_bank_select {
  font-size: 14px;
  margin-bottom: 60px;
  .form_group {
    padding: 10px 0px 10px 15px;
    span {
      margin-left: 10px;
    }
  }
  #pay_bank {
    width: 130px;
    letter-spacing: 3px;
    font-size: 14px;
    text-align: left;
    padding-right: 10px;
    color: #636363;
    display: block;
  }
  #pay_sk2_main {
    width: inherit;
    overflow: hidden;
    padding-top: 5px;
    ul {
      padding-left: 15px;
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
        img {
          width: 140px;
          display: inline-block;
        }
        &:hover{
            border: #e94335 solid 1px;
            background: url("../../../assets/image/dui.png") right bottom;
            background-size: 33px 34px;
            background-repeat: no-repeat;
        }
      }
    }
  }
  
}
</style>
