/* 声明state对象 */
const state = {
        playCode: null, //此处记录各彩种的玩法编号
    }
    //声明mutations
const mutations = {
    changePlayCode(state, obj) { //此处改变各彩种的玩法编号
        state.playCode = obj.a;
    },
}
export default { state, mutations }
