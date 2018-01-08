import Vue from 'vue';
import Vuex from 'vuex';
import bet_result from './modules/bet-result';
import bet_selectPlay from './modules/bet_selectPlay';
import bet_selectNumber from './modules/bet_selectNumber';
import bet_tools from './modules/bet_tools';
import bet_chasenumber from './modules/bet_chasenumber';
import tool from 'tools/tools.js';
import lhc from './modules/lhc'
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    bet_result,
    bet_selectPlay,
    bet_selectNumber,
    bet_tools,
    bet_chasenumber,
    lhc
  },
  /* 以下是公共的状态管理 */
  state: {
    lotteryCode: null, //记录当前彩种编号
    periodsList: [], //记录当前期号和倍数
    selectNumPan: [], //选号盘数组
    resultList: [], //追号数组
    resultList2: [], //2号追号数组，用于高级追号
    switch: true, //追号组件里用于判断将数据放在哪个数组里的开关
    /* 以下是具体彩种数据，从接口请求回来后放在这里 */
    logo: null,
    lotteryCodeList: [],
    lotteryName: null,
    maxRebates: null,
    newIssue: null,
    nextIssue: null,
    lotteryResultList: [],
    runLotteryTime: null,
    sysDate: null,
    /* 接口返回的数据结束 */
  },
  mutations: {
    initLotteryData(state){
      state.logo = null;
      state.lotteryCodeList = [];
      state.lotteryName = null;
      state.maxRebates = null;
      state.newIssue = null;
      state.nextIssue = null;
      state.lotteryResultList = [];
    },
    changeIsTitle(state, v) {
      state.isTitle = v; //改变购彩具体彩种的头部开关
    },
    changeLotteryCode(state, obj) {
      state.lotteryCode = (obj.a); //改变当前彩种编号
    },
    changePeriodsList(state, obj) {
      //转换彩种的时候，先清空原有数组
      state.periodsList.length = 0;
      state.periodsList.push(obj); //向PeriodsList数组加一组数据
    },
    changeSelectNumPan(state, arr) {
      //console.log(arr1);
      state.selectNumPan = arr
    },
    changeResultList(state, arr) { //普通追号改变追号数组1里的内容
      let arr1 = [];
      for (let i = 0; i < arr.length; i++) {
        let obj = {};
        obj.ischeck = true;
        obj.issueNo = arr[i].issueNo;
        obj.multiple = 1;
        obj.lotteryTime = tool.getDate(arr[i].lotteryTime);
        arr1.push(obj);
      }
      state.resultList = arr1;
    },
    changeResultList4(state, param) {
      let arr = state.resultList;
      if (typeof (param) === "boolean") {
        for (let i = 0; i < arr.length; i++) {
          arr[i].ischeck = param;
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          arr[i].multiple = param;
        }
      }
      state.resultList = arr;
    },
    changeResultList3(state, arr) { //高级追号改变追号数组1里的内容
      state.resultList = arr;
    },
    changeResultList2(state, arr) { //改变追号数组2里的内容
      state.resultList2 = arr
    },
    changeSwitch(state, val) {
      state.switch = val
    },
    clearResultList(state) { //清空1号追号数组
      state.resultList = [];
    },
    clearResultList2(state) { //清空2号追号数组
      state.resultList2 = [];
    },
    changeLotteryData(state, obj) {
      //console.log(obj)
      state.logo = obj.logo;
      state.lotteryCodeList = obj.lotteryCodeList;
      state.lotteryName = obj.lotteryName;
      state.maxRebates = obj.maxRebates;
      state.newIssue = obj.newIssue;
      state.nextIssue = obj.nextIssue;
      state.lotteryResultList = obj.resultList;
      state.runLotteryTime = obj.runLotteryTime;
      state.sysDate = obj.sysDate;
    },
    changeLotteryData2(state, obj) { //针对六合彩的数据存储方法
      //console.log(obj)
      state.logo = obj.logo;
      state.lotteryName = obj.lotteryName;
      state.newIssue = obj.newIssue;
      state.nextIssue = obj.nextIssue;
      state.lotteryResultList = obj.resultList;
      state.runLotteryTime = obj.runLotteryTime;
      state.sysDate = obj.sysDate;
    },
    /* changeStrCha(state, obj) {
      state.StrCha = obj;
    } */
  },
  actions: {
    getDataAsync({
      commit,
      state
    }, obj) { //请求追号接口的方法
      obj.this.$http.post("/api/code/listIssue", obj.data)
        .then((res) => {
          if (state.switch) {
            commit("changeResultList", res.data.resultList)
          } else {
            commit("changeResultList2", res.data.resultList)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    getLotteryData({
      commit,
      state
    }, obj) {
      return new Promise((resolve, reject) => {
        obj.this.$http.post("/api/code/listCode", obj.data)
          .then((res) => {
            if (res.data.status == 200) {
              // console.log(res.data)
              commit("changeLotteryData", res.data.result);
              commit("changePeriodsList", {
                "issue": res.data.result.newIssue,
                "multiple": 1
              });
              resolve(res.data.result);
            }
          })
          .catch((err) => {
            console.log(err)
          });
      })
    }
  },
})
