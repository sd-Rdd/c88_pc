<template>
    <div class="article_content">
        <div class="art_header">
            <h1>{{data.title}}</h1>
        </div>
        <div class="cont" v-html="data.content">
            <!-- <p>
                <span style="color: rgb(102, 102, 102); font-family: 微软雅黑, 宋体, Verdana; font-size: 12px;">
                    {{data.content}}
                </span>
            </p> -->
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.$http.post("/index/advert",{}).then(res => {
      if (res.data.status == 200) {
        this.data=res.data.advert.filter(res=>{
            return res.id==this.$route.params.id
        })[0];
      }
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/noticeAndNews.less";
</style>
