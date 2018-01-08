<template>
    <div class="chase-table" v-if="isShow">
        <div class="ct-header">
            <div class="h-label">
                <div class="tabs">
                    <div class="tab" @click="tab(1)" :class="{active:isActive==1}">普通追号</div>
                    <div class="tab" @click="tab(2)" :class="{active:isActive==2}">高级追号</div>
                </div>
                <div class="h-control">
                    <!-- <i class="iconfont icon-checkbox-uncheck"></i> -->
                    <input type="checkbox" v-model="isAfterNo" @change="changeIsAfterNo">
                    <span>中奖后停止追号</span>
                </div>
            </div>
            <div class="normal-chase"  v-show="isActive==1">
                <span>连续追：</span>
                <div class="issue-list">
                    <div @click="changeIssue(5)" :class="{issue_activity:this.Issue==5}">5期</div>
                    <div @click="changeIssue(10)" :class="{issue_activity:this.Issue==10}">10期</div>
                    <div @click="changeIssue(15)" :class="{issue_activity:this.Issue==15}">15期</div>
                    <div @click="changeIssue(20)" :class="{issue_activity:this.Issue==20}">20期</div>
                </div>
                <input type="text" v-model="Issue"> &nbsp;&nbsp;
                <span>期</span>
                <span style="margin-left:50px;">倍数：</span>
                <input type="text" v-model="multiple" @input="changeMultiple($event)">
            </div>
            <div class="advanced-chase" v-show="isActive==2">
                <div class="query-conditions">
                    <div class="query-title">基本参数</div>
                    <div class="basic-query">
                        <div>
                            <span>起始期号：</span>
                            <select class="start-issue" @change="selectStartPeriods($event)">
                                <option v-for="(item,index) in resultList2" :key="index">
                                    {{item.issueNo}}
                                </option>
                            </select>
                        </div>
                        <div>
                            <span>追号期数：</span>
                            <input class="text-input" maxlength="3" v-model="highArguments.allPeriods">
                            <span>期</span>
                        </div>
                        <div>
                            <span>起始倍数：</span>
                            <input class="text-input" maxlength="3" v-model="highArguments.startMultiple">
                            <span>倍</span>
                        </div>
                    </div>
                    <div class="query-title">高级参数</div>
                    <div class="advanced-query">
                        <div class="advanced-label">
                            <div class="label-list">
                                <div style="background-color: rgb(255, 255, 255); border-right: 1px solid rgb(244, 233, 222);">翻倍追号</div>
                            </div>
                        </div>
                        <div class="advanced-content">
                            <div class="crow">
                                <i class="iconfont  size" :class="{'icon-radio_check':highArguments.highArgumentsTab1==highArgumentsTab,'icon-radio_uncheck':highArguments.highArgumentsTab1!=highArgumentsTab}" @click="changeHighArgumentsTab(highArguments.highArgumentsTab1)"></i>
                                <span>每隔</span>
                                <input class="text-input" maxlength="3" v-model="highArguments.intevalPeriods" style="margin-left:5px;">
                                <span>期 倍数x</span>
                                <input class="text-input" maxlength="3" v-model="highArguments.intevalMultiple" style="margin-left:5px;">
                            </div>
                            <div class="crow">
                                <i class="iconfont  size" :class="{'icon-radio_check':highArguments.highArgumentsTab2==highArgumentsTab,'icon-radio_uncheck':highArguments.highArgumentsTab2!=highArgumentsTab}" @click="changeHighArgumentsTab(highArguments.highArgumentsTab2)"></i>
                                <span>前</span>
                                <input class="text-input" maxlength="3" v-model="highArguments.beforePeriods" style="margin-left: 5px;">
                                <span>期 倍数=起始倍数，之后倍数=</span>
                                <input class="text-input" maxlength="3" v-model="highArguments.afterMultiple" style="margin-left: 5px;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="generate">
                    <button @click="creatPlan">生成追号计划</button>
                </div>
            </div>
        </div>
        <!-- 显示表格部分主体 -->
        <div class="ct-body">
            <div class="theader">
                <div class="ct-index">序号</div>
                <div class="ct-issue">
                    <!--  <i class="iconfont icon-checkbox-check"></i> -->
                    <input type="checkbox" v-model="check">
                    <span>追号期次</span>
                </div>
                <div class="ct-multiple">倍数</div>
                <div class="ct-amount">金额</div>
                <div class="expected-time">预计开奖时间</div>
            </div>
            <div class="tbody">
                <div style="position: relative; overflow: hidden; width: 100%; height: 100%; flex: 1 1 0%;">
                    <div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: -17px; margin-bottom: -17px;">
                        <div class="trow" v-for="(item,index) in resultList" :key="index">
                            <div class="ct-index">{{index+1}}</div>
                            <div class="ct-issue">
                                <!-- <i class="iconfont icon-checkbox-check"></i> -->
                                <input type="checkbox" v-model="item.ischeck">
                                <span>{{item.issueNo}}</span>
                            </div>
                            <div class="ct-multiple">
                                <input v-model="item.multiple" maxlength="4">
                            </div>
                            <div class="ct-amount">{{item.ischeck?($store.state.bet_result.sumMoney*item.multiple):0}}元</div>
                            <div class="expected-time">{{item.lotteryTime}}</div>
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
    </div>
