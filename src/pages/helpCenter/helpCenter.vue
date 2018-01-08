<template>
  <div>
    <v-header></v-header>
    <div class="main help">
      <div class="sub_nav">
        <router-link to="/index">首页</router-link>
        <em>></em>
        <router-link to="/helpCenter">帮助中心</router-link>
      </div>
  
      <div class="help_main">
  
        <div class="left help_sub_left">
  
          <div class="sub_item ">
            <div class="nav_title">
              <router-link :to="{name:'helpList',params:{'listId':11}}">
                <i class="iconfont icon-sub"></i>
                <i class="iconfont icon-tianjiaguize"></i>常见问题
                <em class="sj"></em>
              </router-link>
            </div>
          </div>
          <div class="sub_item ">
            <div class="nav_title">
              <router-link :to="{name:'helpList',params:{'listId':222}}">
                <i class="iconfont icon-sub"></i>
                <i class="iconfont icon-tianjiaguize"></i>个人账号
                <em class="sj"></em>
              </router-link>
            </div>
          </div>
          <div class="sub_item ">
            <div class="nav_title">
              <router-link :to="{name:'helpList',params:{'listId':338}}">
                <i class="iconfont icon-sub"></i>
                <i class="iconfont icon-tianjiaguize"></i>充值提款
                <em class="sj"></em>
              </router-link>
            </div>
          </div>
          <div class="sub_item ">
            <div class="nav_title">
              <router-link :to="{name:'helpList',params:{'listId':446}}">
                <i class="iconfont icon-sub"></i>
                <i class="iconfont icon-tianjiaguize"></i>规则说明
                <em class="sj"></em>
              </router-link>
            </div>
          </div>
          <div class="sub_item ">
            <div class="nav_title">
              <router-link :to="{name:'helpList',params:{'listId':51}}">
                <i class="iconfont icon-sub"></i>
                <i class="iconfont icon-tianjiaguize"></i>新手上路
                <em class="sj"></em>
              </router-link>
            </div>
          </div>
        </div>
        <div class="right help_right">
          <router-view></router-view>
        </div> 
        
      </div>
    </div>
    <v-foot></v-foot>
    <v-body></v-body>
  </div>
</template>
<script>
import vHeader from 'components/header/header'
import vBody from 'components/common/body_fixed'
import vFoot from 'components/footer/footer'
export default {
  components: { vHeader, vBody, vFoot }
}
</script>
<style lang="less" scoped>
@import "./children/help.less";
</style>




