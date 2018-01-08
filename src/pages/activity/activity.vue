<template>
    <div>
        <v-header></v-header>
        <div class="main huodong">
            <div class="huodong_title">
                <h1>活动专区</h1>
            </div>
            <div class="huodong_main">
                <div class="box" v-for="(item,index) in banner" :key="index" @click="show(index)">
                    <div class="show_box">
                        <div class="left img_box">
                            <img :src="item.imagUrl" width="660" height="150" alt="">
                        </div>
                        <div class="right box_info">
                            <h1>
                                <i class="iconfont icon-duigou"></i> {{item.title}}</h1>
                        </div>
                    </div>
                    <el-collapse-transition>
                    <div class="content_box" v-show="isshow[index]" v-html="item.subTitle"></div>
                    </el-collapse-transition>
                </div>
            </div>
        </div>
        <v-foot></v-foot>
        <v-body></v-body>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import vBody from 'components/common/body_fixed';
import vFoot from 'components/footer/footer';
export default {
    methods: {
        show(a) {
            this.isshow[a]=!this.isshow[a];
        }
    },
    data() {
        return {
            isshow:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false},
            banner:null
            
        }
    },
    components: { vHeader, vBody, vFoot },
    created(){
        this.$http.post("/index/banner")
        .then(res=>{
            //console.log(res.data);
            if(res.data.status==200){
                this.banner=res.data.banner;
               /*  let length=res.data.banner.length;
                this.isshow={};
                for(let i=0;i<length;i++){
                    this.isshow[Number(i)]=false;
                } */
            }
        })
        .catch(res=>console.log(res))
    }
}
</script>
<style scoped>
.huodong {
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 10px
}

.left {
    overflow: hidden;
    float: left;
}

.right {
    overflow: hidden;
    float: right;
}

.main {
    width: 1000px !important;
    margin: 0 auto;
    overflow: hidden;
}

.huodong .huodong_title {
    overflow: hidden;
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/huodong_ico.png);
    background-repeat: no-repeat;
    background-size: 30px 40px;
    padding-left: 38px;
    height: 40px;
    line-height: 40px
}

.huodong .huodong_title h1 {
    overflow: hidden;
    font-size: 18px;
    font-weight: 400;
    color: #D51910
}

.huodong .huodong_main {
    overflow: hidden
}

.huodong .huodong_main .box {
    overflow: hidden;
    margin-bottom: 10px;
    border: 1px solid #E5E5E5;
    background: #F9F9F9
}

.huodong .huodong_main .box .show_box {
    overflow: hidden;
    padding: 10px
}

.huodong .huodong_main .box .show_box .img_box {
    overflow: hidden
}

.huodong .huodong_main .box .show_box .img_box img {
    overflow: hidden
}

.huodong .huodong_main .box .show_box .box_info {
    overflow: hidden;
    width: 300px;
    line-height: 20px
}

.huodong .huodong_main .box .show_box .box_info h1 {
    overflow: hidden;
    font-size: 17px;
    font-weight: 300;
    color: #5C8AE5;
    line-height: 31px;
    margin-top: 5px;
    height: 30px
}

.huodong .huodong_main .box .show_box .box_info h1 i {
    overflow: hidden;
    vertical-align: middle;
    font-size: 20px;
    display: inline-block;
    width: 21px;
    height: 27px;
    text-align: center;
    line-height: 28px
}

.huodong .huodong_main .box .show_box .box_info ul {
    overflow: hidden;
    margin-top: 8px;
    font-size: 14px;
    color: #333333
}

.huodong .huodong_main .box .show_box .box_info ul li {
    overflow: hidden;
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/dot.png) left center;
    background-repeat: no-repeat;
    padding-left: 13px;
    background-size: 8px
}

.huodong .huodong_main .box .content_box {
    overflow: hidden;
    border-top: 1px solid #ddd;
    padding: 20px;
    line-height: 28px;
    font-size: 14px;
    color: #333
}

.huodong .huodong_main .box .content_box p {
    overflow: hidden
}
</style>
