<template>
  <div class="news">
    <div class="cp_title">
      <h1>
        <i class="ic-ttNotice"></i>
        平台公告
        <a href="#">/ 更多</a>
      </h1>
      <div class="clear"></div>
      <div class="gg_list">
      </div>
    </div>
    <div class="news_list">
      <ul>
        <router-link v-for="(item,index) in result" :key="index" tag="li"
                     :to="{name:'newsDetail',params: { id: item.id }}">
          <em>{{item.columnId | filterColumnId}}</em>
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
<style lang="less" scoped>
  .news .head {
    overflow: hidden;
    background: #f5f7fe;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    font-size: 14px;
    border-bottom: none;
  }

  .cp_title {
    margin-bottom: 10px;
    h1 {
      margin-top: 3px;
      font-size: 18px;
      height: 27px;
      margin-bottom: 10px;
    }
    i {
      display: inline-block;
      font-style: normal;
      font-weight: normal;
      line-height: 1;
      background-image: url(../../../assets/image/icon.png);
      background-repeat: no-repeat;
      vertical-align: -2px;
    }
    .ic-ttNotice {
      width: 22px;
      height: 22px;
      background-position: -106px -51px;
    }
    a {
      font-size: 14px;
      color: #888;
    }
  }

  .gg_list {
    float: left;
    /*border: #ccc solid 1px;*/
    padding: 5px 0;
    height: 246px;
    overflow: hidden;
    background: #F8E9FF;
  }

  .news .head i {
    overflow: hidden;
    color: #3a69ff;
    font-size: 27px;
    vertical-align: middle;
    margin-right: 4px;
  }

  .news .news_list {
    /*width: 420px;*/
    height: 258px;
    overflow: hidden;
    border: 1px solid #ccc;
    ul {
      padding: 10px;
      /*background-image: url("../../../assets/image/i_notice_boxbg.jpg");*/
      background: url("../../../assets/image/i_notice_boxbg.jpg");
    }
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

  /*.news .news_list .hot a:hover {*/
    /*color: #e94335;*/
  /*}*/

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
    /*display: block;*/
    float: left;
    /*width: 392px;*/
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }
  .news .news_list ul li a:hover {
    color: #E32222;
    text-decoration: none;
  }
</style>
