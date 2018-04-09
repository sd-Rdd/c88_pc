<template>
    <div>
        <div class="header">
            <div class="main main_btm_border">
                <div class="left logo">
                    <a href="javascript:window.open('/', 'home');" class="logo-link" id="">
                        <span class="logo_image"></span>
                    </a>
                </div>
                <div class="right login_and_userinfo_1">
                    <!-- no login -->
                    <!-- logined logined -->
                    <div class="login_header">
                        <span class="welcome">欢迎来到彩八八彩票</span>
                        <div class="mobile_download" style="cursor:pointer;" @click="gotoNewPage('/mobile')">
                            <i class="iconfont icon-apple"></i>
                            <i class="iconfont icon-anzhuo"></i>
                            <span class="">手机app下载</span>
                        </div>
                    </div>
                    <!-- logined end -->
                </div>
            </div>
        </div>
        <!-- 主体开始 -->
        <div class="main usercenter">
            <div class="user_usersafe">
                <!-- 左侧菜单 -->
                <!-- 会员中心菜单 -->
                <!--<div class="user_menu left">-->
                    <!--<h2>会员中心</h2>-->
                    <!--<ul>-->
                        <!--<router-link to="/memberCenter/person" tag="li" active-class='hover'>-->
                            <!--<i class="iconfont icon-iconfontmy"></i>-->
                            <!--<a href="javascript:;">个人中心</a>-->
                        <!--</router-link>-->
                        <!--<router-link to="/memberCenter/daili" tag="li" active-class='hover' v-if="memberData.type==2||memberData.type==3">-->
                            <!--<i class="iconfont icon-daili"></i>-->
                            <!--<a href="javascript:;">代理中心</a>-->
                        <!--</router-link>-->
                        <!--<router-link to="/memberCenter/caiwu/1" tag="li" active-class='hover'>-->
                            <!--<i class="iconfont icon-caiwu"></i>-->
                            <!--<a href="javascript:;">财务中心</a>-->
                        <!--</router-link>-->
                        <!--<router-link to="/memberCenter/bettingRecord" tag="li" active-class='hover'>-->
                            <!--<i class="iconfont icon-jiaoyi"></i>-->
                            <!--<a href="javascript:;">交易记录</a>-->
                        <!--</router-link>-->
                        <!--<router-link to="/memberCenter/setting" tag="li" active-class='hover'>-->
                            <!--<i class="iconfont icon-setting"></i>-->
                            <!--<a href="javascript:;">详细设定</a>-->
                        <!--</router-link>-->
                        <!--<router-link to="/memberCenter/peilv" tag="li" active-class='hover'>-->
                            <!--<i class="iconfont icon-peilv"></i>-->
                            <!--<a href="javascript:;">赔率详情</a>-->
                        <!--</router-link>-->
                        <!--<router-link to="/memberCenter/message" tag="li" active-class='hover'>-->
                            <!--<i class="iconfont icon-xinxi"></i>-->
                            <!--<a href="javascript:;">信息公告</a>-->
                        <!--</router-link>-->
                    <!--</ul>-->
                <!--</div>-->




                <div class="user_right right">
                    <router-view></router-view>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import ccaa from "tools/tools.js";
import url from "static/url.js";
export default {
  data() {
    return {
      detailMenu: "person",
      memberData: null,
      safe: null
    };
  },
  created() {
    this.memberData = ccaa.store.getData("user");
    /* console.log(this.memberData); */
  },
  methods: {
    gotoNewPage(ad) {
      window.open(url + ad, "");
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  margin: 0 auto;
  width: 1000px;
  .main_btm_border {
    border-bottom: 4px solid #dbdbdb;
  }
  .main {
    width: 1000px !important;
    margin: 0 auto;
    overflow: hidden;
    .left {
      overflow: hidden;
      float: left;
      .logo-link {
        overflow: hidden;
        margin-top: 10px;
        display: block;
        margin-bottom: 10px;
        .logo_image {
          display: block;
          height: 68px;
          background: url("../../assets/image/logo.png") no-repeat;
          background-size: 100% auto;
          width: 227px;
          overflow: hidden;
        }
      }
    }
    .login_and_userinfo_1 {
      width: 750px;
      overflow: hidden;
      margin-top: 20px;
      .login_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 53px;
        color: #666;
        font-size: 0.875rem;
        .iconfont {
          font-size: 1.5rem;
          padding-right: 5px;
        }
      }
    }
    .right {
      overflow: hidden;
      float: right;
    }
  }
}

.usercenter {
  width: 980px !important;
  margin-bottom: 37px;
  margin: 0 auto;
  overflow: hidden;
  .user_usersafe {
    border-top: none;
    overflow: hidden;
    .user_menu {
      width: 160px;
      h2 {
        background: #e94335;
        height: 44px;
        line-height: 44px;
        font-size: 1.0625rem;
        text-align: center;
        color: #fff;
        font-weight: 100;
      }
      ul {
        overflow: hidden;
        border-left: none !important;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        border-top: none !important;
        li {
          display: block;
          clear: both;
          z-index: 20;
          position: relative;
          overflow: hidden;
          border-left: 1px solid #ddd;
          left: 0px;
          padding-left: 2px;
          a {
            font-size: 0.875rem;
            display: block;
            float: left;
            line-height: 44px;
            color: #333;
            text-decoration: none;
          }
          i {
            font-size: 1.4375rem;
            color: #e1e1e1;
            margin-left: 15px;
            margin-right: 15px;
            margin-top: 9px;
            margin-bottom: 5px;
            display: block;
            float: left;
          }
          &.hover {
            border-left: 2px solid #e94335;
            /*background: #f8f8f8;*/
            z-index: 110;
            left: 0px;
            padding-left: 1px;
            i {
              color: #e94335;
            }
          }
          &:hover {
            border-left: 2px solid #e94335;
            background: #f8f8f8;
            z-index: 110;
            left: 0px;
            padding-left: 1px;
            i {
              color: #e94335;
            }
          }
        }
      }
    }
    .left {
      overflow: hidden;
      float: left;
    }
    .user_right {
      min-width: 980px;
    }
    .right {
      overflow: hidden;
      float: right;
    }
  }
}
</style>
