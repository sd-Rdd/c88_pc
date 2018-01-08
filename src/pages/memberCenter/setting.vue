<template>
    <MemberCommon menu="详细设定">
        <div slot="body">
            <div class="info_select">
                <form id="setting_form">
                    <select v-model="select">
                        <option v-for="(item,index) in list" :key="index" :value="item.id">{{item.catName}}</option>
                    </select>
                </form>
            </div>
            <div-table v-loading="loading" element-loading-text="拼命加载中">
                <div slot="head" class="thead">
                    <div>项目</div>
                    <div>单项（号）限额</div>
                    <div>单注限额</div>
                </div>
                <div slot="body" class="tbody" v-for="(item,index) in tableData" :key="index">
                    <div>{{item.codeName}}</div>
                    <div>{{item.itemMaxMoney}}</div>
                    <div>{{item.noteMaxMoney}}</div>
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
      select: 1,
      tableData: null,
      list: null,
      memberData: null
    };
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
  methods: {
    getData(id) {
      this.loading=true;
      this.$http
        .post("/api/personal/code/details/", {
          catId: id,
          memberId:this.memberData.id
        }) /* api/personal/code/confine */
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 200) {
            this.tableData = res.data.result;
            this.loading=false;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getList() {
      this.$http
        .post("/api/cat/list",{memberId:this.memberData.id})
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 200) {
            this.list = res.data.result;
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  watch: {
    select(a) {
      this.getData(a);
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
</style>
