<template>
  <div class="xs">

    <div class="header">

      <div class="round">

        <ul>
          <li>
            <i class="iconfont icon-jiaoyi"></i>
            <router-link :to="{name:'helpList',params:{'listId':51}}">注册</router-link>
          </li>

          <li>
            <i class="iconfont icon-meiyuan"></i>
            <router-link :to="{name:'helpList',params:{'listId':56}}">充值</router-link>
          </li>

          <li>
            <i style="font-size: 26px;" class="iconfont icon-meiyuandollar"></i>
            <router-link :to="{name:'helpList',params:{'listId':546}}">投注</router-link>
          </li>

          <li>
            <i style=" font-size: 37px; top: 14px; left: 33px; " class="iconfont icon-jiangliduihuan"></i>
            <router-link :to="{name:'helpList',params:{'listId':510}}">兑奖</router-link>
          </li>
          <!--无三角-->
          <li class="round_2">
            <i style=" font-size: 43px; top: 14px; left: 30px; " class="iconfont icon-yongjintikuan"></i>
            <router-link :to="{name:'helpList',params:{'listId':512}}">提款</router-link>
          </li>

        </ul>

      </div>
      <div class="blue_sub">
        <ul>
          <li>
            <router-link :to="{name:'helpList',params:{'listId':51}}">如何注册</router-link>
          </li>
          <li>
            <router-link :to="{name:'helpList',params:{'listId':56}}">如何充值</router-link>
          </li>
          <li>
            <router-link :to="{name:'helpList',params:{'listId':546}}">如何投注</router-link>
          </li>
          <li>
            <router-link :to="{name:'helpList',params:{'listId':510}}">如何兑奖</router-link>
          </li>
          <li>
            <router-link :to="{name:'helpList',params:{'listId':512}}">如何提款</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="list_box_main">
      <div class="list_box">
        <h2>常见问题</h2>
        <ul>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':51}}">如何注册成为会员？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':52}}">在彩票网站注册要收费吗？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':54}}">有银行卡就可以充值了吗？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':55}}">如何开通网上支付？</router-link>
          </li>
        </ul>
      </div>
      <div class="list_box">
        <h2>个人账号</h2>
        <ul>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':222}}">注册时用户需要注意什么？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':223}}">注册后为什么要绑定银行卡？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':224}}">注册时把电话号码填写错误有什么影响？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':225}}">注册时填写的电话号码换了怎么办？</router-link>
          </li>
        </ul>
      </div>
      <div class="list_box">
        <h2>充值提款</h2>
        <ul>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':338}}">使用网上银行安全吗？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':339}}">通过网上充值，出现该页无法显示时怎么办？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':340}}">没有接到银联打过来的电话怎么办？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':341}}">提款金额有没有限制？</router-link>
          </li>
        </ul>
      </div>
      <div class="list_box">
        <h2>规则说明</h2>
        <ul>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':446}}">我从来没买过彩票，这些彩种都怎么玩？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':447}}">什么是标准投注？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':448}}">什么是单式投注？</router-link>
          </li>
          <li class="help_index_rows_a">
            <em>·</em>
            <router-link :to="{name:'helpList',params:{'listId':449}}">什么是复式投注？</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

  }

</script>
<style lang="less" scoped>
  @import "./help.less";

</style>
