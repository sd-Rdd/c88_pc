<template>
  <div class="lhc-bet-result" v-if="sublotteryCode">
    <div class="desc">
      <div class="dotted"></div>
      <div class="info-check">
        号码组合共
        <span>{{SumGroup}}</span>组
      </div>
      <div class="dotted"></div>
    </div>
    <div class="table" v-if="sublotteryCode.codeNo=='06'">
      <div class="theader">
        <div class="model">模式</div>
        <div class="odds">赔率</div>
        <div class="combination">号码组合</div>
        <div class="operation">操作</div>
      </div>
      <div class="tbody">
        <div style="position: relative; overflow: hidden; width: 100%; height: 100%; flex: 1 1 0%;">
          <div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: -17px; margin-bottom: -17px;">
            <div class="row" v-for="(item,index) in LikeSumlist2" :key="index">
              <div class="model">{{item.mode}}</div>
              <div class="odds">{{item.odds|filterOdds}}</div>
              <div class="combination">{{item.NumberGroup}}</div>
              <div class="operation" @click="$emit('onClear',item.firstIndx)">删除</div>
            </div>
          </div>
          <div style="position: absolute; height: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; left: 2px; border-radius: 3px;">
            <div style="position: relative; display: block; height: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); width: 0px;"></div>
          </div>
          <div style="position: absolute; width: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; top: 2px; border-radius: 3px;">
            <div style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); height: 0px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="table" v-else>
      <div class="theader">
        <div class="sequence">序号</div>
        <div class="model">模式</div>
        <div class="combination">号码组合</div>
        <div class="odds">赔率</div>
      </div>
      <div class="tbody">
        <div style="position: relative; overflow: hidden; width: 100%; height: 100%; flex: 1 1 0%;">
          <div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: -17px; margin-bottom: -17px;">
            <div class="row" v-for="(item,index) in LikeSumlist" :key="index">
              <div class="sequence">组合{{index+1}}</div>
              <div class="model">{{item.mode}}</div>
              <div class="combination">{{item.number.join(',')}}</div>
              <div class="odds">{{item.odds|filterOdds}}</div>
            </div>
          </div>
          <div style="position: absolute; height: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; left: 2px; border-radius: 3px;">
            <div style="position: relative; display: block; height: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); width: 0px;"></div>
          </div>
          <div style="position: absolute; width: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; top: 2px; border-radius: 3px;">
            <div style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); height: 0px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="money">
        <span>下注金额：</span>
        <div style="position:relative" @mouseleave="hideFill($event)">
          <input type="text" placeholder="最低限额1" v-model="price" @click="showFill($event)" @keyup="verify">
          <div class="quick-fill" v-show="false">
            <div @click="getNumber(item,$event)" v-for="(item,index2) in storMoney" :key='index2'>{{item}}元 </div>
          </div>
        </div>
      </div>
      <div class="tips">
        <span>
          单注限额： 100000.00
        </span>
        <br>
        <span>
          单项（号）限额： 500000.00
        </span>
      </div>
      <div class="btn-group">
        <button class="btn confirm" @click="confirm">确认下注</button>
        <button class="btn cancel" @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
