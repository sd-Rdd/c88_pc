<template>
    <div class="tool_bar">
        <div class="main">
            <div class="left welcome">
                欢迎光临彩八八彩票
            </div>
            <div class="right top_bar_nav">
                <ul>
                    <li class="top_bar_nav">
                        <a @click="freePlay">
                            免费试玩
                        </a>
                    </li>
                    <li>|</li>
                    <li class="top_bar_nav">
                        <router-link to="/joinAgent">
                            加入代理
                        </router-link>
                    </li>
                    <li>|</li>
                    <li class="top_bar_nav ">
                        <a @click="addCollection">加入收藏</a>
                    </li>
                    <li>|</li>
                    <li class="top_bar_nav ">
                        <router-link to="/helpCenter">
                            帮助中心
                        </router-link>
                    </li>
                    <li>|</li>
                    <li class="top_bar_nav ">
                        <router-link to="/rules">玩法</router-link>
                    </li>
                    <li>|</li>
                    <li class="top_bar_nav ">
                        <router-link to="/news">资讯</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import tools from "tools/tools.js";
export default {
  data() {
    return {
      member: null
    };
  },
  created() {
    this.member = tools.store.getData("user");
  },
  methods: {
    freePlay() {
      if (this.member.id) {
        if (this.member.type == 0) {
          this.showConfirm("试玩账号");
        } else if (this.member.type != 0) {
          this.showConfirm("正式账号");
        }
      } else {
        this.$router.push({ path: "/tryPlay" });
      }
    },
    showConfirm(a) {
      let r = confirm("您当前登录的是" + a + ",是否要退出？");
      if (r == true) {
        sessionStorage.clear();
        this.$router.push({ path: "/tryPlay" });
      }
    },
    //加入收藏功能
    addCollection(){
      alert("加入收藏失败，请使用Ctrl+D进行添加")
    }
  }
};
</script>
<style  scoped>
.tool_bar {
  height: 30px;
  background: #f3f3f3;
  line-height: 30px;
}
.tool_bar .welcome {
  font-size: 0.8125rem;
  color: #333;
}
.tool_bar .left {
  width: 300px;
}
.tool_bar .right {
  width: 485px;
}
.tool_bar li {
  float: left;
}
.tool_bar li a {
  color: #333;
  display: block;
  padding-left: 8px;
  padding-right: 8px;
  cursor: pointer;
  font-size: 0.7225rem;
}
.tool_bar li a:hover {
  color: #e94335;
  background: #fffbf7;
}

.right {
  overflow: hidden;
  float: right;
}
.left {
  overflow: hidden;
  float: left;
}
.top_bar_nav ul {
  float: right;
}
.main {
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}
.top_bar_nav {
  font-size: 0.8125rem;
  color: #333;
}
</style>


