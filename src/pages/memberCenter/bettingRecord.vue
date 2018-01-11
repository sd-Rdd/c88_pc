<template>
  <MemberCommon>
    <div slot="nav">
      <li :class="{hover:safe==1}" @click="changeSafe(1)">
        <a href="javascript:;">投注记录</a>
      </li>
      <li :class="{hover:safe==2}" @click="changeSafe(2)">
        <a href="javascript:;">追号记录</a>
      </li>
      <li :class="{hover:safe==3}" @click="changeSafe(3)">
        <a href="javascript:;">帐变记录</a>
      </li>
    </div>
    <div slot="body">
      <div v-if="safe==1">
        <div class="info_select">
          <el-select v-model="selectStart1" placeholder="请选择" size="small">
            <el-option v-for="item in selectStartOptions1" :key="item.value" :label="item.lotteryName" :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="selectEnd1" placeholder="请选择" size="small">
            <el-option v-for="(item,index) in selectEndOptions1" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
          <span class="b_search_name"> 时间：</span>
          <el-date-picker size="small" v-model="dateStart1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <span class="b_search_name"> 至</span>
          <el-date-picker size="small" v-model="dateEnd1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <el-button size="small" type="primary" @click="getBetlist(0,1)">查询</el-button>
        </div>
        <!-- <div-table style="margin-top:15px;" v-loading="loading" element-loading-text="拼命加载中">
          <div slot="head" class="thead">
            <div style="flex:1">彩种</div>
            <div style="flex:2">期号</div>
            <div style="flex:1">投注金额</div>
            <div style="flex:1">状态</div>
            <div style="flex:2">下注时间</div>
            <div style="flex:2">下注详情</div>
          </div>
          <div slot="body" class="tbody" v-if="result1.length==0">
            <div class="empty_data">暂无记录</div>
          </div>
          <div slot="body" class="tbody" v-else v-for="(item ,index) in result1" :key="index">
            <div style="flex:1">{{item.lotteryName}}</div>
            <div style="flex:2">{{item.lotteryIssue}}</div>
            <div style="flex:1">{{item.betMoney}}</div>
            <div style="flex:1">{{item.isWin|filterStatus(item.isRepeal)}}</div>
            <div style="flex:2">{{item.createDate|filterDate}}</div>
            <div style="flex:2;cursor:pointer;" @click='selectDetail({"betId":item.betId,"lotteryId":item.lotteryId})'>查看</div>
          </div>
        </div-table> -->
        <el-table :data="result1" border  size="medium " v-loading="loading" element-loading-text="拼命加载中" @cell-click="selectDetailBetting">
          <el-table-column  prop="lotteryName" label="彩种" width="150" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="lotteryIssue" label="期号" width="140" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="betMoney" label="投注金额" width="133" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="isWin" label="状态" width="85" align="center" :show-overflow-tooltip="true" :formatter="filterStatus">
          </el-table-column>
          <el-table-column  prop="createDate" label="下注时间" width="210" align="center" :show-overflow-tooltip="true" :formatter="filterDate">
          </el-table-column>
          <el-table-column  label="下注详情" width="100" align="center" :show-overflow-tooltip="true" :formatter="filterDetail">
          </el-table-column>
        </el-table>
        <el-pagination  @current-change="changePage1"  layout="prev, pager, next"  :page-count="pages"></el-pagination>
      </div>
      <div v-if="safe==2">
        <div class="info_select">
          <el-select v-model="selectStart1" placeholder="请选择" size="small">
            <el-option v-for="item in selectStartOptions1" :key="item.value" :label="item.lotteryName" :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="selectEnd1" placeholder="请选择" size="small">
            <el-option v-for="(item,index) in selectEndOptions1" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
          <span class="b_search_name"> 时间：</span>
          <el-date-picker size="small" v-model="dateStart1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <span class="b_search_name"> 至</span>
          <el-date-picker size="small" v-model="dateEnd1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <el-button size="small" type="primary" @click="getBetlist(1,1)">查询</el-button>
        </div>
        <div-table style="margin-top:15px;" v-loading="loading" element-loading-text="拼命加载中">
          <div slot="head" class="thead">
            <div style="flex:1">彩种</div>
            <div style="flex:2">期号</div>
            <div style="flex:1">投注金额</div>
            <div style="flex:1">状态</div>
            <div style="flex:2">下注时间</div>
            <div style="flex:2">下注详情</div>
          </div>
          <div slot="body" class="tbody" v-if="result1.length==0">
            <div class="empty_data">暂无记录</div>
          </div>
          <div slot="body" class="tbody" v-else v-for="(item ,index) in result1" :key="index">
            <div style="flex:1">{{item.lotteryName}}</div>
            <div style="flex:2">{{item.lotteryIssue}}</div>
            <div style="flex:1">{{item.betMoney}}</div>
            <div style="flex:1">{{item.isWin|filterStatus(item.isRepeal)}}</div>
            <div style="flex:2">{{item.createDate|filterDate}}</div>
            <div style="flex:2;cursor:pointer;" @click='selectDetail({"betId":item.betId,"lotteryId":item.lotteryId})'>查看</div>
          </div>
        </div-table>
        <el-pagination  @current-change="changePage2"  layout="prev, pager, next"  :page-count="pages"></el-pagination>
      </div>
      <div v-if="safe==3">
        <div class="info_select">
          <el-select v-model="selectZB" placeholder="请选择" size="small">
            <el-option v-for="item in zb" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <span class="b_search_name"> 时间：</span>
          <el-date-picker size="small" v-model="dateStart1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <span class="b_search_name"> 至</span>
          <el-date-picker size="small" v-model="dateEnd1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <el-button size="small" type="primary" @click="search(1)">查询</el-button>
        </div>
        <div-table style="margin-top:15px;" v-loading="loading" element-loading-text="拼命加载中">
          <div slot="head" class="thead">
            <div style="flex:1">编号</div>
            <div style="flex:2">账单类别</div>
            <div style="flex:2">操作金额</div>
            <div style="flex:5">操作时间</div>
          </div>
          <div slot="body" class="tbody" v-if="result2.length==0">
            <div class="empty_data">暂无记录</div>
          </div>
          <!-- <template v-else > -->
            <div slot="body" class="tbody" v-else v-for="(item,index) in result2" :key="index">
              <div style="flex:1">{{index+1}}</div>
              <div style="flex:2">{{item.accountType|filteraccountType}}</div>
              <div style="flex:2">{{item.money}}</div>
              <div style="flex:5">{{item.creationTime|filterDate}}</div>
            </div>
          <!-- /* </template> */ -->
        </div-table>
        <el-pagination @current-change="changePage3"  layout="prev, pager, next"  :page-count="pages"></el-pagination>
      </div>
      <modal v-if="isModal" @onClose="isModal=false" :recordDtail="recordDtail[0]"></modal>
    </div>
  </MemberCommon>
