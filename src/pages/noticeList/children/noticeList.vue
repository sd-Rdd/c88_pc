<template>
    <div class="article_list">
        <div class="art_list">
            <ul>
                <li v-for="item in data" :key="item.index">
                    <em>【 最新公告 】</em>
                    <router-link :to="{name:'noticeDetail',params: { id: item.id }}">{{item.title}}</router-link>
                    <span class="time">{{item.createTime|filterTime}}</span>
                </li>
            </ul>
            <div class="user_page">
                <ul> </ul>
            </div>
        </div>
    </div>
</template>
<script>
import ccaa from 'tools/tools.js'
export default {
    data(){
        return {
            data:[]
        }
    },
    filters:{
        filterTime(a){
            return ccaa.getDate(a);
        }
    },
    created() {
        this.$http.post("/index/advert",{})
        .then(res=>{
            if(res.data.status==200){
                //console.log(res.data)
                this.data=res.data.advert;
            }
        })
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/noticeAndNews.less";
</style>
