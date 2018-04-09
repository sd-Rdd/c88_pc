<template>
    <div class="lottery-record animated fadeInRightBig">
        <div class="record">
            <div  v-if="resultList.length!=0">
                <div class="one_issue">
                    第
                    <span>{{resultList[0].issueNo}}</span>
                    期
                </div>
                <div class="ball-magic">
                    <div v-if="resultList[0].lotteryResult.length<6" v-for="(val,index) in resultList[0].lotteryResult" :key="index">
                        <div>{{val}}</div>
                        <!-- small_ball -->
                    </div>
                    <div v-else style="margin-right:4px;">
                        <div style="width: 24px;height: 24px;font-size: 0.875rem;line-height:24px;">{{val}}</div>
                    </div>
                </div>
            </div>

            <!--<div class="five-group" v-show="Issue==2" v-if="resultList.length!=0">-->
                <!--<div class="group" v-for="(val,index) in resultList" :key="index">-->
                    <!--<span class="five_issue">-->
                        <!--第-->
                        <!--<span>{{val.issueNo}}</span>期：-->
                    <!--</span>-->
                    <!--<div class="ball null" v-for="(val1,index) in val.lotteryResult" :key="index">{{val1}}</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <!--<div class="issue-select">-->
            <!--<button class="btn" @click="selectIssue(1)" :class="{active:Issue==1}">近一期</button>-->
            <!--<button class="btn" @click="selectIssue(2)" :class="{active:Issue==2}">近五期</button>-->
        <!--</div>-->

    </div>
</template>
<script>
export default {
    data() {
        return {
//            Issue: 1,
        }
    },
    computed: {
        resultList() {
            let result = this.$store.state.lotteryResultList.slice(0,5);
            let lotteryResultArr = [];
            result.forEach((item) => {
                let obj = {};
                if (item.lotteryResult) {
                    obj.issueNo = item.issueNo;
                    obj.lotteryResult = item.lotteryResult.split(',');
                    lotteryResultArr.push(obj);
                } else {
                    obj.issueNo = item.issueNo;
                    obj.lotteryResult = ['正', '在', '开', '奖', '...'];
                    lotteryResultArr.push(obj);
                }
            });
            return lotteryResultArr;
        }
    },
    methods: {
        selectIssue(a) {
            this.Issue = a;
        }
    },
}
</script>
<style scoped>
* {
    box-sizing: border-box;
    color: #333;
    font-family: Microsoft YaHei, Arial, Helvetica, "sans-serif";
    outline: none;
    cursor: inherit;
}

.small_ball {
    width: 24px;
    height: 24px;
    font-size: 0.875rem;
    line-height: 24px;
}
</style>

