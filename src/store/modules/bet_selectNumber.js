import bet_selectPlay from './bet_selectPlay';
import store from '../store.js'
const state = {
  count: 0, //注数记录
  sumListObj: {}, //临时存放选好的数据
  index: [], //记录当前选号盘所选号码的下标
}

const mutations = {
  changeSumListObj2(state, arr) { //收集sumlist的选了什么号的数据
    if (store.state.lotteryCode == 31 || store.state.lotteryCode == 32) {
      if (bet_selectPlay.state.playCode == 2) {
        state.sumListObj.selectedNumber = [
          [390]
        ]
      } else if (bet_selectPlay.state.playCode == 5) {
        state.sumListObj.selectedNumber = [
          [391]
        ]
      } else if (bet_selectPlay.state.playCode == 7 || bet_selectPlay.state.playCode == 6 || bet_selectPlay.state.playCode == 3) {
        let arr1 = [];
        arr1 = arr.map(item => {
          return item.map(item2 => {
            return Number((item2 + "").substring(0, 1))
          })
        });
        state.sumListObj.selectedNumber = arr1
      } else {
        state.sumListObj.selectedNumber = arr
      }
    } else {
      state.sumListObj.selectedNumber = arr
    }
    //console.log(state.sumListObj.selectedNumber)
  },
  changeSumListObj1(state, obj) { //收集sumlist的注数数据
    state.count = obj.a;
    state.sumListObj.count = obj.a;
  },
  //针对快3系列，收集当前选号盘所选号码的下标
  getIndex(state, index) {
    let ind = state.index.indexOf(index);
    if (ind != (-1)) {
      state.index.splice(ind, 1)
    } else {
      state.index.push(index);
    }

  },
  clearIndex() {
    state.index = [];
  }
}
export default {
  state,
  mutations
}
