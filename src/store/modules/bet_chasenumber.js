/* 声明state对象 */
const state = {
        isAfterNo: 0, //收集是否中奖后停止追号。
    }
    //声明mutations
const mutations = {
    changeIsAfterNo(state, obj) {
        state.isAfterNo = (obj.a); //改变中奖后是否停止追号数据状态。
    },
}
export default { state, mutations }