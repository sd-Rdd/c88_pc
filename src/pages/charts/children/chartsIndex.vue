<template>
    <div class="main zoushi">
        <div class="item_list" v-for="(item,index) in data" :key="index">
            <h1>{{item.title}}</h1>
            <div class="l">
                <router-link to="/charts/lottery/1" target="_blank" v-for="(item1,index) in item.content" :key="index">
                    <img :src="item1.imgsrc" alt="">
                    <span>{{item1.lotteryname}}</span>
                    <button class="btn btn-default btn-radius">号码走势</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    created() {
        axios.get('static/zoushitubiao.json')
            .then((res) => { this.data = res.data })
            .catch((err) => { console.log(err) });
    },
    data() {
        return {
            data: '',
        }
    },
}
</script>
<style scoped>
.zoushi {
    overflow: hidden
}

.zoushi .item_list,
.zoushi .item_list_row {
    overflow: hidden;
    margin-top: 20px;
}

.zoushi .item_list h1,
.zoushi .item_list_row h1 {
    overflow: hidden;
    display: block;
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    color: #666;
    font-weight: bolder;
    padding-left: 10px;
    border-left: 4px solid #E94335
}

.zoushi .item_list .l,
.zoushi .item_list_row .l {
    overflow: hidden;
    padding: 0px;
    padding-bottom: 10px
}

.zoushi .item_list .l a,
.zoushi .item_list_row .l a {
    overflow: hidden;
    background: #FFFDFC;
    border: 1px solid #FFF0E1;
    padding: 10px;
    display: inline-block;
    width: 139px;
    height: 139px;
    margin-right: 48px;
    text-decoration: none;
    margin-top: 15px
}

.zoushi .item_list .l a.no,
.zoushi .item_list_row .l a.no {
    margin-right: 0px
}

.zoushi .item_list .l a img,
.zoushi .item_list_row .l a img {
    overflow: hidden;
    display: block;
    width: 50%;
    margin: 0px auto
}

.zoushi .item_list .l a span,
.zoushi .item_list_row .l a span {
    overflow: hidden;
    display: block;
    clear: both;
    text-align: center;
    font-size: 16px;
    color: #333;
    margin-bottom: 12px;
    margin-top: 10px
}

.zoushi .item_list .l a button,
.zoushi .item_list_row .l a button {
    overflow: hidden
}

.zoushi .item_list .l a button.btn,
.zoushi .item_list_row .l a button.btn {
    overflow: hidden;
    width: 80px;
    height: 26px;
    line-height: 26px;
    padding: 0px;
    font-size: 12px;
    text-align: center;
    display: block;
    margin: 0 auto
}

.zoushi .item_list .l a.hover,
.zoushi .item_list .l a:hover,
.zoushi .item_list_row .l a.hover,
.zoushi .item_list_row .l a:hover {
    background: #fff;
    border: 1px solid #FFC58B
}

.zoushi .item_list .l a.hover img,
.zoushi .item_list .l a:hover img,
.zoushi .item_list_row .l a.hover img,
.zoushi .item_list_row .l a:hover img {
    overflow: hidden
}

.zoushi .item_list .l a.hover span,
.zoushi .item_list .l a:hover span,
.zoushi .item_list_row .l a.hover span,
.zoushi .item_list_row .l a:hover span {
    overflow: hidden
}

.zoushi .item_list .l a.hover a,
.zoushi .item_list .l a:hover a,
.zoushi .item_list_row .l a.hover a,
.zoushi .item_list_row .l a:hover a {
    text-decoration: none
}

.zoushi .item_list .l a.focus,
.zoushi .item_list .l a:focus,
.zoushi .item_list_row .l a.focus,
.zoushi .item_list_row .l a:focus {
    background: #FFF5F0;
    border: 1px solid #FFF0E1
}

.zoushi .item_list .l a.focus img,
.zoushi .item_list .l a:focus img,
.zoushi .item_list_row .l a.focus img,
.zoushi .item_list_row .l a:focus img {
    overflow: hidden
}

.zoushi .item_list .l a.focus span,
.zoushi .item_list .l a:focus span,
.zoushi .item_list_row .l a.focus span,
.zoushi .item_list_row .l a:focus span {
    overflow: hidden
}

.zoushi .item_list .l a.focus a,
.zoushi .item_list .l a:focus a,
.zoushi .item_list_row .l a.focus a,
.zoushi .item_list_row .l a:focus a {
    overflow: hidden
}

.zoushi .item_list .row_title,
.zoushi .item_list_row .row_title {
    overflow: hidden
}

.zoushi .item_list .row_title h1,
.zoushi .item_list_row .row_title h1 {
    width: 146px;
    float: left;
    margin-right: 48px
}

.zoushi .item_list .row_title h1.shishile,
.zoushi .item_list_row .row_title h1.shishile {
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/shishile_.png) left center;
    background-size: 74px 24px;
    background-repeat: no-repeat
}

.zoushi .item_list .row_title h1.pk10,
.zoushi .item_list_row .row_title h1.pk10 {
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/pk10_.png) left center;
    background-size: 60px 24px;
    background-repeat: no-repeat
}

.zoushi .item_list .row_title h1.kuaile8,
.zoushi .item_list_row .row_title h1.kuaile8 {
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/kuaileba_.png) left center;
    background-size: 66px 24px;
    background-repeat: no-repeat
}

a.btn-default,
button.btn-default,
input.btn-default,
.btn-default {
    background: #E94335;
    color: #fff;
    border: none;
    outline: none;
}

.btn-radius {
    border-radius: 4px;
}

a:hover.btn-default,
button.btn-default:hover,
input.btn-default:hover,
.btn-hover {
    background: #FB6053;
    color: #fff;
}
</style>
