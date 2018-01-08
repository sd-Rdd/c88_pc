<template>
    <div class="news">
        <div class="head">
            <i class="iconfont icon-news" style="font-size:18px;"></i>
            资讯信息
        </div>
        <div class="news_list">
            <ul>
                <router-link v-for="(item,index) in result" :key="index" tag="li" :to="{name:'newsDetail',params: { id: item.id }}">
                    <em>{{item.columnId|filterColumnId}}</em>
                    <a href="javascript:;" target="_blank">{{item.title}}</a>
                </router-link>
            </ul>

        </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      result: []
    };
  },
  created() {
    this.$http
      .post("/index/information/list")
      .then(res => {
        //console.log(res.data);
        if (res.data.status == 200) {
          for (let i = 0; i < 16; i++) {
            this.result.push(res.data.result[i]);
          }
        }
      })
      .catch(res => console.log(res));
  },
  filters: {
    filterColumnId(a) {
      if (a == 1) {
        return "【新闻】";
      } else if (a == 2) {
        return "【技巧】";
      }
    }
  }
};
</script>
<style scoped>
.news .head {
  overflow: hidden;
  background: #f5f7fe;
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-bottom: none;
}

.news .head i {
  overflow: hidden;
  color: #3a69ff;
  font-size: 27px;
  vertical-align: middle;
  margin-right: 4px;
}

.news .news_list {
  overflow: hidden;
  border: 1px solid #ddd;
  padding: 10px;
  height: 494px;
}

.news .news_list .hot {
  overflow: hidden;
  line-height: 40px;
  padding-left: 10px;
}

.news .news_list .hot span {
  overflow: hidden;
  font-size: 14px;
}

.news .news_list .hot a {
  color: #333;
  overflow: hidden;
  margin-left: 10px;
  font-size: 16px;
}

.news .news_list .hot a:hover {
  color: #e94335;
}

.news .news_list .hot a:hover {
  overflow: hidden;
}

.news .news_list ul {
  overflow: hidden;
}

.news .news_list ul li {
  font-size: 14px;
  line-height: 31px;
  overflow: hidden;
}

.news .news_list ul li em {
  overflow: hidden;
  color: #999999;
  display: block;
  float: left;
}

.news .news_list ul li a {
  overflow: hidden;
  color: #333333;
  display: block;
  float: left;
  width: 392px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>