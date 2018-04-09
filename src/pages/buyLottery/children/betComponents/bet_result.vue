<template>
  <div class="order-area">
    <div class="bet-table">
      <!--<div class="table-cap">-->
        <!--<div class="cap-ct"></div>-->
      <!--</div>-->
      <div class="tb-ct">
        <div class="tb-header">
          <div class="method">玩法</div>
          <div class="betnum">注数</div>
          <div class="amount">单注金额</div>
          <div class="tb-unit">模式</div>
          <div class="tb-rebate">返点</div>
          <div class="total">金额</div>
          <div class="tb-del">&nbsp;</div>
        </div>
        <div class="tb-body">
          <div style="position: relative; overflow: hidden; width: 100%; height: 100%; flex: 1 1 0%;background: #fff">
            <div
              style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: -17px; margin-bottom: -17px;">
              <div class="tb-row" v-for="(val,index) in sumList" :key="index">
                <div class="method">
                  <div class="name">{{val.playCode | transforPlayCode(lotteryCodeList)}}</div>
                  <div class="content" ref="selectedNumber">
                    {{val.selectedNumber | transforSelectedNumber(lotteryCode, playCode)}}
                  </div>
                </div>
                <div class="betnum">{{val.count}}</div>
                <div class="amount">
                  <input type="text" v-model="val.price1" maxlength="5" @blur="onlyPrice(val.price1,index)">
                  <!-- :value="val.price1" -->
                </div>
                <div class="tb-unit">
                  <select v-model="val.unitNum">
                    <!-- :value="val.unitNum" -->
                    <option value="1">元</option>
                    <option value="0.1">角</option>
                    <option value="0.01">分</option>
                  </select>
                </div>
                <div class="tb-rebate">
                  {{val.rebates}}%

                </div>
                <div class="total">
                  {{val.price | formatSummoney(val.count)}}元
                  <!-- {{val.price* val.count}}元 -->
                </div>
                <div class="tb-del">
                  <a href="javascript:;" @click="closeSingle(index)">
                    <i class="iconfont icon-guanbi"></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              style="position: absolute; height: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; left: 2px; border-radius: 3px;">
              <div
                style="position: relative; display: block; height: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); width: 0px;"></div>
            </div>
            <div
              style="position: absolute; width: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; top: 2px; border-radius: 3px;">
              <div
                style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); height: 0px;"></div>
            </div>
          </div>
        </div>
        <div class="tb-footer">
          <div class="zhui-hao">
            <div class="chase-choice">我要追号</div>
            <div class="switch">
              <input type="checkbox" @change="isShow" v-model="isCheck">
              <label>
                <i></i>
              </label>
            </div>
          </div>
          <div class="bet-total">
            <span>
              方案注数
              <span>{{sumCount}}</span>注，总金额
              <span>{{sumMoney}}</span>元
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="bet-actions">
      <button @click="getRandom1">随机一注</button>
      <button @click="getRandom5">随机五注</button>
      <button @click="closeAll">删除全部</button>
      <button class="bet-confirm" @click="confirm" ref="confirm">确认投注</button>
    </div>
  </div>
