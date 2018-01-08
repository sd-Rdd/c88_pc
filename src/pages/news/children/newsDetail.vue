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
      this.fetchData();
  },
  methods: {
    fetchData () {
     console.log(this.$route.params.id)
      this.$http.post("/index/information/datail",{"id":this.$route.params.id})
      .then(res=>{
          if(res.data.status==200){
              console.log(res.data.result)
              this.data=res.data.result
          }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/noticeAndNews.less";
</style>
