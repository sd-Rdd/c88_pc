import bet_selectNumber from './bet_selectNumber';
import bet_selectPlay from './bet_selectPlay';
import ccaa from 'tools/tools.js';
const state = {
    sumList: [], //sumlist数组数据
    unitNum: null,
    rate: null,
    odds: null,
    price: null
}

const mutations = {
    changeSumListObj3(state, obj) {
        if(obj.odds[0].num){
            obj.odds.forEach((res,index)=>{
                let obj1 = {};
                obj1.rebates = obj.rebates;
                obj1.odds = res.odds;
                obj1.price1 = obj.price1;
                obj1.unitNum = obj.unitNum;
                obj1.playCode = bet_selectPlay.state.playCode;
                obj1.selectedNumber = [[res.num]];
                obj1.count = 1;
                /* 需要计算的 */
                obj1.price = obj.price1 * obj.unitNum;
                obj1.money = obj1.price * obj1.count;
                //组装完对象push进数组
                state.sumList.push(obj1);
            })
        }else{
            let obj1 = {};
            obj1.rebates = obj.rebates;
            obj1.odds = obj.odds;
            obj1.price1 = obj.price1;
            obj1.unitNum = obj.unitNum;
            obj1.playCode = bet_selectPlay.state.playCode;
            obj1.selectedNumber = bet_selectNumber.state.sumListObj.selectedNumber;
            obj1.count = bet_selectNumber.state.sumListObj.count;
            /* 需要计算的 */
            obj1.price = obj.price1 * obj.unitNum;
            obj1.money = obj1.price * obj1.count;
            //组装完对象push进数组
            state.sumList.push(obj1);
        }
        
        //清空临时对象和count恢复为0
        bet_selectNumber.state.sumListObj = {};
        bet_selectNumber.state.count = 0;
    },
    /* 随机选号操作 */
    addTosumList(state, obj) {
        state.sumList.push(obj)
    },
    sendDataAll(state, obj) {
        state.unitNum = obj.unitNum;
        state.rate = obj.rate;
        state.odds = obj.odds;
        state.price = obj.price;
    },
    sendDataAll1(state, obj) {
        state.odds = obj.odds;
    },
    sendDataAll2(state, obj) {
        state.rate = obj.rate;
    },
    sendDataAll3(state, obj) {
        state.unitNum = obj.unitNum;
    },
    sendDataAll4(state, obj) {
        state.price = obj.price;
    },
    updateSumList(state, arr) {
        let arr1 = state.sumList;
        for (let i = 0; i < arr.length; i++) {
            arr1[i].price1 = arr[i].price1;
            arr1[i].unitNum = arr[i].unitNum;
            arr1[i].price = ccaa.accMul(arr[i].price1, arr[i].unitNum);
            arr1[i].money = ccaa.accMul(arr1[i].price, arr[i].count);
        }
        state.sumList = arr1;
    }
}
export default { state, mutations }