</template>
<script>
  import ccaa from 'tools/tools.js'
  import bet_selectPlay from '../../../../store/modules/bet_selectPlay';
  export default {
    name: 'result',
    data() {
      return {
        isCheck: false,
        unit: 1,
        sumMoney: 0,
        sumCount: 0
      }
    },
    computed: {
      sumList() {
        let arr = this.$store.state.bet_tools.sumList
        let sumMoney = 0,
          sumCount = 0
        for (let i = 0; i < arr.length; i++) {
//          console.log(arr[i].money)
          sumMoney = sumMoney.add(arr[i].money)
          sumCount = sumCount + arr[i].count
          console.log(sumMoney)
        }
        this.sumMoney = sumMoney
        this.sumCount = sumCount
        this.$store.commit('changeSumMoney', this.sumMoney)
        if (!arr.length) {
          this.isCheck = false //改变追号页面开关为关闭状态
          this.$store.commit('altShow', {a: this.isCheck}) //将此状态发给store
          this.$store.commit('changeSwitch', true) //changeSwitch是控制追号数据请求回来的放哪个数组的,此处将他置为初始值
          this.$store.commit('clearResultList') //清空追号部分的所有数组
          this.$store.commit('clearResultList2') //清空追号部分的所有数组
        }
        return arr
      },
      lotteryCodeList() {
        /* this.lotteryCodeList=this.$store.state.lotteryCodeList; */
        return this.$store.state.lotteryCodeList
      },
      periodsList() {
        return this.$store.state.periodsList
      },
      isAfterNo() {
        return this.$store.state.bet_chasenumber.isAfterNo
      },
      lotteryCode() {
        return this.$store.state.lotteryCode
      },
      playCode() {
        return this.$store.state.bet_selectPlay.playCode
      },
      unitNum() {
        return this.$store.state.bet_tools.unitNum
      },
      odds() {
        return this.$store.state.bet_tools.odds
      },
      rebates() {
        return this.$store.state.bet_tools.rate
      },
      index() {
        return this.$store.state.bet_selectNumber.index
      },
      selectNumPan() {
        //用于在福彩3D和排列三的直选和值中找到对应注数
        return this.$store.state.selectNumPan
      },
      price1() {
        return this.$store.state.bet_tools.price
      },
      switch() {
        return this.$store.state.switch
      },
      resultList() {
        return this.$store.state.resultList
      },
      resultList2() {
        return this.$store.state.resultList2
      }
    },
    watch: {
      sumList: {
        handler(val) {
          this.$store.commit('updateSumList', val)
        },
        deep: true
      }
    },
    beforeDestroy() {
      this.$store.commit('closeAllSumList')
    },
    methods: {
      //控制追号页面是否显示
      isShow() {
        if (this.sumList.length) {
          if (this.isCheck) {
            this.$store.commit('altShow', {a: this.isCheck})
            this.$store.commit('changeSwitch', true) //将控制追号的两个数组的开关置为true
            this.$store.dispatch('getDataAsync', {
              this: this,
              data: {lotteryNo: this.lotteryCode, page: 10}
            })
          } else {
            this.$store.commit('altShow', {a: this.isCheck})
            this.$store.commit('clearResultList') //清空追号部分的所有数组
            this.$store.commit('clearResultList2') //清空追号部分的所有数组
          }
        } else {
          this.isCheck = false
          this.$alert('请先添加投注内容', '温馨提示', {
            confirmButtonText: '确定'
          })
        }
      },
      //删除sumlist单条数据
      closeSingle(index) {
        this.$store.commit('closeSingleSumList', index)
      },
      //删除sumlist全部
      closeAll() {
        this.$confirm('是否要删除全部订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('closeAllSumList')
          this.$store.commit('clearIndex')
        })
      },
      //单注投注金额 最大最小值
      onlyPrice(value, index) {
        let lottery = bet_selectPlay.state.playCode
        console.log(lottery)
        this.lotteryList = this.$store.state.lotteryCodeList
        console.log(this.lotteryList[0].noteMaxMoney)
        let single = this.lotteryList.filter(item => {
          return Number(item.codeNo) === lottery
        })[0]
        if (this.sumList[index].price1 > single.noteMaxMoney) {
          console.log(this.sumList[index].price1)
          this.sumList[index].price1 = single.noteMaxMoney
          this.$alert('单注金额不能大于' + single.noteMaxMoney, '温馨提示', {
            confirmButtonText: '确定'
          })
        } else if (this.sumList[index].price1 < single.noteMinMoney) {
          this.sumList[index].price1 = single.noteMinMoney
          this.$alert('单注金额不能小于' + single.noteMinMoney, '温馨提示', {
            confirmButtonText: '确定'
          })
        } else if (this.sumList[index].price < single.noteMinMoney) {
          this.sumList[index].price1 = single.noteMinMoney * 100
          this.$alert('单注金额不能小于' + single.noteMinMoney, '温馨提示', {
            confirmButtonText: '确定'
          })
        }

      },
      //点击确认投注时执行的操作
      confirm() {
        this.$refs.confirm.disabled = true
        /* 总体判断用户是否登陆 */
        if (!ccaa.store.getData('user').id) {
          this.$alert('请先登录然后投注', '温馨提示', {
            confirmButtonText: '确定',
            center: true,
            callback: () => {
              this.$store.commit('closeAllSumList')
              this.$refs.confirm.disabled = false
            }
          })
        } else if (this.sumList.length == 0) {
          this.$alert('请先选择号码', '温馨提示', {
            confirmButtonText: '确定',
            center: true,
            callback: () => {
              this.$refs.confirm.disabled = false
            }
          })
        } else if (this.sumCount > 2000) {
          this.$alert('最大投注数为2000注', '温馨提示', {
            confirmButtonText: '确定',
            callback: () => {
              this.$refs.confirm.disabled = false
            }
          })
          console.log(this.sumMoney)
        } else {
          let lottery = bet_selectPlay.state.playCode
          console.log(lottery)
          this.lotteryList = this.$store.state.lotteryCodeList
          console.log(this.lotteryList[0].noteMaxMoney)
          let single = this.lotteryList.filter(item => {
            return Number(item.codeNo) === lottery
          })[0]
          if (this.sumMoney > single.itemMaxMoney) {
            this.$alert('总金额不能大于' + single.itemMaxMoney, '温馨提示', {
              confirmButtonText: '确定',
              callback: () => {
                this.$refs.confirm.disabled = false
              }
            })
            return
          }


          for (let i in this.sumList) {
            if (this.sumList[i].price === 0) {
              this.$alert('单注金额需大于0', '温馨提示', {
                confirmButtonText: '确定',
                center: true
              }).then(() => {
                this.$refs.confirm.disabled = false
              })
              return
            }
          }
          let memberId
          memberId = ccaa.store.getData('user').id
          //第一步：重组sumlist数组
          let sumList = []
          this.sumList.forEach((item, index) => {
            let obj = {}
            obj.price = item.price
            obj.count = item.count
            obj.money = item.money
            obj.odds = Number(item.odds)
            obj.playCode = item.playCode
            obj.rebates = Number(item.rebates / 100)
            obj.selectedNumber = item.selectedNumber
            ;(obj.selectedNumberTitle = this.$refs.selectedNumber[
              index
              ].innerHTML),
              sumList.push(obj)
          })
          console.log(this.sumList)
          //第二部重组periodsList数组
          let periodsList = []
          /* 判断追号页面开关值 */
          if (this.isCheck) {
            if (this.resultList.length != 0) {
              this.resultList.forEach(res => {
                if (res.ischeck) {
                  let obj = {}
                  obj.issue = res.issueNo
                  obj.multiple = res.multiple
                  periodsList.push(obj)
                }
              })
            } else {
              periodsList = this.periodsList
            }
          } else {
            periodsList = this.periodsList
          }
          //console.log(sumList);
          //第三步：组建obj对象，发给后台的最终数据
          let obj = {
            periodsList: periodsList,
            isAfterNo: this.isAfterNo,
            lotteryCode: this.lotteryCode,
            sumMoney: this.sumMoney.toFixed(2),
            memberId: memberId,
            sumList: sumList
          }
          console.log(obj)
          //第四步：向后台发送请求
          this.$http
            .post('/member/buy/betting', obj)
            .then(res => {
              //console.log(res.data)
              if (res.data.status == 200) {
                this.$http.post("/member/getBlance", { memberId: memberId })
                  .then(res => {
                    if (res.data.status == 200) {
                      let balanceMoney = res.data.balance
                      ccaa.store.setData("balance", balanceMoney)
                    }
                  }).catch(res => console.log(res));
                this.$alert('投注成功', '温馨提示', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: () => {
                    this.$refs.confirm.disabled = false
                  }
                });
              } else {
                this.$alert(res.data.message, '温馨提示', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: () => {
                    this.$refs.confirm.disabled = false
                  }
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
          //第五步：清空sumlist数组
          this.$store.commit('closeAllSumList')
          this.$store.commit('clearIndex')
        }
      },
      //组装sumList里的对象的公共方法，为随机选注数最准备
      getArr1(num, min, max) {
        return [ccaa.getRandomArr(num, min, max)]
      },
      getArr2(num, min, max) {
        let arr = ccaa.getRandomArr(num, min, max)
        let arr1 = []
        for (let i = 0; i < num; i++) {
          let arr3 = []
          arr3.push(arr[i])
          arr1.push(arr3)
        }
        return arr1
      },
      //参数说明：
      /* num:随机产生几个数
       min：从几开始
       max：最大是几
       num2：产生的二维数组外层数组有几个元素 */
      getArr3(num, min, max, num2) {
        let arr = ccaa.getRandomArr(num, min, max)
        let index = ccaa.randomFn(0, num2 - 1)
        //console.log(index)
        let arr2 = []
        for (let i = 0; i < num2; i++) {
          if (i == index) {
            let arr1 = [arr[0]]
            arr2.push(arr1)
          } else {
            let arr1 = []
            arr2.push(arr1)
          }
        }
        return arr2
      },
      //直接在二维数组添加既定的数
      getArr4(num) {
        return [[num]]
      },
      //二维数组里第一个元素里有一个元素，第二个有三个元素
      getArr5(num, min, max, num2) {
        let arr = ccaa.getRandomArr(num, min, max)
        let arr1 = [arr.splice(0, num2), arr]
        return arr1
      },
      getArr7(num, min, max, num2) {
        let arr = ccaa.getRandomArr(num, min, max)
        let arr2 = []
        for (let i = 0, j = 0; i < 5; i++) {
          if (num2.indexOf(i) != -1) {
            let arr1 = [arr[j]]
            arr2.push(arr1)
            j++
          } else {
            let arr1 = []
            arr2.push(arr1)
          }
        }
        return arr2
      },
      getArr8(num, min, max, num2) {
        let arr = ccaa.getRandomArr(num, min, max)
        let arr2 = [num2, arr]
        return arr2
      },
      getCount(arr) {
        //console.log(arr);
        let count = 1
        for (let i = 0; i < this.selectNumPan.length; i++) {
          for (let j = 0; j < this.selectNumPan[i].childNodes.length; j++) {
            if (
              this.selectNumPan[i].childNodes[j].innerHTML == arr[0] ||
              this.selectNumPan[i].childNodes[j].innerHTML == arr[1]
            ) {
              count = Number(
                this.selectNumPan[i].childNodes[j].getAttribute('selfkey')
              )
            }
          }
        }
        return count
      },
      /* 组建随机选号的sumlist数组 */
      getSumlistObj(num, getarr, min, max, num2) {
        let odds = 0
        let arr = this[getarr](num, min, max, num2)
        if (
          (this.lotteryCode == 31 ||
          this.lotteryCode == 32 ||
          this.lotteryCode == 33) &&
          this.playCode == 1
        ) {
          odds = this.odds[arr[0][0] - 3]
        } else {
          odds = this.odds[0]
        }
        /* 针对排列三类的直选和值找注数 */
        let count = 1
        if (
          (this.lotteryCode == 101 || this.lotteryCode == 102) &&
          (this.playCode == 1112 ||
          this.playCode == 1215 ||
          this.playCode == 1216)
        ) {
          count = this.getCount(arr)
        } else if (
          (this.lotteryCode == 101 || this.lotteryCode == 102) &&
          this.playCode == 1113
        ) {
          count = 2
        } else if (
          (this.lotteryCode == 21 ||
          this.lotteryCode == 22 ||
          this.lotteryCode == 23 ||
          this.lotteryCode == 24 ||
          this.lotteryCode == 25 ||
          this.lotteryCode == 26) &&
          (this.playCode == 1312 ||
          this.playCode == 2513 ||
          this.playCode == 2613 ||
          this.playCode == 1813)
        ) {
          count = 2
        } else if (
          (this.lotteryCode == 21 ||
          this.lotteryCode == 22 ||
          this.lotteryCode == 23 ||
          this.lotteryCode == 24 ||
          this.lotteryCode == 25 ||
          this.lotteryCode == 26) &&
          this.playCode == 1213
        ) {
          count = 5
        } else if (
          (this.lotteryCode == 21 ||
          this.lotteryCode == 22 ||
          this.lotteryCode == 23 ||
          this.lotteryCode == 24 ||
          this.lotteryCode == 25 ||
          this.lotteryCode == 26) &&
          (this.playCode == 2312 || this.playCode == 2412)
        ) {
          count = 4
        } else if (
          (this.lotteryCode == 21 ||
          this.lotteryCode == 22 ||
          this.lotteryCode == 23 ||
          this.lotteryCode == 24 ||
          this.lotteryCode == 25 ||
          this.lotteryCode == 26) &&
          (this.playCode == 1314 ||
          this.playCode == 2512 ||
          this.playCode == 2612 ||
          this.playCode == 1413 ||
          this.playCode == 1416 ||
          this.playCode == 2011 ||
          this.playCode == 2022 ||
          this.playCode == 2023 ||
          this.playCode == 2024 ||
          this.playCode == 2025)
        ) {
          count = this.getCount(arr)
        }

        let obj = {
          count: count,
          odds: odds,
          playCode: this.playCode,
          rebates: this.rebates,
          selectedNumber: arr, //随机选号二维数组
          unitNum: this.unitNum,
          price1: this.price1,
          price: this.price1 * this.unitNum,
          money: this.price1 * this.unitNum * this.count
        }
        this.$store.commit('addTosumList', obj)
      },
      getSumlistObj5(num, getarr, min, max, num2) {
        for (let i = 0; i < 5; i++) {
          this.getSumlistObj(num, getarr, min, max, num2)
        }
      },
      getRandom1() {
        if (
          this.lotteryCode == 11 ||
          this.lotteryCode == 12 ||
          this.lotteryCode == 13 ||
          this.lotteryCode == 14 ||
          this.lotteryCode == 15
        ) {
          switch (this.playCode) {
            case 1:
              this.getSumlistObj(2, 'getArr1', 1, 11)
              break
            case 22:
              this.getSumlistObj(1, 'getArr1', 1, 11)
              break
            case 2:
              this.getSumlistObj(3, 'getArr1', 1, 11)
              break
            case 3:
              this.getSumlistObj(4, 'getArr1', 1, 11)
              break
            case 4:
              this.getSumlistObj(5, 'getArr1', 1, 11)
              break
            case 5:
              this.getSumlistObj(6, 'getArr1', 1, 11)
              break
            case 6:
              this.getSumlistObj(7, 'getArr1', 1, 11)
              break
            case 7:
              this.getSumlistObj(8, 'getArr1', 1, 11)
              break
            case 23:
              this.getSumlistObj(1, 'getArr1', 1, 11)
              break
            case 10:
              this.getSumlistObj(2, 'getArr1', 1, 11)
              break
            case 12:
              this.getSumlistObj(3, 'getArr1', 1, 11)
              break
            case 9:
              this.getSumlistObj(2, 'getArr2', 1, 11)
              break
            case 11:
              this.getSumlistObj(3, 'getArr2', 1, 11)
              break
            case 24:
              this.getSumlistObj(1, 'getArr3', 1, 11, 5)
              break
          }
        } else if (
          this.lotteryCode == 31 ||
          this.lotteryCode == 32 ||
          this.lotteryCode == 33
        ) {
          switch (this.playCode) {
            case 1:
              this.getSumlistObj(1, 'getArr1', 3, 18)
              break
            case 3:
              this.getSumlistObj(1, 'getArr1', 1, 6)
              break
            case 2:
              this.getSumlistObj(390, 'getArr4')
              break
            case 4:
              this.getSumlistObj(3, 'getArr1', 1, 6)
              break
            case 5:
              this.getSumlistObj(391, 'getArr4')
              break
            case 6:
              this.getSumlistObj(1, 'getArr1', 1, 6)
              break
            case 7:
              this.getSumlistObj(2, 'getArr2', 1, 6)
              break
            case 8:
              this.getSumlistObj(2, 'getArr1', 1, 6)
              break
            case 9:
              this.getSumlistObj(2, 'getArr2', 1, 6)
              break
          }
        } else if (this.lotteryCode == 101 || this.lotteryCode == 102) {
          switch (this.playCode) {
            case 1111:
              this.getSumlistObj(3, 'getArr2', 0, 9)
              break
            case 1112:
              this.getSumlistObj(1, 'getArr1', 0, 27)
              break
            case 1113:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break
            case 1114:
              this.getSumlistObj(3, 'getArr1', 0, 9)
              break
            case 1216:
              this.getSumlistObj(1, 'getArr1', 0, 18)
              break
            case 1211:
              this.getSumlistObj(2, 'getArr2', 0, 9)
              break
            case 1212:
              this.getSumlistObj(2, 'getArr2', 0, 9)
              break
            case 1215:
              this.getSumlistObj(1, 'getArr1', 0, 18)
              break
            case 1213:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break
            case 1214:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break
            case 1311:
              this.getSumlistObj(1, 'getArr3', 0, 9, 3)
              break
            case 1411:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break
          }
        } else if (this.lotteryCode == 41 || this.lotteryCode == 42) {
          switch (this.playCode) {
            case 1:
              this.getSumlistObj(1, 'getArr1', 1, 10)
              break
            case 2:
              this.getSumlistObj(2, 'getArr2', 1, 10)
              break
            case 3:
              this.getSumlistObj(3, 'getArr2', 1, 10)
              break
            case 5:
              this.getSumlistObj(1, 'getArr3', 1, 10, 5)
              break
            case 6:
              this.getSumlistObj(1, 'getArr3', 1, 10, 5)
              break
            case 7:
              this.getSumlistObj(1, 'getArr1', 201, 202)
              break
            case 8:
              this.getSumlistObj(1, 'getArr1', 201, 202)
              break
            case 9:
              this.getSumlistObj(1, 'getArr1', 201, 202)
              break
            case 10:
              this.getSumlistObj(1, 'getArr1', 203, 204)
              break
            case 11:
              this.getSumlistObj(1, 'getArr1', 203, 204)
              break
            case 12:
              this.getSumlistObj(1, 'getArr1', 203, 204)
              break
          }
        } else if (
          this.lotteryCode == 21 ||
          this.lotteryCode == 22 ||
          this.lotteryCode == 23 ||
          this.lotteryCode == 24 ||
          this.lotteryCode == 25 ||
          this.lotteryCode == 26
        ) {
          switch (this.playCode) {
            case 1111:
              this.getSumlistObj(1, 'getArr3', 0, 9, 5)
              break //定位胆
            case 1211:
              this.getSumlistObj(5, 'getArr2', 0, 9)
              break //五星直选 复式
            case 1213:
              this.getSumlistObj(5, 'getArr2', 0, 9)
              break //五星直选 组合
            case 1214:
              this.getSumlistObj(5, 'getArr1', 0, 9)
              break //五星组选 120
            case 1215:
              this.getSumlistObj(4, 'getArr5', 0, 9, 1)
              break //五星组选 60
            case 1216:
              this.getSumlistObj(3, 'getArr5', 0, 9, 2)
              break //五星组选 30
            case 1217:
              this.getSumlistObj(3, 'getArr5', 0, 9, 1)
              break //五星组选 20
            case 1218:
              this.getSumlistObj(2, 'getArr5', 0, 9, 1)
              break //五星组选 10
            case 1219:
              this.getSumlistObj(2, 'getArr5', 0, 9, 1)
              break //五星组选 5
            case 2311:
              this.getSumlistObj(4, 'getArr2', 0, 9)
              break //后四直选 复试
            case 2312:
              this.getSumlistObj(4, 'getArr2', 0, 9)
              break //后四直选 组合
            case 2313:
              this.getSumlistObj(4, 'getArr1', 0, 9)
              break //后四组选 24
            case 2314:
              this.getSumlistObj(3, 'getArr5', 0, 9, 1)
              break //后四组选 12
            case 2315:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //后四组选 6
            case 2316:
              this.getSumlistObj(2, 'getArr2', 0, 9)
              break //后四组选 4
            case 2411:
              this.getSumlistObj(4, 'getArr2', 0, 9)
              break //前四直选 复试
            case 2412:
              this.getSumlistObj(4, 'getArr2', 0, 9)
              break //前四直选 组合
            case 2413:
              this.getSumlistObj(4, 'getArr1', 0, 9)
              break //前四组选 24
            case 2414:
              this.getSumlistObj(3, 'getArr5', 0, 9, 1)
              break //前四组选 12
            case 2415:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //前四组选 6
            case 2416:
              this.getSumlistObj(2, 'getArr2', 0, 9)
              break //前四组选 4
            case 1311:
              this.getSumlistObj(3, 'getArr2', 0, 9)
              break //后三直选 复试
            case 1314:
              this.getSumlistObj(1, 'getArr1', 0, 27)
              break //后三直选 直选和值
            case 1312:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //后三组选 组3
            case 1313:
              this.getSumlistObj(3, 'getArr1', 0, 9)
              break //后三组选 组6
            case 2511:
              this.getSumlistObj(3, 'getArr2', 0, 9)
              break //中三直选 复试
            case 2512:
              this.getSumlistObj(1, 'getArr1', 0, 27)
              break //中三直选 直选和值
            case 2513:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //中三组选 组3
            case 2514:
              this.getSumlistObj(3, 'getArr1', 0, 9)
              break //中三组选 组6
            case 2611:
              this.getSumlistObj(3, 'getArr2', 0, 9)
              break //前三直选 复试
            case 2612:
              this.getSumlistObj(1, 'getArr1', 0, 27)
              break //前三直选 直选和值
            case 2613:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //前三组选 组3
            case 2614:
              this.getSumlistObj(3, 'getArr1', 0, 9)
              break //前三组选 组6
            case 1411:
              this.getSumlistObj(2, 'getArr2', 0, 9)
              break //后二直选 复试
            case 1413:
              this.getSumlistObj(1, 'getArr1', 0, 18)
              break //后二直选 直选和值
            case 1414:
              this.getSumlistObj(2, 'getArr2', 201, 204)
              break //后二直选 大小单双
            case 1412:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //后二组选 复试
            case 1415:
              this.getSumlistObj(2, 'getArr2', 0, 9)
              break //前二直选 复试
            case 1416:
              this.getSumlistObj(1, 'getArr1', 0, 18)
              break //前二直选 直选和值
            case 1417:
              this.getSumlistObj(2, 'getArr2', 201, 204)
              break //前二直选 大小单双
            case 1418:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //前二组选 复试
            case 1613:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //三星不定胆一码 后三
            case 1622:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //三星不定胆一码 中三
            case 1611:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //三星不定胆一码 前三
            case 1614:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //三星不定胆二码 后三
            case 1623:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //三星不定胆二码 中三
            case 1612:
              this.getSumlistObj(2, 'getArr1', 0, 9)
              break //三星不定胆二码 前三
            case 1711:
              this.getSumlistObj(2, 'getArr7', 0, 9, ccaa.getRandomArr(2, 0, 4))
              break //任二 复试
            case 1713:
              this.getSumlistObj(2, 'getArr8', 0, 9, ccaa.getRandomArr(2, 1, 5))
              break //任二 组选
            case 1811:
              this.getSumlistObj(3, 'getArr7', 0, 9, ccaa.getRandomArr(3, 0, 4))
              break //任三 复试
            case 1813:
              this.getSumlistObj(2, 'getArr8', 0, 9, ccaa.getRandomArr(3, 1, 5))
              break //任三 组3
            case 1814:
              this.getSumlistObj(3, 'getArr8', 0, 9, ccaa.getRandomArr(3, 1, 5))
              break //任三 组6
            case 1911:
              this.getSumlistObj(4, 'getArr7', 0, 9, ccaa.getRandomArr(4, 0, 4))
              break //任四 复试
            case 2011:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //前三跨度
            case 2022:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //中三跨度
            case 2023:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //后三跨度
            case 2024:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //前二跨度
            case 2025:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //后二跨度
            case 2111:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //一帆风顺
            case 2112:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //二帆风顺
            case 2113:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //三帆风顺
            case 2114:
              this.getSumlistObj(1, 'getArr1', 0, 9)
              break //四帆风顺
            case 2211:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //万千
            case 2212:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //万百
            case 2213:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //万十
            case 2214:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //万个
            case 2215:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //千百
            case 2216:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //千十
            case 2217:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //千个
            case 2218:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //百十
            case 2219:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //百个
            case 2220:
              this.getSumlistObj(1, 'getArr1', 246, 248)
              break //十个
          }
        }
      },
      getRandom5() {
        if (
          this.lotteryCode == 11 ||
          this.lotteryCode == 12 ||
          this.lotteryCode == 13 ||
          this.lotteryCode == 14 ||
          this.lotteryCode == 15
        ) {
          switch (this.playCode) {
            case 1:
              this.getSumlistObj5(2, 'getArr1', 1, 11)
              break
            case 22:
              this.getSumlistObj5(1, 'getArr1', 1, 11)
              break
            case 2:
              this.getSumlistObj5(3, 'getArr1', 1, 11)
              break
            case 3:
              this.getSumlistObj5(4, 'getArr1', 1, 11)
              break
            case 4:
              this.getSumlistObj5(5, 'getArr1', 1, 11)
              break
            case 5:
              this.getSumlistObj5(6, 'getArr1', 1, 11)
              break
            case 6:
              this.getSumlistObj5(7, 'getArr1', 1, 11)
              break
            case 7:
              this.getSumlistObj5(8, 'getArr1', 1, 11)
              break
            case 23:
              this.getSumlistObj5(1, 'getArr1', 1, 11)
              break
            case 10:
              this.getSumlistObj5(2, 'getArr1', 1, 11)
              break
            case 12:
              this.getSumlistObj5(3, 'getArr1', 1, 11)
              break
            case 9:
              this.getSumlistObj5(2, 'getArr2', 1, 11)
              break
            case 11:
              this.getSumlistObj5(3, 'getArr2', 1, 11)
              break
            case 24:
              this.getSumlistObj5(1, 'getArr3', 1, 11, 5)
              break
          }
        } else if (
          this.lotteryCode == 31 ||
          this.lotteryCode == 32 ||
          this.lotteryCode == 33
        ) {
          switch (this.playCode) {
            case 1:
              this.getSumlistObj5(1, 'getArr1', 3, 18)
              break
            case 3:
              this.getSumlistObj5(1, 'getArr1', 1, 6)
              break
            case 2:
              this.getSumlistObj5(390, 'getArr4')
              break
            case 4:
              this.getSumlistObj5(3, 'getArr1', 1, 6)
              break
            case 5:
              this.getSumlistObj5(391, 'getArr4')
              break
            case 6:
              this.getSumlistObj5(1, 'getArr1', 1, 6)
              break
            case 7:
              this.getSumlistObj5(2, 'getArr2', 1, 6)
              break
            case 8:
              this.getSumlistObj5(2, 'getArr1', 1, 6)
              break
            case 9:
              this.getSumlistObj5(2, 'getArr2', 1, 6)
              break
          }
        } else if (this.lotteryCode == 101 || this.lotteryCode == 102) {
          switch (this.playCode) {
            case 1111:
              this.getSumlistObj5(3, 'getArr2', 0, 9)
              break
            case 1112:
              this.getSumlistObj5(1, 'getArr1', 0, 27)
              break
            case 1113:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break
            case 1114:
              this.getSumlistObj5(3, 'getArr1', 0, 9)
              break
            case 1216:
              this.getSumlistObj5(1, 'getArr1', 0, 18)
              break
            case 1211:
              this.getSumlistObj5(2, 'getArr2', 0, 9)
              break
            case 1212:
              this.getSumlistObj5(2, 'getArr2', 0, 9)
              break
            case 1215:
              this.getSumlistObj5(1, 'getArr1', 0, 18)
              break
            case 1213:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break
            case 1214:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break
            case 1311:
              this.getSumlistObj5(1, 'getArr3', 0, 9, 3)
              break
            case 1411:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break
          }
        } else if (this.lotteryCode == 41 || this.lotteryCode == 42) {
          switch (this.playCode) {
            case 1:
              this.getSumlistObj5(1, 'getArr1', 1, 10)
              break
            case 2:
              this.getSumlistObj5(2, 'getArr2', 1, 10)
              break
            case 3:
              this.getSumlistObj5(3, 'getArr2', 1, 10)
              break
            case 5:
              this.getSumlistObj5(1, 'getArr3', 1, 10, 5)
              break
            case 6:
              this.getSumlistObj5(1, 'getArr3', 1, 10, 5)
              break
            case 7:
              this.getSumlistObj5(1, 'getArr1', 201, 202)
              break
            case 8:
              this.getSumlistObj5(1, 'getArr1', 201, 202)
              break
            case 9:
              this.getSumlistObj5(1, 'getArr1', 201, 202)
              break
            case 10:
              this.getSumlistObj5(1, 'getArr1', 203, 204)
              break
            case 11:
              this.getSumlistObj5(1, 'getArr1', 203, 204)
              break
            case 12:
              this.getSumlistObj5(1, 'getArr1', 203, 204)
              break
          }
        } else if (
          this.lotteryCode == 21 ||
          this.lotteryCode == 22 ||
          this.lotteryCode == 23 ||
          this.lotteryCode == 24 ||
          this.lotteryCode == 25 ||
          this.lotteryCode == 26
        ) {
          switch (this.playCode) {
            case 1111:
              this.getSumlistObj5(1, 'getArr3', 0, 9, 5)
              break //定位胆
            case 1211:
              this.getSumlistObj5(5, 'getArr2', 0, 9)
              break //五星直选 复式
            case 1213:
              this.getSumlistObj5(5, 'getArr2', 0, 9)
              break //五星直选 组合
            case 1214:
              this.getSumlistObj5(5, 'getArr1', 0, 9)
              break //五星组选 120
            case 1215:
              this.getSumlistObj5(4, 'getArr5', 0, 9, 1)
              break //五星组选 60
            case 1216:
              this.getSumlistObj5(3, 'getArr5', 0, 9, 2)
              break //五星组选 30
            case 1217:
              this.getSumlistObj5(3, 'getArr5', 0, 9, 1)
              break //五星组选 20
            case 1218:
              this.getSumlistObj5(2, 'getArr5', 0, 9, 1)
              break //五星组选 10
            case 1219:
              this.getSumlistObj5(2, 'getArr5', 0, 9, 1)
              break //五星组选 5
            case 2311:
              this.getSumlistObj5(4, 'getArr2', 0, 9)
              break //后四直选 复试
            case 2312:
              this.getSumlistObj5(4, 'getArr2', 0, 9)
              break //后四直选 组合
            case 2313:
              this.getSumlistObj5(4, 'getArr1', 0, 9)
              break //后四组选 24
            case 2314:
              this.getSumlistObj5(3, 'getArr5', 0, 9, 1)
              break //后四组选 12
            case 2315:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //后四组选 6
            case 2316:
              this.getSumlistObj5(2, 'getArr2', 0, 9)
              break //后四组选 4
            case 2411:
              this.getSumlistObj5(4, 'getArr2', 0, 9)
              break //前四直选 复试
            case 2412:
              this.getSumlistObj5(4, 'getArr2', 0, 9)
              break //前四直选 组合
            case 2413:
              this.getSumlistObj5(4, 'getArr1', 0, 9)
              break //前四组选 24
            case 2414:
              this.getSumlistObj5(3, 'getArr5', 0, 9, 1)
              break //前四组选 12
            case 2415:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //前四组选 6
            case 2416:
              this.getSumlistObj5(2, 'getArr2', 0, 9)
              break //前四组选 4
            case 1311:
              this.getSumlistObj5(3, 'getArr2', 0, 9)
              break //后三直选 复试
            case 1314:
              this.getSumlistObj5(1, 'getArr1', 0, 27)
              break //后三直选 直选和值
            case 1312:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //后三组选 组3
            case 1313:
              this.getSumlistObj5(3, 'getArr1', 0, 9)
              break //后三组选 组6
            case 2511:
              this.getSumlistObj5(3, 'getArr2', 0, 9)
              break //中三直选 复试
            case 2512:
              this.getSumlistObj5(1, 'getArr1', 0, 27)
              break //中三直选 直选和值
            case 2513:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //中三组选 组3
            case 2514:
              this.getSumlistObj5(3, 'getArr1', 0, 9)
              break //中三组选 组6
            case 2611:
              this.getSumlistObj5(3, 'getArr2', 0, 9)
              break //前三直选 复试
            case 2612:
              this.getSumlistObj5(1, 'getArr1', 0, 27)
              break //前三直选 直选和值
            case 2613:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //前三组选 组3
            case 2614:
              this.getSumlistObj5(3, 'getArr1', 0, 9)
              break //前三组选 组6
            case 1411:
              this.getSumlistObj5(2, 'getArr2', 0, 9)
              break //后二直选 复试
            case 1413:
              this.getSumlistObj5(1, 'getArr1', 0, 18)
              break //后二直选 直选和值
            case 1414:
              this.getSumlistObj5(2, 'getArr2', 201, 204)
              break //后二直选 大小单双
            case 1412:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //后二组选 复试
            case 1415:
              this.getSumlistObj5(2, 'getArr2', 0, 9)
              break //前二直选 复试
            case 1416:
              this.getSumlistObj5(1, 'getArr1', 0, 18)
              break //前二直选 直选和值
            case 1417:
              this.getSumlistObj5(2, 'getArr2', 201, 204)
              break //前二直选 大小单双
            case 1418:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //前二组选 复试
            case 1613:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //三星不定胆一码 后三
            case 1622:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //三星不定胆一码 中三
            case 1611:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //三星不定胆一码 前三
            case 1614:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //三星不定胆二码 后三
            case 1623:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //三星不定胆二码 中三
            case 1612:
              this.getSumlistObj5(2, 'getArr1', 0, 9)
              break //三星不定胆二码 前三
            case 1711:
              this.getSumlistObj5(2, 'getArr7', 0, 9, ccaa.getRandomArr(2, 0, 4))
              break //任二 复试
            case 1713:
              this.getSumlistObj5(2, 'getArr8', 0, 9, ccaa.getRandomArr(2, 1, 5))
              break //任二 组选
            case 1811:
              this.getSumlistObj5(3, 'getArr7', 0, 9, ccaa.getRandomArr(3, 0, 4))
              break //任三 复试
            case 1813:
              this.getSumlistObj5(2, 'getArr8', 0, 9, ccaa.getRandomArr(3, 1, 5))
              break //任三 组3
            case 1814:
              this.getSumlistObj5(3, 'getArr8', 0, 9, ccaa.getRandomArr(3, 1, 5))
              break //任三 组6
            case 1911:
              this.getSumlistObj5(4, 'getArr7', 0, 9, ccaa.getRandomArr(4, 0, 4))
              break //任四 复试
            case 2011:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //前三跨度
            case 2022:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //中三跨度
            case 2023:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //后三跨度
            case 2024:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //前二跨度
            case 2025:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //后二跨度
            case 2111:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //一帆风顺
            case 2112:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //二帆风顺
            case 2113:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //三帆风顺
            case 2114:
              this.getSumlistObj5(1, 'getArr1', 0, 9)
              break //四帆风顺
            case 2211:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //万千
            case 2212:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //万百
            case 2213:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //万十
            case 2214:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //万个
            case 2215:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //千百
            case 2216:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //千十
            case 2217:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //千个
            case 2218:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //百十
            case 2219:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //百个
            case 2220:
              this.getSumlistObj5(1, 'getArr1', 246, 248)
              break //十个
          }
        }
      }
    },
    filters: {
      formatSummoney(a, b) {
        return ccaa.accMul(a, b)
      },
      transforSelectedNumber(a, lotteryCode, playCode) {
        let b = []
        /* 如果是带单位的，另外处理 */
        if (
          (lotteryCode == 21 ||
          lotteryCode == 22 ||
          lotteryCode == 23 ||
          lotteryCode == 24 ||
          lotteryCode == 25 ||
          lotteryCode == 26) &&
          (playCode == 1713 || playCode == 1813 || playCode == 1814)
        ) {
          let arr = []
          arr = a[0].map(item => {
            switch (item) {
              case 1:
                return '万位'
                break
              case 2:
                return '千位'
                break
              case 3:
                return '百位'
                break
              case 4:
                return '十位'
                break
              case 5:
                return '个位'
                break
            }
          })
          b.push(arr)
          b.push(a[1])
        } else {
          /* 先把数组里应该是汉字的处理了 */
          b = a.map(item => {
            return item.map(val => {
              switch (val) {
                case 246:
                  return '龙'
                  break
                case 247:
                  return '和'
                  break
                case 248:
                  return '虎'
                  break
                case 201:
                  return '大'
                  break
                case 202:
                  return '小'
                  break
                case 203:
                  return '单'
                  break
                case 204:
                  return '双'
                  break
                case 390:
                  return '111,222,333,444,555,666'
                  break
                case 391:
                  return '123,234,345,456'
                  break
                default:
                  return val
              }
            })
          })
        }
        /* 第二步处理成显示的样子 */
        let str = ''
        b.forEach(res => {
          if (res.length == 0) {
            str += '_|'
          } else {
            str += res.join(',') + '|'
          }
        })
        return str.substring(0, str.length - 1)
      },
      transforPlayCode(p, list) {
        for (let i in list) {
          if (list[i].codeNo == p) {
            return list[i].codeName
          }
        }
      }
    }
  }
</script>
<style scoped>
  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    color: #333;
    font-family: Microsoft YaHei, Arial, Helvetica, 'sans-serif';
    outline: none;
    cursor: inherit;
  }
</style>
