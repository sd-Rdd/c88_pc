<template>
  <div class="lucky-28" v-if="lotteryCodeList.length!=0">

    <div class="right-part">
      <div style="display: table-cell">
        <!-- 特码玩法开始 -->
        <div class="lucky-grid">
          <div class="grid-header">
            <div style="width:100%;">
              <div class="label">特码</div>
            </div>
          </div>
          <div class="grid-title">
            <div class="title-col">
              <div class="option">选项</div>
              <div class="lucky-odds">赔率</div>
              <div class="money">金额</div>
            </div>
            <div class="title-col">
              <div class="option">选项</div>
              <div class="lucky-odds">赔率</div>
              <div class="money">金额</div>
            </div>
            <div class="title-col">
              <div class="option">选项</div>
              <div class="lucky-odds">赔率</div>
              <div class="money">金额</div>
            </div>
            <div class="title-col">
              <div class="option">选项</div>
              <div class="lucky-odds">赔率</div>
              <div class="money">金额</div>
            </div>
          </div>
          <div class="grid-body" v-if="tema">
            <div class="body-col" v-for="(item,index1) in tema" :key="index1" >
              <div class="body-row" v-for="(item2,index2) in item" :key="index2">
                <div class="option">
                  <div :class="{grey1:item2.num==0||item2.num==13||item2.num==14||item2.num==27,green1:item2.num==1||item2.num==4||item2.num==7||item2.num==10||item2.num==16||item2.num==19||item2.num==22||item2.num==25,blue1:item2.num==2||item2.num==5||item2.num==8||item2.num==11||item2.num==17||item2.num==20||item2.num==23||item2.num==26,red1:item2.num==3||item2.num==6||item2.num==9||item2.num==12||item2.num==15||item2.num==18||item2.num==21||item2.num==24}">{{item2.num}}</div>
                </div>
                <div class="lucky-odds">
                  <span>{{item2.odds}}</span>
                </div>
                <div class="money">
                  <input maxlength="6" v-model="InputPrice['1'+item2.num]" @keyup="verify('1'+item2.num)">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 特码玩法结束 -->
        <!-- 特码包三玩法开始 -->
        <div class="bao-san">
          <div class="label">特码包三</div>
          <!-- <div class="bs-odds" v-if="temabaosan">{{temabaosan[0].odds[0]}}</div> -->
          <div class="bs-content" @mouseleave="hideSelectList">
            <div class="item" @click="showSelectList(0)">
              <div class="num" :class="{grey1:selectNum1.color==1,green1:selectNum1.color==2,blue1:selectNum1.color==3,red1:selectNum1.color==4}">{{selectNum1.num}}</div>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="item" @click="showSelectList(98)">
              <div class="num" :class="{grey1:selectNum2.color==1,green1:selectNum2.color==2,blue1:selectNum2.color==3,red1:selectNum2.color==4}">{{selectNum2.num}}</div>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="item" @click="showSelectList(196)">
              <div class="num" :class="{grey1:selectNum3.color==1,green1:selectNum3.color==2,blue1:selectNum3.color==3,red1:selectNum3.color==4}">{{selectNum3.num}}</div>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="select-list" style="left: 0px;" v-show="isShowSelectList" ref="showSelectList1">
              <div style="position: relative; overflow: hidden; width: 100%; height: 100%; flex: 1 1 0;">
                <div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: -17px; margin-bottom: -17px;">
                  <div class="select-list-item" v-for="(item,index) in Numbers" :key="index">
                    <div :class="{grey1:item.color==1,green1:item.color==2,blue1:item.color==3,red1:item.color==4}" @click="selectThis(item.color,item.num)">{{item.num}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bs-money">
            <span>下注金额：</span>
            <input maxlength="6" v-model="InputPrice['2']" @keyup="verify('2')">
            <span>元</span>
          </div>
        </div>
        <!-- 特码包三玩法结束 -->
        <div class="lucky-grid">
          <div class="grid-header">
            <div style="width:50%;">
              <div class="label">混合</div>
            </div>
            <div style="width:25%;">
              <div class="label">波色</div>
            </div>
            <div style="width:25%;">
              <div class="label">豹子</div>
            </div>
          </div>
          <div class="grid-title">
            <div class="title-col">
              <div class="option">选项</div>
              <div class="lucky-odds">赔率</div>
              <div class="money">金额</div>
            </div>
            <div class="title-col">
              <div class="option">选项</div>
              <div class="lucky-odds">赔率</div>
              <div class="money">金额</div>
            </div>
            <div class="title-col">
              <div class="option">选项</div>
              <div class="lucky-odds">赔率</div>
              <div class="money">金额</div>
            </div>
            <div class="title-col">
              <div class="option">选项</div>
              <div class="lucky-odds">赔率</div>
              <div class="money">金额</div>
            </div>
          </div>
          <div class="grid-body" ><!-- v-if="hunhe&&bose&&baozi" -->
            <!-- 混合玩法开始 -->
            <div class="body-col" v-for="(item,index1) in hunhe" :key="index1" >
              <div class="body-row" v-for="(item2,index2) in item" :key="index2">
                <div class="option">
                  <div style="font-size: 0.875rem;" :class="{widthNum:item2.num.length==2,red1:item2.num=='大'||item2.num=='小'||item2.num=='单'||item2.num=='双',blue1:item2.num=='大单'||item2.num=='小单'||item2.num=='大双'||item2.num=='小双',green1:item2.num=='极大'||item2.num=='极小'}">{{item2.num}}</div>
                </div>
                <div class="lucky-odds">
                  <span>{{item2.odds}}</span>
                </div>
                <div class="money">
                  <input name="0" maxlength="6" v-model="InputPrice['0'+item2.num]" @keyup="verify('0'+item2.num)">
                </div>
              </div>
            </div>
            <!-- 混合玩法结束 -->
            <!-- 波色玩法开始 -->
            <div class="body-col">
              <div class="body-row" v-for="(item2,index2) in bose" :key="index2">
                <div class="option">
                  <div class="widthNum" style="font-size: 0.875rem;" :class="{red1:item2.num=='红波',green1:item2.num=='绿波',blue1:item2.num=='蓝波'}">{{item2.num}}</div>
                </div>
                <div class="lucky-odds">
                  <span>{{item2.odds}}</span>
                </div>
                <div class="money">
                  <input name="0" maxlength="6" v-model="InputPrice['3'+item2.num]" @keyup="verify('3'+item2.num)">
                </div>
              </div>
              <div class="body-row">
                <div class="option"></div>
                <div class="lucky-odds"></div>
                <div class="money"></div>
              </div>
              <div class="body-row">
                <div class="option"></div>
                <div class="lucky-odds"></div>
                <div class="money"></div>
              </div>
            </div>
            <!-- 波色玩法结束 -->
            <!-- 豹子玩法开始 -->
            <div class="body-col">
              <div class="body-row" v-for="(item2,index2) in baozi" :key="index2">
                <div class="option">
                  <div class="widthNum" style="font-size: 0.875rem;">{{item2.num}}</div>
                </div>
                <div class="lucky-odds">
                  <span>{{item2.odds}}</span>
                </div>
                <div class="money">
                  <input name="0" maxlength="6" v-model="InputPrice['4'+item2.num]" @keyup="verify('4'+item2.num)">
                </div>
              </div>
              <div class="body-row">
                <div class="option"></div>
                <div class="lucky-odds"></div>
                <div class="money"></div>
              </div>
              <div class="body-row">
                <div class="option"></div>
                <div class="lucky-odds"></div>
                <div class="money"></div>
              </div>
              <div class="body-row">
                <div class="option"></div>
                <div class="lucky-odds"></div>
                <div class="money"></div>
              </div>
              <div class="body-row">
                <div class="option"></div>
                <div class="lucky-odds"></div>
                <div class="money"></div>
              </div>
            </div>
            <!-- 豹子玩法结束 -->
          </div>
        </div>

      </div>

      <div class="lotteryRight" style="height: 720px;">
        <h3 class="re">
          <span>近期开奖</span>
        </h3>
        <div class="recentCon">
          <ul>
            <li>
              <start-lotto2></start-lotto2>
            </li>
          </ul>
        </div>
      </div>


    </div>


    <div class="lucky-result">
      <div class="bet-table">
        <!--<div class="table-cap">-->
          <!--<div class="cap-ct"></div>-->
        <!--</div>-->
        <div class="tb-ct">
          <div class="tb-header">
            <div class="lk-type">下注类型</div>
            <div class="lk-num">号码</div>
            <div class="lk-betNum">注数</div>
            <div class="lk-amout">金额</div>
            <div class="lk-del"></div>
          </div>
          <div class="tb-body">
            <div style="position: relative; overflow: hidden; width: 100%; height: 100%; background:#fff;flex: 1 1 0%;">
              <div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: -17px; margin-bottom: -17px;">
                <div class="bd-row" v-for="(item,index) in NotesArr" :key="index">
                  <div class="lk-type">{{item.type}}</div>
                  <div class="lk-num" v-if="item.type=='特码包三'">{{item.num.split("-").join()}}</div>
                  <div class="lk-num" v-else>{{item.num}}</div>
                  <div class="lk-betNum">{{item.count}}</div>
                  <div class="lk-amout">{{item.money}}元</div>
                  <div class="lk-del">
                    <i class="el-icon-close" @click="deletItem(index)"></i>
                  </div>
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
          <div class="tb-footer">
            <div class="bet-total">
              <span>
                方案注数
                <span>{{sumCountAndMoney.sumCount}}</span>注，总金额
                <span>{{sumCountAndMoney.sumMoney}}</span>元
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="bet-actions">
        <button class="add" @click="addNotes">添加注单</button>
        <button class="del" @click="deleteAll">删除全部</button>
        <button class="confirm" @click="confirmBet" ref="confirm">确认投注</button>
      </div>
    </div>
  </div>
</template>
<script>
  import startLotto2 from '../betComponents/startlotto2'
import tools from "tools/tools.js";
export default {
    components: { startLotto2 },
  data() {
    return {
      InputPrice: {}, //保存输入框数据
      /* 颜色说明：
                 1：灰色，rgb(153, 153, 153)
                 2：绿色，rgb(56, 190, 79)
                 3：蓝色，rgb(28, 142, 230)
                 4：红色，rgb(241, 23, 23) */
      Numbers: [
        {
          color: 1,
          num: 0
        },
        {
          color: 2,
          num: 1
        },
        {
          color: 3,
          num: 2
        },
        {
          color: 4,
          num: 3
        },
        {
          color: 2,
          num: 4
        },
        {
          color: 3,
          num: 5
        },
        {
          color: 4,
          num: 6
        },
        {
          color: 2,
          num: 7
        },
        {
          color: 3,
          num: 8
        },
        {
          color: 4,
          num: 9
        },
        {
          color: 2,
          num: 10
        },
        {
          color: 3,
          num: 11
        },
        {
          color: 4,
          num: 12
        },
        {
          color: 1,
          num: 13
        },
        {
          color: 1,
          num: 14
        },
        {
          color: 4,
          num: 15
        },
        {
          color: 2,
          num: 16
        },
        {
          color: 3,
          num: 17
        },
        {
          color: 4,
          num: 18
        },
        {
          color: 2,
          num: 19
        },
        {
          color: 3,
          num: 20
        },
        {
          color: 4,
          num: 21
        },
        {
          color: 2,
          num: 22
        },
        {
          color: 3,
          num: 23
        },
        {
          color: 4,
          num: 24
        },
        {
          color: 2,
          num: 25
        },
        {
          color: 3,
          num: 26
        },
        {
          color: 1,
          num: 27
        }
      ],
      selectNum1: {
        color: 1,
        num: 0
      }, //特码报三第一个选号
      selectNum2: {
        color: 2,
        num: 1
      }, //特码报三第二个选号
      selectNum3: {
        color: 4,
        num: 3
      }, //特码报三第三个选号
      isShowSelectList: false, //特码包三的下拉数据
      NotesArr: [], //投注结果界面的展示数据
      /* 各个玩法的扁平化数据收集，用于找到对应得赔率 */
      tema2: [],
      hunhe2: [],
      bose2: []
    };
  },
  computed: {
    /* 从store取回来当前期号数据 */
    issue() {
      return this.$store.state.newIssue;
    },
    /*store取回来的所有玩法数据 */
    lotteryCodeList() {
      return this.$store.state.lotteryCodeList;
    },
    /* 特码玩法数据 */
    tema() {
      if (this.lotteryCodeList.length != 0) {
        //console.log(this.lotteryCodeList)
        let tema;
        //第一步：取出特码数据
        tema = this.lotteryCodeList.filter(item => {
          return item.codeNo == "2";
        });
        //第二步：重构数据结构
        let reformArr1 = [],
          reformArr2 = [];
        tema[0].odds.forEach((item, index) => {
          let obj = {};
          obj.num = index;
          obj.odds = item;
          reformArr1.push(obj);
        });
        this.tema2 = reformArr1;
        for (let i = 0; i < reformArr1.length; i += 7) {
          reformArr2.push(reformArr1.slice(i, i + 7));
        }
        return reformArr2;
      }
    },
    //混合玩法数据
    hunhe() {
      if (this.lotteryCodeList.length != 0) {
        let hunhe;
        //第一步：取出混合数据
        hunhe = this.lotteryCodeList.filter(item => {
          return item.codeNo == "1";
        });
        //第二步：重构数据结构
        let arr1 = ["大", "小", "单", "双", "大单", "小单", "大双", "小双", "极大", "极小"],
          arrLeft = [],
          arrRight = [],
          arrSum = [];
        hunhe[0].odds.forEach((item, index) => {
          let obj = {};
          obj.num = arr1[index];
          obj.odds = item;
          if (index % 2 == 0) {
            arrLeft.push(obj);
          } else {
            arrRight.push(obj);
          }
        });
        this.hunhe2 = arrLeft.concat(arrRight);
        arrSum.push(arrLeft);
        arrSum.push(arrRight);
        return arrSum;
      }
    },
    //波色玩法数据
    bose() {
      if (this.lotteryCodeList.length != 0) {
        let arr1 = ["红波", "绿波", "蓝波"],
          bose = [],
          sumArr = [];
        //第一步：取出波色数据
        bose = this.lotteryCodeList.filter(item => {
          return item.codeNo == "4";
        });
        bose[0].odds.forEach((item, index) => {
          let obj = {};
          obj.num = arr1[index];
          obj.odds = item;
          sumArr.push(obj);
        });
        this.bose2 = sumArr;
        return sumArr;
      }
    },
    //豹子玩法数据
    baozi() {
      if (this.lotteryCodeList.length != 0) {
        //第一步：取出豹子数据
        let baozi;
        baozi = this.lotteryCodeList.filter(item => {
          return item.codeNo == "5";
        });
        let sumArr = [],
          obj = {};
        obj.num = "豹子";
        obj.odds = baozi[0].odds[0];
        sumArr.push(obj);
        return sumArr;
      }
    },
    //特码包三玩法数据
    temabaosan() {
      if (this.lotteryCodeList.length != 0) {
        //第一步：取出特码报三数据
        let temabaosan;
        temabaosan = this.lotteryCodeList.filter(item => {
          return item.codeNo == "3";
        });
        return temabaosan;
      }
    },
    sumCountAndMoney() {
      let obj = {};
      obj.sumCount = this.NotesArr.length;
      let sumMoney = 0;
      this.NotesArr.forEach(item => {
        sumMoney = sumMoney.add(item.money);
      });
      obj.sumMoney = sumMoney;
      return obj;
    }
  },
  methods: {
    showSelectList(a) {
      this.$refs.showSelectList1.style.left = a + "px";
      this.isShowSelectList = true;
    },
    hideSelectList() {
      this.isShowSelectList = false;
    },
    // a代表color，b代表数字
    selectThis(a, b) {
      // 判断是哪一个号码，一共3个
      if (this.$refs.showSelectList1.style.left == "0px") {
        if (b != this.selectNum1.num) {
          if (b == this.selectNum2.num || b == this.selectNum3.num) {
            this.$alert("请重新选择号码（不可出现相同号码）", "温馨提示", {
              confirmButtonText: "确定"
            });
          } else {
            this.selectNum1.color = a;
            this.selectNum1.num = b;
          }
        }
      } else if (this.$refs.showSelectList1.style.left == "98px") {
        if (b != this.selectNum2.num) {
          if (b == this.selectNum1.num || b == this.selectNum3.num) {
            this.$alert("请重新选择号码（不可出现相同号码）", "温馨提示", {
              confirmButtonText: "确定"
            });
          } else {
            this.selectNum2.color = a;
            this.selectNum2.num = b;
          }
        }
      } else if (this.$refs.showSelectList1.style.left == "196px") {
        if (b != this.selectNum3.num) {
          if (b == this.selectNum1.num || b == this.selectNum2.num) {
            this.$alert("请重新选择号码（不可出现相同号码）", "温馨提示", {
              confirmButtonText: "确定"
            });
          } else {
            this.selectNum3.color = a;
            this.selectNum3.num = b;
          }
        }
      }
      this.hideSelectList();
      /* console.log(this.selectNum1);
      console.log(this.selectNum2);
      console.log(this.selectNum3); */
    },
    // 添加注单
    addNotes() {
      for (let key in this.InputPrice) {
        if (this.InputPrice[key]) {
          let firstIndex = key.substring(0, 1);
          let secondIndex = key.substring(1);
          let obj = {};
          if(firstIndex==='2'){
            obj.num = this.selectNum1.num + '-' + this.selectNum2.num + '-' + this.selectNum3.num;
          }else{
            obj.num = secondIndex;
          }
          obj.type = this.lotteryCodeList[firstIndex].codeName;
          obj.count = 1;
          obj.money = this.InputPrice[key];
          //华丽的分割线，后来加的
          obj.codeNo = this.lotteryCodeList[firstIndex].codeNo;
          obj.firstIndex = firstIndex;
          this.NotesArr.unshift(obj);
        }
      }
      this.clearInputPrice();
    },
    clearInputPrice() {
      for (let key in this.InputPrice) {
        this.InputPrice[key] = null;
      }
    },
    deletItem(index) {
      this.NotesArr.splice(index, 1);
    },
    deleteAll() {
      if (this.NotesArr.length != 0) {
        this.$confirm("确定要全部删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          this.NotesArr = [];
        });
      }
    },
    confirmBet() {
      this.$refs.confirm.disabled = true
      if (tools.store.getData("user").id) {
        console.log(this.NotesArr)
        for (let i in this.NotesArr) {
          if (this.NotesArr[i].money === '0') {
            this.$alert('单注金额需大于0', '温馨提示', {
              confirmButtonText: '确定',
              center: true
            }).then(() => {
              this.$refs.confirm.disabled = false
            })
            return
          }
        }
        //第一步：组装sumlist数组
        let sumList = [];
        this.NotesArr.forEach(item => {
          let obj = {};
          if (item.codeNo == 3) {
            obj.selectedNumber = [item.num.split("-")];
          } else if(item.codeNo == 2){
            obj.selectedNumber = [[item.num]];
          }else {
            switch (item.num) {
              case '大':
                obj.selectedNumber = [[501]];
                break;
              case '小':
                obj.selectedNumber = [[502]];
                break;
              case '单':
                obj.selectedNumber = [[503]];
                break;
                case '双':
                obj.selectedNumber = [[504]];
                break;
                case '大单':
                obj.selectedNumber = [[50103]];
                break;
                case '大双':
                obj.selectedNumber = [[50104]];
                break;
                case '小单':
                obj.selectedNumber = [[50203]];
                break;
                case '小双':
                obj.selectedNumber = [[50204]];
                break;
                case '极大':
                obj.selectedNumber = [[51001]];
                break;
                case '极小':
                obj.selectedNumber = [[51002]];
                break;
                case '红波':
                obj.selectedNumber = [[505]];
                break;
                case '绿波':
                obj.selectedNumber = [[506]];
                break;
                case '蓝波':
                obj.selectedNumber = [[507]];
                break;
                case '豹子':
                obj.selectedNumber = [[592]];
                break;
            }
          }
          obj.playCode = item.codeNo;
          obj.price = item.money;
          obj.money = item.money;
          obj.rebates = 0;
          obj.count = 1;
          if (item.firstIndex == 0) {
            obj.odds = this.hunhe2.filter(item2 => {
              return item2.num == item.num;
            })[0].odds;
          } else if (item.firstIndex == 1) {
            obj.odds = this.tema2.filter(item2 => {
              return item2.num == item.num;
            })[0].odds;
          } else if (item.firstIndex == 2) {
            obj.odds = this.temabaosan[0].odds[0];
          } else if (item.firstIndex == 3) {
            obj.odds = this.bose2.filter(item2 => {
              return item2.num == item.num;
            })[0].odds;
          } else if (item.firstIndex == 4) {
            obj.odds = this.baozi[0].odds;
          }
          obj.selectedNumberTitle=item.num;
          sumList.push(obj);
        });
        console.log(sumList);
        //第二步：组装最终发给后台的数据
        let finalObj = {};
        finalObj.periodsList = [];
        let periodsObj = {};
        periodsObj.issue = this.issue;
        periodsObj.multiple = 1;
        finalObj.periodsList.push(periodsObj);
        finalObj.lotteryCode = this.$store.state.lotteryCode;
        finalObj.sumMoney = this.sumCountAndMoney.sumMoney;
        finalObj.memberId = tools.store.getData("user").id;
        finalObj.isAfterNo = 0;
        finalObj.sumList = sumList;
        console.log(finalObj);
        //第三步：发送请求
        this.$http
          .post("/member/buy/betting", finalObj)
          .then(res => {
            this.$refs.confirm.disabled = false
            //console.log(res.data)
            if (res.data.status == 200) {
              this.$alert("投注成功", "温馨提示", {
                confirmButtonText: "确定"
              });
            } else {
              this.$alert(res.data.message, "温馨提示", {
                confirmButtonText: "确定"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
        //第四步：清空NotesArr数组
        this.NotesArr = [];
      } else {
        this.$alert("请先登录然后投注", "温馨提示", {
          confirmButtonText: "确定",
        });
      }
    },
    verify(a) {
      if(this.InputPrice[a]){
        this.InputPrice[a] = this.InputPrice[a].replace(/\D/g, ""); //验证只能输入正整数
      }
    }
  },

  beforeMount(){
    this.$store.commit('initLotteryData');
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  color: #333;
  font-family: Microsoft YaHei, Arial, Helvetica, "sans-serif";
  outline: none;
  cursor: inherit;
}

.widthNum {
  width: 54px !important;
  border-radius: 24px !important;
}

.grey1 {
  background-color: rgb(153, 153, 153) !important;
}

.green1 {
  background-color: rgb(56, 190, 79) !important;
}

.blue1 {
  background-color: rgb(28, 142, 230) !important;
}

.red1 {
  background-color: rgb(241, 23, 23) !important;
}



  /*.lotteryRight {*/
    /*width: 210px;*/
    /*height: 100%;*/
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
  /*}*/

</style>
