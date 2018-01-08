<template>
  <div class="quick-setting-wrap">
      <div class="quick-setting-win">
        <div class="quick-setting-title">
          <span>快捷金额设置</span>
          <i class="el-icon-close" @click="quit"></i>
        </div>
        <div class="quick-setting-content">
          <input v-model="quickSettingMoney.m1">
          <input v-model="quickSettingMoney.m2">
          <input v-model="quickSettingMoney.m3">
          <input v-model="quickSettingMoney.m4">
          <input v-model="quickSettingMoney.m5">
          <div class="status">
            <el-checkbox v-model="quickSettingMoney.isCheckBox">启用</el-checkbox>
            <!-- <span>启用</span> -->
          </div>
        </div>
        <div class="quick-setting-bottom">
          <button class="cancel" @click="quit">取消</button>
          <button class="confirm" @click="QuickMoneySettingConfirm">确定</button>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      quickSettingMoney: {
        //快捷金额设置的钱
        m1: "",
        m2: "",
        m3: "",
        m4: "",
        m5: "",
        isCheckBox: null, //是否启用快捷金额设置
      }
    };
  },
  methods: {
    quit() {
      this.$emit("ShowQuickMoneySetting", false);
    },
    QuickMoneySettingConfirm() {
      this.$store.commit("changeQuickSettingMoney",this.quickSettingMoney);
      this.$emit("ShowQuickMoneySetting", false);
    }
  },
  mounted() {
    let obj = {};
    obj.m1 = this.$store.state.lhc.quickSettingMoney.m1;
    obj.m2 = this.$store.state.lhc.quickSettingMoney.m2;
    obj.m3 = this.$store.state.lhc.quickSettingMoney.m3;
    obj.m4 = this.$store.state.lhc.quickSettingMoney.m4;
    obj.m5 = this.$store.state.lhc.quickSettingMoney.m5;
    obj.isCheckBox = this.$store.state.lhc.quickSettingMoney.isCheckBox;
    this.quickSettingMoney=obj;
  }
};
</script>

