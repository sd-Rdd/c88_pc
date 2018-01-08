<template>
    <div>
        <v-header></v-header>
        <v-body></v-body>
        <main class="outline" id="container">
            <div class="main article">
                <div class="sub_nav">
                    <router-link to="/index">首页</router-link>
                    <em>&gt;</em>
                    <router-link to="/noticeList">公告</router-link>
                    <em>&gt;</em>
                    <a href="#notice">
                        <router-link to="/noticeList" tag="span">公告列表</router-link>
                    </a>
                </div>
               <router-view></router-view>
                
            </div>
        </main>
        
        <v-foot></v-foot>
    </div>
</template>
<script>
import vHeader from 'components/header/header'
import vBody from 'components/common/body_fixed'
import vFoot from 'components/footer/footer'
export default {
    components: { vHeader, vBody, vFoot },
}
</script>
<style lang="less" scoped>
@import "../../assets/css/noticeAndNews.less";
</style>