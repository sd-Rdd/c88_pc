<template>
    <div>
        <div class="notice">
            <i class="iconfont"></i>
            <marquee onmouseout="this.start()" onmouseover="this.stop()" @click="gotoNoticeList" v-html="advert.content">
                <!-- <p>
                    <span style="font-family: 微软雅黑, 宋体, Verdana; font-size: 12px;cursor:pointer;">{{advert.content}}</span>
                </p> &nbsp; &nbsp; &nbsp; &nbsp; -->
            </marquee>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            advert:{}
        }
    },
    methods:{
        gotoNoticeList(){
           this.$router.push({path: '/noticeList'})
        }
    },
    created() {
        this.$http.post("/index/advert/new",{})
        .then(res=>{
            if(res.data.status==200){
                // console.log (res.data)
                let arr = res.data.advert.filter(item=>{
                    return item.type === 2
                })[0]
                 this.advert=arr;
            }
        })
    }
}
</script>
<style scoped>
.notice {
    position: relative;
    overflow: hidden;
    background: #FFF6E5;
    line-height: 29px;
    height: 29px;
    padding-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px
}

marquee {
    margin-left: 25px;
    width: 700px;
    color: #666
}

.notice i {
    position: absolute;
    left: 10px;
    top: 8px;
    overflow: hidden;
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/laba.png);
    display: inline-block;
    width: 15px;
    height: 15px;
    background-size: 15px 15px;
    margin-right: 5px
}
</style>
