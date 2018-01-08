const state = {
  quickSettingMoney: {
    //快捷金额设置的钱
    m1: 1,
    m2: 5,
    m3: 10,
    m4: 20,
    m5: '',
    isCheckBox: true //是否启用快捷金额设置
  },
}
const mutations = {
    changeQuickSettingMoney(state,obj){
      state.quickSettingMoney.isCheckBox=obj.isCheckBox;
      state.quickSettingMoney.m1=obj.m1;
      state.quickSettingMoney.m2=obj.m2;
      state.quickSettingMoney.m3=obj.m3;
      state.quickSettingMoney.m4=obj.m4;
      state.quickSettingMoney.m5=obj.m5;
    }
}
export default {
  state,
  mutations
}
