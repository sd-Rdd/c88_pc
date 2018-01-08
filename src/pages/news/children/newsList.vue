<template>
  <div class="article_list">
    <div class="art_list">
      <ul>
        <li v-for="item in data" :key="item.index">
          <em>{{item.columnId|filterTitle}}</em>
          <router-link :to="{name:'newsDetail',params: { id: item.id }}">{{item.title}}</router-link>
          <span class="time">{{item.createDate|filterTime}}</span>
        </li>
      </ul>
      <div class="user_page">
        <ul> </ul>
      </div>
    </div>
  </div>
</template>
<script>
import ccaa from "tools/tools.js";
export default {
  data() {
    return {
      data: []
    };
  },
  filters: {
    filterTime(a) {
      return ccaa.getDate(a);
    },
    filterTitle(a){
        if(a==1){
            return "【新闻】"
        }else if(a==2){
            return "【技巧】"
        }
    }
  },
  created() {
    this.$http.post("/index/information/list").then(res => {
      if (res.data.status == 200) {
        this.data = res.data.result;
      } else {
        this.$message({
          message: "服务器飞到月球去了............",
          type: "warning"
        });
      }
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/noticeAndNews.less";
</style>

