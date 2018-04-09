<template>
  <div v-show="isShow">
    <ul class="zs_box zs_right">
      <li class="active">
        <a href="/" class="ftszie">
          <i class="iconfont icon-service_2"></i>
          返回首页
        </a>
      </li>
      <li>
        <router-link to="/tryPlay" class="ftszie">
          <i class="iconfont icon-youxishoubing"></i>
          免费试玩
        </router-link>
      </li>

        <li>
          <a href="https://ssg.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=934991&configID=41704&jid=7704799059&s=1
" class="ftszie">
            <i class="iconfont icon-service_2"></i>
            在线客服
          </a>
        </li>

        <li>
          <a :href="service" class="ftszie">
            <i class="iconfont icon-jiancha"></i>
            QQ客服
          </a>
        </li>

      <li>
        <router-link to="/helpCenter" class="ftszie">
          <i class="iconfont icon-bangzhuzhongxin"></i>
          帮助中心
        </router-link>
      </li>


      <li>
        <a  href="javascript:;" class="zs_top" @click="totop">
          <i class="iconfont go_top"></i>
          返回顶部
        </a>
      </li>

    </ul>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        isShow: true,
        service: ''
      }
    },
    methods: {
      close_lr() {
        this.isShow = false;
      },
      totop() {
        window.scrollTo(0, 0);
      },
      serviceQQ() {
        this.$http.post("/sysAllocation/getCustomerQQ", {})
          .then(res => {
            if (res.data.status === '200') {
              let str = res.data.result[0].qq
              this.service = `tencent://message/?uin=${str}&Site=web&Menu=yes`
            }
          })
      }
    },
    created() {
      this.serviceQQ()
    }
  }
</script>
<style lang="less" scoped>
  a {
    text-decoration: none;
  }
  .zs_box {
    position: fixed;
    right: 0;
    top: 100px;
    width: 80px;
    z-index: 999;
    font-size: 12px;
    text-align: center;
    .active {
      background: #da79bc;
      filter: none;
    }
    li {
      height: 60px;
      padding-top: 15px;
      display: block;
      color: white;
      text-decoration: none;
      background: rgba(0,0,0,0.6);
      -webkit-transition: background 0.3s linear;
      -moz-transition: background 0.3s linear;
      -o-transition: background 0.3s linear;
      transition: background 0.3s linear;
      i {
        display: block;
        width: 24px;
        height: 23px;
        margin: 0 0 10px 29px;
      }
      a {
        display: block;
        color: #fff;
      }
    }
    li:hover {
        background: #da79bc;
        filter: none;
    }
  }
  .zs_box a.zs_top i {
    overflow: hidden;
    vertical-align: middle;
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/go_top.png);
    background-size: 12px 14px;
    width: 12px;
    height: 14px;
    display: block;
    margin-left: 34px;
  }

</style>
