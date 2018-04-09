<template>
  <div>
    <div class="footer">
      <div class="main footer-main">
        <div class="left footer-qr">
          <div class="footer-qr-head">
            <a href="http://cp-cp88.com" class="">
              <img src="../../assets/image/title.png" alt="">
            </a>
          </div>
          <div class="footer-qr-img">
            <!-- 二维码 -->
            <img width="120" height="120" src="../../assets/image/cp-cp88.png"
              alt="">
          </div>
          <div class="footer-qr-foot">
            <!-- 扫一扫 手机购彩更方便 -->
          </div>
        </div>
        <div class="right footer-nav">
          <div class="footer-nav-item left">
            <div class="nav_head">
              <h2>
                <i class="iconfont icon-weibiaoti2"></i> 平台优势</h2>
            </div>
            <div class="nav_list nav_first">
              <ul class="nav_first_ul">
                <li>
                  <i class="iconfont icon-dunpai"></i>账户安全</li>
                <li>
                  <i class="iconfont icon-zhuanhuan"></i>购彩简单</li>
                <li>
                  <i class="iconfont icon-jiangtai"></i>领奖方便</li>
                <li>
                  <i class="iconfont icon-huojian"></i>提款快速</li>
              </ul>
            </div>
          </div>
          <div class="footer-nav-item left">
            <div class="nav_head">
              <h2>
                <i class="iconfont icon-yonghu"></i> 账户相关</h2>
            </div>
            <div class="nav_list">
              <ul>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':51}}">如何注册帐号</router-link>
                </li>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':229}}">怎么找回登录密码</router-link>
                </li>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':237}}">如何修改手机号码</router-link>
                </li>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':226}}">如何修改真实姓名</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-nav-item left">
            <div class="nav_head">
              <h2>
                <i class="iconfont icon-meiyuan"></i> 充值购彩</h2>
            </div>
            <div class="nav_list">
              <ul>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':56}}">如何进行充值</router-link>
                </li>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':446}}">如何购买彩票</router-link>
                </li>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':59}}">如何查询购彩记录</router-link>
                </li>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':520}}">在本站购彩安全吗</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-nav-item left">
            <div class="nav_head">
              <h2>
                <i class="iconfont icon-jiangbei"></i> 兑奖提款</h2>
            </div>
            <div class="nav_list">
              <ul>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':510}}">怎样进行兑奖</router-link>
                </li>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':512}}">如何进行提款</router-link>
                </li>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':513}}">提款是否收手续费</router-link>
                </li>
                <li>
                  <router-link :to="{name:'helpList',params:{'listId':344}}">提款不成功怎么办</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer_sec_icon">
      <ul>
        <li>
          <a href="">
            <img width="120" height="45" src="https://cpweb.kosunmobile.com/c9/Public/static/images/sec_icon_1.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <img width="120" height="45" src="https://cpweb.kosunmobile.com/c9/Public/static/images/sec_icon_2.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <img width="120" height="45" src="https://cpweb.kosunmobile.com/c9/Public/static/images/sec_icon_3.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <img width="120" height="45" src="https://cpweb.kosunmobile.com/c9/Public/static/images/sec_icon_4.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <img width="120" height="45" src="https://cpweb.kosunmobile.com/c9/Public/static/images/sec_icon_5.png" alt="">
          </a>
        </li>
      </ul>
    </div>
    <div class="footer_copyright">

      <p>
        2009-2017©彩八八彩票 公司版权所有
        <br /> 彩八八彩票 郑重提示：彩票有风险，投注需谨慎。不向未满18周岁的青少年出售彩票！
      </p>
    </div>
  </div>
</template>
<script>
  export default {

  }

</script>
<style scoped>
  .footer {
    background: url("https://cpweb.kosunmobile.com/c9/Public/static/images/footer-bg.png");
    border-top: 1px solid #ddd;
    overflow: hidden;
    clear: both;
    border-bottom: 1px solid #ddd
  }

  .footer .footer-main {
    margin-top: 20px;
    padding-top: 20px;
    margin-bottom: 5px;
    padding-bottom: 5px
  }

  .footer .footer-main .footer-qr {
    width: 250px;
    overflow: hidden
  }

  .main {
    width: 1000px !important;
    margin: 0 auto;
    overflow: hidden;
  }

  .left {
    overflow: hidden;
    float: left;
  }

  .right {
    overflow: hidden;
    float: right;
  }

  a {
    text-decoration: none;
  }

  .footer .footer-main .footer-qr .footer-qr-head {
    height: 27px;
    margin-bottom: 15px;
    text-align: center
  }

  .footer .footer-main .footer-qr .footer-qr-head img {
    width: 124px;
    height: auto;
  }

  .footer .footer-main .footer-qr .footer-qr-img {
    width: 100%;
    text-align: center
  }

  .footer .footer-main .footer-qr .footer-qr-foot {
    font-size: .75rem;
    text-align: center;
    margin-top: 3px;
    padding-top: 5px;
    line-height: 23px
  }

  .footer .footer-main .footer-nav {
    width: 720px
  }

  .footer .footer-main .footer-nav .footer-nav-item {
    width: 180px
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_head {
    margin-bottom: 15px
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_head h2 {
    font-size: 1.25rem;
    font-weight: 100;
    color: #333
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_head i {
    font-size: 1.5rem;
    color: #CCCCCC
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_list {
    overflow: hidden;
    line-height: 30px;
    padding-left: 33px
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_list ul {
    overflow: hidden
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_list ul li {
    font-size: .875rem
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_list ul li a {
    color: #666
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_list ul li a:hover {
    color: #FF9300;
    text-decoration: underline;
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_list .nav_first_ul li {
    font-size: 1.125rem;
    color: #666;
    font-weight: weight
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_list .nav_first_ul li i {
    font-size: 1.25rem;
    color: #888;
    padding-right: .625rem
  }

  .footer .footer-main .footer-nav .footer-nav-item .nav_first {
    padding-left: 3px
  }

  .footer_sec_icon {
    overflow: hidden;
    padding-top: 20px;
    background: #0D0D0D;
  }

  .footer_sec_icon ul {
    text-align: center
  }

  .footer_sec_icon ul li {
    display: inline-block;
    display: inline;
    zoom: 1;
    margin-left: 2px;
    margin-right: 2px;
    padding-left: 2px;
    padding-right: 2px
  }

  .footer_copyright {
    text-align: center;
    /*margin-top: 10px;*/
    padding-top: 20px;
    padding-bottom: 20px;
    background: #0D0D0D;
  }

  .footer_copyright p {
    font-size: .75rem;
    color: #6B696C;
    line-height: 1.3;
  }

</style>
