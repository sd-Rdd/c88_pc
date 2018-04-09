
  <template>
    <div class="lottery-record animated fadeInRightBig">
        <div class="record">
            <div v-show="Issue==1" v-if="resultList.length!=0">
                <div class="one_issue">
                    第
                    <span>{{resultList[0].issueNo}}</span>期
                </div>
                <div class="ball-magic">
                    <div class="iconfont lhc-record" style="margin-right: 5px;" v-for="(item,index) in resultList[0].resultsList" :key="index">
                        <div style="width: 28px; height: 28px; font-size: 12px; line-height: 28px; background-size: 100%; cursor: default; text-align: center; border: none; border-radius: 50%;" :class="{'red1':item.colourNo=='805','green1':item.colourNo=='806','blue1':item.colourNo=='807'}">
                            {{item.number}}
                        </div>
                        <label>{{item.zodiacNo|filterzodiacNo}}</label>
                    </div>
                </div>
            </div>
            <div class="five-group" v-show="Issue==2" v-if="resultList.length!=0">
                <div class="group" v-for="(item,index) in resultList" :key="index">
                    <span class="five_issue">
                        第
                        <span>{{item.issueNo}}</span>期：
                    </span>
                    <div class="ball iconfont lhc-record" style=" font-size: 0.7rem; background-size: 100%; cursor: default; width: 20px; height: 20px; text-align: center; line-height: 20px;border: none; border-radius: 50%;" v-for="(item,index) in item.resultsList" :key="index" :class="{'red1':item.colourNo=='805','green1':item.colourNo=='806','blue1':item.colourNo=='807'}">{{item.number}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            Issue: 1,
            sd: 'blue'
        }
    },
    computed: {
        resultList() {
            let result = this.$store.state.lotteryResultList.slice(0,5);
            //console.log(result);
            let lotteryResultArr = [];
            result.forEach((item) => {
                let obj = {};
                if (item.resultsList) {
                    obj.issueNo = item.issueNo;
                    obj.resultsList = item.resultsList;
                    lotteryResultArr.push(obj);
                } else {
                    obj.issueNo = item.issueNo;
                    obj.resultsList = [];
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
    filters: {
        filterzodiacNo(a) {
            switch (a) {
                case '821': return '鼠'; break;
                case '822': return '牛'; break;
                case '823': return '虎'; break;
                case '824': return '兔'; break;
                case '825': return '龙'; break;
                case '826': return '蛇'; break;
                case '827': return '马'; break;
                case '828': return '羊'; break;
                case '829': return '猴'; break;
                case '830': return '鸡'; break;
                case '831': return '狗'; break;
                case '832': return '猪'; break;
            }
        }
    }
}
</script>
<style scoped>

</style>



