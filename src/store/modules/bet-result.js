import bet_tools from './bet_tools';
const state = {
    isShow: false, //改变追号页面是否显示
    sumMoney: 0,
}
const mutations = {
    altShow(state, obj) {
        state.isShow = obj.a; //控制追号页面是否显示
    },
    closeSingleSumList(state, index) {
        bet_tools.state.sumList.splice(index, 1); //删除SumList数组的某一项数据
    },
    closeAllSumList(state) {
        bet_tools.state.sumList = []; //删除SumList数组的全部数据
    },
    changeSumMoney(state, data) { //记录sumlist里统计的总金额
        state.sumMoney = data;
    }
}
export default { state, mutations }