</template>
<script>
import tool from 'tools/tools.js'
export default {
    data() {
        return {
            isActive: 1,
            isAfterNo: false,
            Issue: 10,//期数
            multiple: 1,//倍数
            check: true,//表格头部多选框
            highArgumentsTab: 1,
            highArguments: {
                startIndex: 0,//选定的下拉框下标
                allPeriods: 10,//追号期数
                startMultiple: 1,//起始倍数
                highArgumentsTab1: 1,//控制高级选号高级参数的切换
                highArgumentsTab2: 2,
                intevalPeriods: 2,//高级追号每隔多少期
                intevalMultiple: 2,//每隔多少期倍数乘几
                beforePeriods: 5,//前几期
                afterMultiple: 3//之后倍数
            },
        }
    },
    watch: {
        Issue(val) {
            if (val) {
                this.$store.dispatch("getDataAsync", { "this": this, "data": { "lotteryNo": this.lotteryCode, "page": val } });
            } else {
                this.$store.dispatch("getDataAsync", { "this": this, "data": { "lotteryNo": this.lotteryCode, "page": 0 } });
            }
        },
        resultList: {
            handler(curVal) {
                this.$store.commit("changeResultList3", curVal);
            },
            deep: true
        },
        check(val) {
            this.$store.commit("changeResultList4", val);
        },
        isShow(val){
            if(val){
                this.initData();
            }
        }
    },
    methods: {
        /* 刚进来初始化数据 */
        initData(){
            this.isActive=1;
            this.isAfterNo=false;
            this.Issue=10;
            this.multiple=1;
            this.check=true;
            this.highArgumentsTab=1;
            this.highArguments.allPeriods=10;
            this.highArguments.startMultiple=1;
            this.highArguments.intevalPeriods=2;
            this.highArguments.intevalMultiple=2;
            this.highArguments.beforePeriods=5;
            this.highArguments.afterMultiple=3;
        },
        tab(a) {
            this.isActive = a;
            switch (a) {
                case 1:
                    this.Issue = 10;
                    this.multiple = 1;
                    this.$store.commit('changeSwitch', true);
                    this.$store.commit("clearResultList2"); //清空追号部分的所有数组
                    this.$store.dispatch("getDataAsync", { "this": this, "data": { "lotteryNo": this.lotteryCode, "page": 10 } });
                    break;
                case 2:
                    this.$store.commit('changeSwitch', false);
                    this.$store.commit('clearResultList');
                    this.$store.dispatch("getDataAsync", { "this": this, "data": { "lotteryNo": this.lotteryCode, "page": 100 } });
                    break;
            }
        },
        changeHighArgumentsTab(a) {
            this.highArgumentsTab = a;
        },
        changeIsAfterNo() {
            if (this.isAfterNo == true) {
                this.$store.commit("changeIsAfterNo", { a: 1 })
            } else {
                this.$store.commit("changeIsAfterNo", { a: 0 })
            }
        },
        changeIssue(issue) {
            this.Issue = issue;
            this.IssueInput = issue;

        },
        selectStartPeriods(val) {
            this.highArguments.startIndex = val.target.selectedIndex;
        },
        creatPlan() {
            if (this.highArgumentsTab == 1) {
                this.creatPlan_sub(1);
            } else if (this.highArgumentsTab == 2) {
                this.creatPlan_sub(2);
            }
        },
        creatPlan_sub(a) {
            let arr1 = [];//最终输出给store的数组
            let aa = 0;//控制间隔期数
            let multiplee = this.highArguments.startMultiple;//改变倍数
            /* let resultList22=this.resultList2.splice(this.highArguments.startIndex,this.highArguments.allPeriods);
            console.log(resultList22); */
            for (let i = this.highArguments.startIndex; i < this.resultList2.length; i++) {
                aa++;
                let obj = {};
                obj.ischeck = true;
                obj.issueNo = this.resultList2[i].issueNo;
                obj.multiple = multiplee;
                //obj.money = obj.ischeck * obj.multiple * this.$store.state.bet_result.sumMoney;
                obj.lotteryTime = tool.getDate(this.resultList2[i].lotteryTime);
                arr1.push(obj);
                
                if (a == 1) {
                    if (aa == this.highArguments.intevalPeriods) {
                        multiplee = multiplee * this.highArguments.intevalMultiple;
                        aa = 0;
                    }
                } else if (a == 2) {
                    if (aa == this.highArguments.beforePeriods) {
                        multiplee = this.highArguments.afterMultiple;
                    }
                }
                if (arr1.length == this.highArguments.allPeriods) {
                    this.$store.commit("changeResultList3", arr1);
                    return
                }else if(i==this.resultList2.length-1){
                    this.$store.commit("changeResultList3", arr1);
                    return
                }
            }
        },
        changeMultiple(a) {
            this.$store.commit("changeResultList4", a.target.value);
        },
    },
    computed: {
        lotteryCode(){
            return this.$store.state.lotteryCode;
        },
        isShow() {
            return this.$store.state.bet_result.isShow;
        },
        //表格里所展示的数据
        resultList() {
            return this.$store.state.resultList;
        },
        resultList2() {
            let List = this.$store.state.resultList2;
            let arr = [];
            for (let i = 0; i < List.length; i++) {
                let obj = {};
                obj.issueNo = List[i].issueNo;
                obj.lotteryTime = tool.getDate(List[i].lotteryTime);
                arr.push(obj);
            }
            return arr;
        },
    },

}
</script>
<style scoped>
.active {
    background-color: rgb(255, 255, 255);
    border-right: 1px solid rgb(244, 233, 222);
}

.issue_activity {
    font-size: .875rem;
    color: #e94335;
}

* {
    box-sizing: border-box;
    color: #333;
    font-family: Microsoft YaHei, Arial, Helvetica, "sans-serif";
    outline: none;
    cursor: inherit;
}

.size {
    font-size: 20px;
}
.icon-radio_check{
    color: #e94335;
}
.icon-radio_uncheck{
   color: #ccc; 
}
</style>