</template>
<script>
import modal from "./modal";
import MemberCommon from "components/common/memberCommon";
import DivTable from "components/common/divTable";
import ccaa from "tools/tools.js";
export default {
  data() {
    return {
      loading: false, //请求数据时的遮罩
      safe: 1, //控制选项卡切换的数据
      /* 投注记录检索数据开始 */
      selectStart1: null,
      selectStartOptions1: [],
      selectEnd1: null,
      selectEndOptions1: [
        {
          val: null,
          name: "全部状态"
        },
        {
          val: "-1,0",
          name: "待开奖"
        },
        {
          val: "1,0",
          name: "已中奖"
        },
        {
          val: "0,0",
          name: "未中奖"
        },
        {
          val: "-1,1",
          name: "已取消"
        }
      ],
      dateStart1: null,
      dateEnd1: new Date(),
      pages:null, // 一共多少页
      /* 投注记录检索数据结束 */
      /* 接口返回来的数据 */
      result1: [],//投注记录数据和追号
      result2: [],//帐变记录数据
      isModal: false,
      recordDtail: [],
      //帐变记录下拉框数据
      zb: [
        { value: " ", label: "全部" },
        { value: "1", label: "投注" },
        { value: "2", label: "返点" },
        { value: "3", label: "派彩" },
        { value: "4", label: "代理反水" },
        { value: "5", label: "取消订单" },
        { value: "6", label: "销售返点" },
        { value: "7", label: "线上充值" },
        { value: "8", label: "线下充值" },
        { value: "9", label: "人工入款" },
        { value: "10", label: "人工出款" },
        { value: "11", label: "提现" },
        { value: "12", label: "手续费扣除" },
        { value: "13", label: "取消提现" },
        { value: "14", label: "活动优惠" }
      ],
      selectZB:" ",
      memberData: null
    };
  },
  watch: {
    safe(val) {
      if (val == 2) {
        this.initDate();
      } else if (val == 1) {
        this.initDate();
      } else if (val == 3) {
        this.initDate2();
      }
    }
  },
  components: {
    MemberCommon,
    DivTable,
    modal
  },
  created() {
    this.getLotteryList();
    this.initDate();
    this.getBetlist(0,1);
    this.memberData = ccaa.store.getData("user");
  },
  methods: {
    filterDetail(){
      return '查看'
    },
    // 将后台字段转化成相应状态
    filterStatus(a,b,c){
      let isWin = c
      let isRepeal = a.isRepeal
      if (isWin == 0 && isRepeal == 0) {
        return "未中奖";
      } else if (isWin == -1 && isRepeal == 0) {
        return "待开奖";
      } else if ((isWin > 1 || isWin == 1) && isRepeal == 0) {
        return "已中奖";
      } else if (isWin == -1 && isRepeal == 1) {
        return "已撤单";
      }
    },
    // 将时间转化成时间戳
    filterDate(a,b,c){
      return ccaa.getDate(c);
    },
    /* 初始化检索条件 */
    initDate() {
      //初始化开始时间为每月一号
      let currentDate = new Date();
      currentDate.setDate(1);
      this.dateStart1 = currentDate;
      //初始化结束时间为当前时间
      this.dateEnd1 = new Date();
      //初始化彩种为请选择状态
      this.selectStart1 = null;
      //初始化状态为全部状态
      this.selectEnd1 = null;
      // 将总页数置为null
      this.pages = null
    },
    //对于帐变记录，初始化查询条件
    initDate2() {
      let currentDate = new Date();
      currentDate.setDate(1);
      this.dateStart1 = currentDate;
      //初始化结束时间为当前时间
      this.dateEnd1 = new Date();
      this.selectZB = " ";
      this.pages = null
    },
    //帐变记录查询
    search(p) {
      this.loading=true;
      let obj = {};
      obj.pageNo = p;
      obj.memberId = ccaa.store.getData("user").id;
      obj.acountType = this.selectZB;
      obj.startTime = this.dateStart1.getTime();
      obj.endTime = this.dateEnd1.getTime();
      this.$http
        .post("/account/change/record", obj)
        .then(res => {
          if (res.data.status == 200) {
            console.log(res.data);
            this.result2 = res.data.resultList.list;
            this.pages = res.data.resultList.pages;
            this.loading=false;
          }
        })
        .catch(res => console.log(res));
    },
    changePage1(a){
      this.getBetlist(0,a)
    },
    changePage2(a){
      this.getBetlist(1,a)
    },
    changePage3(a){
      this.search(a)
    },
    //投注记录和追号记录查询，传0是投注，传1是追号
    getBetlist(a, pageNo) {
      this.loading=true;
      let obj = {};
      obj.pageNo = pageNo;
      obj.memberId = ccaa.store.getData("user").id;
      obj.isAfter = a;
      obj.lotteryId = this.selectStart1 ? this.selectStart1 : 0;
      obj.startTime = this.dateStart1.getTime();
      obj.endTime = this.dateEnd1.getTime();
      if (this.selectEnd1) {
        let arr = this.selectEnd1.split(",");
        obj.isWin = arr[0];
        obj.isRepeal = arr[1];
      }
      this.$http
        .post("bet/order/record/betlist", obj)
        .then(res => {
          if (res.data.status == 200) {
            this.pages = res.data.result.pages
            this.result1 = res.data.result.list;
            this.loading=false;
          }
        })
        .catch(res => console.log(res));
    },
    getLotteryList() {
      this.$http
        .post("api/lottery/list")
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 200) {
            this.selectStartOptions1 = res.data.lotteryList;
          }
        })
        .catch(res => console.log(res));
    },
    changeSafe(a) {
      this.safe = a;
    },
    selectDetailBetting(a,b,c){
      if(c.innerText.trim() === '查看'){
        let obj = {}
        obj.betId = a.betId
        obj.lotteryId = a.lotteryId
        this.selectDetail(obj)
      }
    },
    selectDetail(obj) {
      this.$http
        .post("/bet/order/record/detail", obj)
        .then(res => {
          if (res.data.status == 200) {
            this.recordDtail = res.data.result;
            console.log(this.recordDtail);
            this.isModal = true;
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        })
        .catch(res => console.log(res));
    }
  },
  filters: {
    filterStatus(a, b) {
      if (a == 0 && b == 0) {
        return "未中奖";
      } else if (a == -1 && b == 0) {
        return "待开奖";
      } else if ((a > 1 || a == 1) && b == 0) {
        return "已中奖";
      } else if (a == -1 && b == 1) {
        return "已撤单";
      }
    },
    filterDate(a) {
      return ccaa.getDate(a);
    },
    filteraccountType(a){
      switch (a) {
        case 1:
          return "投注";
          break;
        case 2:
          return "返点";
          break;
        case 3:
          return "派彩";
          break;
        case 4:
          return "代理反水";
          break;
        case 5:
          return "取消订单";
          break;
        case 6:
          return "销售返点";
          break;
        case 7:
          return "线上充值";
          break;
        case 8:
          return "线下充值";
          break;
        case 9:
          return "人工入款";
          break;
        case 10:
          return "人工出款";
          break;
        case 11:
          return "提现";
          break;
        case 12:
          return "手续费扣除";
          break;
        case 13:
          return "取消提现";
          break;
        case 14:
          return "活动优惠";
          break;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      this.memberData.type == 0 &&
      (to.path == "/memberCenter/caiwu/1" || to.path == "/memberCenter/caiwu/2")
    ) {
      this.$alert("试玩账号不能进入财务中心", "温馨提示", {
        confirmButtonText: "确定",
        type: "info",
        center: true
      });
    } else {
      next();
    }
  }
};
</script>
<style lang="less" scoped>
.el-pagination{
  margin: 0 auto;
}
.info_select {
  padding-left: 15px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 15px;
}

.el-select {
  width: 120px;
}

.b_search_name {
  line-height: 30px;
  text-align: center;
  font-size: 0.8125rem;
  display: inline-block;
  vertical-align: top;
  color: #999;
}

.el-date-editor.el-input {
  width: 136px;
}

.el-button {
  width: 105px;
  float: right;
}

.empty_data {
  background-image: url("../../assets/image/lion.png");
  background-size: 40px 46px;
  background-repeat: no-repeat;
  line-height: 50px;
  background-position: 42%;
  color: #999 !important;
}
</style>
