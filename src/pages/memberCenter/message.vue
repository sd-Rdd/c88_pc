<template>
    <member-common>
        <div slot="nav">
            <li class="hover">
                <a href="javascript:;">信息公告</a>
            </li>
        </div>
        <div slot="body">
            <el-collapse accordion style="padding:0 15px;">
                <el-collapse-item :title="item.title" v-for="(item,index) in advert" :key="index">
                    <div v-html="item.content"></div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </member-common>
</template>
<script>
import MemberCommon from "components/common/memberCommon";
import tools from "tools/tools.js";
export default {
  created() {
    this.getData();
    this.memberData = tools.store.getData("user");
  },
  data() {
    return {
      advert: [],
      memberData: null
    };
  },
  methods: {
    getData() {
      this.$http
        .post("/index/advert",{})
        .then(res => {
          console.log(res.data);
          if (res.data.status == 200) {
            this.advert = res.data.advert;
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  components: {
    MemberCommon
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
.el-collapse {
  border-left: none;
  border-right: none;
  border-top: none;
  margin-bottom: 20px;
}
</style>
