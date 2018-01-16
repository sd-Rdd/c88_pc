<template>
  <MemberCommon menu="赔率详情">
    <div slot="body">
      <div class="info_select">
        <select v-model="select">
          <option v-for="(item,index) in list" :key="index" :value="item.id">{{item.catName}}</option>
        </select>
      </div>
      <div class="bonus_header">
        <span v-if="select!='7'">返点:</span>
        <span v-else>特码A:</span>
        {{rebates}}%
      </div>
      <div-table v-loading="loading" element-loading-text="拼命加载中">
        <div slot="head" class="thead">
          <div>玩法/投注方式</div>
          <div>赔率</div>
        </div>
        <div slot="body" class="tbody" v-for="(item,index) in tableData" :key="index">
          <div>{{item.codeName}}</div>
          <div>{{item.betOdds}}</div>
        </div>
      </div-table>
    </div>
  </MemberCommon>
</template>
<script>
import MemberCommon from "components/common/memberCommon";
import DivTable from "components/common/divTable";
import tools from "tools/tools.js";
export default {
  data() {
    return {
      loading:false,
      list: null,
      tableData: null,
      select: 1,
      rebates: null,
      memberData: null
    };
  },
  filters: {
    transforOdds(a) {
      return a.toFixed(2);
    }
  },
  components: {
    MemberCommon,
    DivTable
  },
  created() {
    this.memberData = tools.store.getData("user");
    this.getData(1);
    this.getList();
  },
  watch: {
    select(a) {
      this.getData(a);
      this.getRebates();
    }
  },
  methods: {
    getData(id) {
      this.loading=true;
      this.$http
        .post("/api/personal/code/confine", { catId: id,memberId: this.memberData.id})
        .then(res => {
          if (res.data.status == 200) {
            if (id === '7' || id === '6' || id === '2') {
              this.tableData = this.transforTableData(res.data.result, id);
            } else {
              this.tableData = res.data.result;
            }
            this.loading=false;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    transforTableData(arr, dataType) {
      let arr2 = [];
      arr.forEach(res => {
        let codeName = res.codeName;
        //六合彩赔率数据解析
        if(dataType === '7' && res.oddsList){
          res.oddsList.forEach(res => {
            let obj = {};
            obj.codeName = codeName + "-" + res.codeName;
            obj.betOdds = Number(res.odds);
            arr2.push(obj);
          });
        // PC蛋蛋赔率数据解析
        }else if(dataType === '6' && res.lotteryCodeOptionList) {
          res.lotteryCodeOptionList.forEach(res => {
            let obj = {};
            obj.codeName = codeName + "/" + res.optionname;
            obj.betOdds = Number(res.betOdds);
            arr2.push(obj);
          });
        // 快三赔率数据解析
        }else if(dataType === '2') {
          if(res.lotteryCodeOptionList) {
            res.lotteryCodeOptionList.forEach(res => {
              let obj = {};
              obj.codeName = codeName + "/" + res.optionname;
              obj.betOdds = Number(res.betOdds);
              arr2.push(obj);
            });
          }else{
            let obj = {};
            obj.codeName = res.codeName;
            obj.betOdds = Number(res.betOdds);
            arr2.push(obj);
          }
        }
        
      });
      return arr2;
    },
    getList() {
      this.$http
        .post("/api/cat/list",{memberId: this.memberData.id})
        .then(res => {
          if (res.data.status == 200) {
            this.list = res.data.result;
            this.getRebates();
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getRebates() {
      if (this.list) {
        this.list.forEach(item => {
          if (item.id == this.select) {
            this.rebates = item.maxRebates.toFixed(1);
          }
        });
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
.info_select {
  padding-left: 15px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 15px;
  select {
    background: #fff;
    border: 1px solid #ddd;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    outline: none;
  }
}

.bonus_header {
  font-size: 16px;
  color: #e94335;
  padding-top: 15px;
  padding-bottom: 11px;
  padding-left: 15px;
}
</style>
