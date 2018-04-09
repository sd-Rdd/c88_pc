<template>
    <div class="v_out v_out_p">
      <div class="v_show">
        <div class="v_cont">
          <ul v-if="banner">
            <transition name="el-fade-in-linear" v-for="(item,index) in banner" :key="index">
              <li v-show="index==currentIndex" @mouseenter="stopFre" @mouseleave="restartFre">
                <img :src="item.imagUrl" width="420" height="215" :alt="item.title" >
              </li>
            </transition>
          </ul>
        </div>
      </div>
      <!--<ul class="circle">-->
        <!--<li v-for="(item,index) in (banner.length)" :key="index" @click="altImg(index)" :class="{cur:currentIndex==index}">{{index+8}}</li>-->
      <!--</ul>-->
    </div>

</template>
<script>
export default {
    data() {
        return {
            currentIndex: 0,
            banner:[],
            fre:null
        }
    },
    methods: {
        altImg(index) {
            this.currentIndex = index;
            //console.log(this.banner.length);
        },
        gotoActivityPage(){
            this.$router.push({path:'/activity'})
        },
        stopFre(){
            clearInterval(this.fre);
        },
        restartFre(){
        }
    },
    created(){
        this.$http.post("/index/banner")
        .then(res=>{
            if(res.data.status==200){
                this.banner=res.data.banner;
            }
        })
//        .catch(res=>console.log(res))
    }
}
</script>
<style lang="less" scoped>

/*.v_out {*/
    /*float: right;*/
    /*width: 980px;*/
    /*margin: 0 0 0 0;*/

/*}*/

/*.v_show {*/
    /*width: 980px;*/
    /*overflow: hidden;*/
    /*position: relative;*/
    /*height: 240px;*/
    /*float: left;*/
/*}*/


.v_cont ul {
    float: left;
    text-align: center;
    line-height: 50px
}

.v_out_p {
    position: relative;
    overflow: visible
}

.circle {
    position: absolute;
    right: 10px;
    top: 200px
}

.circle li {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: rgba(0, 0, 0, 0.41);
    float: left;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
}

.circle .circle-cur {
    background: rgba(0, 0, 0, 0.74);
}
</style>
