<template>
    <div v-show="isShow">
        <div class="zs_box zs_left">
            <a class="zs_close" @click="close_lr" href="javascript:;">关闭</a>
            <li class="free_play">
                <i class="iconfont icon-youxishoubing"></i>
                <router-link to="/tryPlay" class="ftszie">免费试玩</router-link>
            </li>
            <li class="help_center">
                <i class="iconfont icon-bangzhuzhongxin"></i>
                <router-link to="/helpCenter" class="ftszie">帮助中心</router-link>
            </li>
            <a class="qr" href="">
                <!-- <img src="https://cpweb.kosunmobile.com/c9.kosungames.com/upload/596f10066891c.png" alt=""> -->
            </a>
            <span class="foot">
                <em class="b">扫一扫</em>
                <em class="s">安卓 APP下载</em>
            </span>
            <a class="zs_top" href="javascript:;" @click="totop">
                <i class="go_top"></i> 返回顶部</a>
        </div>

        <div class="zs_box zs_right">

            <a class="zs_close" @click="close_lr" href="javascript:;">关闭</a>

            <li class="online_sup">
                <i class="iconfont icon-service_2"></i>
                <a href="javascript:;" class="ftszie">在线客服</a>
            </li>

            <li class="line_exa">
                <i class="iconfont icon-jiancha"></i>
                <a href="tencent://message/?uin=1963999999&Site=web&Menu=yes" class="ftszie">QQ客服</a>
            </li>

            <a class="qr" href="">
                <!-- <img src="https://cpweb.kosunmobile.com/c9.kosungames.com/upload/596f101c57609.png" alt=""> -->
            </a>

            <span class="foot">
                <em class="b">扫一扫</em>
                <em class="s">苹果 APP下载</em>
            </span>

            <a class="zs_top" href="javascript:;" @click="totop">
                <i class="go_top"></i> 返回顶部</a>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:true
        }
    },
    methods: {
        close_lr() {
            this.isShow=false;
        },
        totop() {
            window.scrollTo(0, 0);
        },
    },
}
</script>
<style scoped>
.ftszie {
    font-size: 12px;
}

a {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.zs_box {
    background: #E94335;
    width: 126px;
    position: fixed;
    top: 30%;
    z-index:10000000;
}

.zs_box a.qr {
    display: inline-block;
    width: 116px;
    margin: 0px 5px
}

.zs_box a.qr img {
    display: inline-block;
    width: 116px
}

.zs_box a.zs_close {
    overflow: hidden;
    position: absolute;
    top: -18px;
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/top_head.png);
    background-size: 110px 18px;
    display: block;
    height: 18px;
    width: 110px;
    left: 7px;
    text-indent: -999px
}

.zs_box a.zs_top {
    overflow: hidden;
    display: block;
    color: #FFF;
    font-size: 12px;
    text-align: center;
    border-top: 5px solid #fff;
    height: 30px;
    line-height: 30px;
    text-decoration: none
}

.zs_box a.zs_top i {
    overflow: hidden;
    vertical-align: middle;
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/go_top.png);
    background-size: 12px 14px;
    width: 12px;
    height: 14px;
    display: inline-block
}

.zs_box a.zs_top:focus {
    background: #f50
}

.zs_box a.zs_top:hover {
    background: #FF8434
}

.zs_box.zs_left {
    left: 0px
}

.zs_box.zs_right {
    right: 0px
}

.zs_box li {
    overflow: hidden;
    width: 116px;
    height: 30px;
    color: #333;
    font-size: 14px;
    background: #fff;
    margin: 5px;
    text-align: center;
    line-height: 30px
}

.zs_box li i {
    overflow: hidden
}

.zs_box li a {
    color: #333333
}

.zs_box li.free_play {
    overflow: hidden
}

.zs_box li.help_center {
    overflow: hidden
}

.zs_box li.online_sup {
    overflow: hidden
}

.zs_box li.line_exa {
    overflow: hidden
}

.zs_box span {
    overflow: hidden
}

.zs_box span.foot {
    overflow: hidden;
    text-align: center;
    width: 100%;
    display: inline-block;
    margin-top: 5px
}

.zs_box span.foot em {
    overflow: hidden;
    color: #6B3200;
    display: block;
    text-align: center;
    width: 100%
}

.zs_box span.foot em.b {
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 5px;
}

.zs_box span.foot em.s {
    overflow: hidden;
    font-size: 10px;
    margin-bottom: 5px;
}
</style>


