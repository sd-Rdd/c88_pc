<template>
    <div style="position: relative; overflow: hidden; width: 100%; height: 100%; flex: 1 1 0%;">
        <div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: -17px; margin-bottom: -17px;">
            <div class="list">
                <div class="menu-lobby">
                    <div class="logo">
                        <i class="iconfont icon-home" style="color: rgb(255, 255, 255); font-size: 20px;"></i>
                    </div>
                    <router-link to='/buyLottery'>购彩大厅</router-link>
                    <div class="logo"></div>
                </div>
                <!-- 各个彩种的展示开始 -->
                <div class="category" v-for="(item,index) in result" :key="index">
                    <!-- 标题部分 -->
                    <div class="category-info" @click="obj[item.catName]=!obj[item.catName]">
                        <div class="logo">
                            <img :src="item.showImg" />
                        </div>
                        <div class="category-name null">{{item.catName}}</div>
                        <div class="logo">
                            <i class="iconfont icon-arrow-right" :class="{'rotateChanged':isshow[item.catName]}"></i>
                        </div>
                    </div>
                    <!-- 内容部分 -->
                    <div class="category-detail" v-show="obj[item.catName]">
                        <router-link class="lottery-info" v-for="(item1,index) in item.lotteryList" :key="index" :to="'/buyLottery/bet'+item1.id" active-class="active">
                            <span>{{item1.lotteryName}}</span>
                        </router-link>
                    </div>
                </div>
                <!-- 各个彩种的展示结束 -->
            </div>
        </div>
        <div style="position: absolute; height: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; left: 2px; border-radius: 3px;">
            <div style="position: relative; display: block; height: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); width: 0px;"></div>
        </div>
        <div style="position: absolute; width: 6px; transition: opacity 200ms; opacity: 0; right: 2px; bottom: 2px; top: 2px; border-radius: 3px;">
            <div style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); height: 0px;"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            result: [],
            obj:{}//记录具体玩法列表是否展开的数据
        }
    },
    created() {
        this.getMenuList()
    },
    computed:{
        isshow(){
            let obj={};
            this.result.forEach(item=> {
                obj[item.catName]=false;
            });
            this.obj=obj;
            return obj
        }
    },
    methods: {
        getMenuList() {
            this.$http.post('/api/show/cat/list')
                .then(res => {
                    //console.log(res.data)
                    if (res.data.status == "200") {
                        this.result = res.data.result;
                    }
                })
                .catch(err => console.log(err))
        }
    }
}
</script>
<style scoped>
a:hover {
    text-decoration: none !important;
}

* {
    padding: 0;
    margin: 0;
    font-size: 1rem;
    color: #333;
    font-family: Microsoft YaHei, Arial, Helvetica, "sans-serif";
    outline: none;
    cursor: inherit;
    box-sizing: border-box;
}
</style>