import common from './common.js'
import tools from 'tools/tools.js'
export default {
  props: {
    sublotteryCode: Object,
    LikeSumlist: Array,
    SumGroup: Number,
    moreCheck: Object //用于投注成功后清除选号盘
  },
  computed: {
    LikeSumlist2() {
      let arr = []
      //第一步：组建模式字段
      let mode = this.LikeSumlist.length + ' 串 1'
      //第二步：组建赔率字段
      let odds = 1
      this.LikeSumlist.forEach(item => {
        odds = odds.Mul(item.odds)
      })
      //组建新的数组
      this.LikeSumlist.forEach((item, index) => {
        let obj = {}
        if (index == 0) {
          obj.mode = mode
          obj.odds = odds
          obj.NumberGroup = item.NumberGroup
          obj.firstIndx = item.firstIndx
          obj.secondIndex = item.secondIndex
        } else {
          obj.NumberGroup = item.NumberGroup
          obj.firstIndx = item.firstIndx
          obj.secondIndex = item.secondIndex
        }
        arr.push(obj)
      })
      if (arr.length > 1) {
        return arr
      }
    },
    issue() {
      return this.$store.state.newIssue
    },
    sumMoney() {
      return this.LikeSumlist.length * this.price
    },
    storMoney() {
      let finalObj = {}
      let obj = this.$store.state.lhc.quickSettingMoney
      for (let key in obj) {
        if (obj[key]) {
          finalObj[key] = obj[key]
        }
      }
      delete finalObj.isCheckBox
      return finalObj
    },
    isCheckBox() {
      return this.$store.state.lhc.quickSettingMoney.isCheckBox
    }
  },
  data() {
    return {
      price: null
    }
  },
  methods: {
    confirm() {
      if (this.SumGroup == 0) {
        this.$alert('请投注', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        })
      } else if (!this.price) {
        this.$alert('请输入金额', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        })
      } else if (!tools.store.getData('user').id) {
        this.$alert('请登录后再投注', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        })
      } else {
        //第一步，组件sumlist数组
        let sumList = []
        //正码过关是一种特殊情况
        if (this.sublotteryCode.codeNo == '06') {
          let obj = {}
          let arr = []
          let firstName = []
          let secondName = []
          this.LikeSumlist2.forEach(item => {
            let firstInfo = this.sublotteryCode.sixOdds[0].children[
              item.firstIndx
            ]
            let secondInfo = this.sublotteryCode.sixOdds[0].children[
              item.firstIndx
            ].children[item.secondIndex]
            firstName.push(firstInfo.name)
            secondName.push(secondInfo.name)
            arr.push(secondInfo.code)
          })
          obj.numberStrs = [arr]
          obj.playCode = '06'
          obj.selectedNumberTitle =
            '(' + firstName.join() + ')' + secondName.join()
          obj.oddsCodeNo = '0601'
          obj.price = this.price
          obj.money = this.price
          obj.odds = this.LikeSumlist2[0].odds
          obj.count = 1
          obj.rebates = 0
          sumList.push(obj)
        } else {
          //其他的为一种情况
          this.LikeSumlist.forEach(item => {
            let obj = {} //往sumlist数组放的对象
            if (
              this.sublotteryCode.codeNo == '08' ||
              this.sublotteryCode.codeNo == '09' ||
              this.sublotteryCode.codeNo == '12'
            ) {
              obj.numberStrs = [item.code]
            } else {
              obj.numberStrs = [item.number]
            }
            obj.playCode = this.sublotteryCode.codeNo
            obj.selectedNumberTitle = item.number.join(',')
            obj.oddsCodeNo = item.oddsCodeNo
            obj.price = this.price
            obj.money = this.price
            obj.odds = item.odds
            obj.count = 1
            obj.rebates = 0
            sumList.push(obj)
          })
        }
        for (let i in sumList) {
          if (Number(sumList[i].money) === 0) {
            this.$alert('单注金额需大于0', '温馨提示', {
              confirmButtonText: '确定',
              center: true
            }).then(() => {
              this.price = null
            })
            return
          }
        }
        console.log(sumList)
        //第二步：组建传给后台的最终数据
        let finalObj = {}
        finalObj.periodsList = []
        finalObj.periodsList.push({
          issue: this.issue,
          multiple: 1
        })
        finalObj.isAfterNo = 0
        finalObj.lotteryCode = '104'
        if (this.sublotteryCode.codeNo == '06') {
          finalObj.sumMoney = this.price
        } else {
          finalObj.sumMoney = this.sumMoney
        }
        finalObj.memberId = tools.store.getData('user').id
        finalObj.sumList = sumList
        console.log(finalObj)
        //第三步:发送请求
        this.$http.post('/member/buy/betting', finalObj).then(res => {
          if (res.data.status == 200) {
            /* this.$message(res.data.message); */
            this.$alert('投注成功', '温馨提示', {
              confirmButtonText: '确定',
              center: true
            })
            this.$emit(
              'onClearInputprice',
              common.clearInputprice(this.moreCheck)
            )
            this.price = null
          } else {
            /* this.$message(res.data.message); */
            this.$alert(res.data.message, '温馨提示', {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      }
    },
    showFill(a) {
      if (this.isCheckBox) {
        a.target.nextElementSibling.style.display = 'block'
      }
    },
    hideFill(a) {
      a.target.children[1].style.display = 'none'
    },
    getNumber(a, c) {
      this.price = a
      c.target.parentNode.style.display = 'none'
    },
    cancel() {
      this.$emit('onClearInputprice', common.clearInputprice(this.moreCheck))
      this.price = null
    },
    verify() {
      this.price = this.price.replace(/\D/g, '') //验证只能输入正整数
    }
  },
  filters: {
    filterOdds(a) {
      if (a) {
        return Number(a).toFixed(3)
      }
    }
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
</style>
