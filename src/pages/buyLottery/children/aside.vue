<template>
  <div>
    <transition name="fade">
      <div v-show="isShow" class="lty_list">
        <div class="list">
          <div class="menu-lobby">
            <img src="" alt="">
            <div class="logo"></div>
          </div>
          <!-- 各个彩种的展示开始 -->
          <div class="sidebar_con">
            <div class="category" v-for="(val,index) in lotteryCard" :key="index">
              <router-link :to="'/buyLottery/bet'+val.id" class="category-info">
                <div class="category-name">{{val.lotteryName}}</div>
                <div class="counter">
                  <counter :endtime="val.runLotteryTime" :startTime="sysDate" @onTimeOut="onTimeOut(val.id)"
                           style="color: #fff;font-size: 12px"></counter>
                </div>
              </router-link>
            </div>
          </div>

          <!-- 各个彩种的展示结束 -->
          <div class="hide" @click="openClose(1)">
            <span >点击隐藏</span>
          </div>
        </div>
      </div>
    </transition>
    <transition  name="fade">
      <div v-show="!isShow" class="lty_list">
        <div @click="openClose(1)" class="openMenu">
          <span v-text="btnText"></span>
        </div>
      </div>
    </transition>


  </div>
</template>
<script>
  import counter from './betComponents/counter'
  import url from "static/url.js";
  export default {
    data() {
      return {
//        result: [],
        lotteryCard: null,
        obj: {}, //记录具体玩法列表是否展开的数据
        isShow: true,
        btnText: "打开菜单",
        screenWidth: document.body.clientWidth
      }
    },
    components: {counter},
    created() {
//      this.getMenuList()
      this.getList()
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
      console.log(this.screenWidth)
    },
    computed: {
      isshow(){
        let obj = {};
        this.result.forEach(item => {
          obj[item.catName] = false;
        });
        this.obj = obj;
        return obj
      }
    },
    methods: {
//      getMenuList() {
//        this.$http.post('/api/show/cat/list')
//          .then(res => {
//            //console.log(res.data)
//            if (res.data.status == "200") {
//              this.result = res.data.result;
//            }
//          })
//          .catch(err => console.log(err))
//      },
      openClose () {
        this.isShow = !this.isShow
      },
      getList(){
        this.$http.post('/api/lottery/listLottery', {})
          .then(res => {
            console.log(res.data)
            if (res.data.status == 200) {
              this.lotteryCard = res.data.lotteryList
              this.sysDate = res.data.sysDate
              this.fullscreenLoading = false
            }
          })
          .catch(err => console.log(err))
      },
      onTimeOut(id){
        this.getList()
      }
    },
    watch: {
      screenWidth (val) {
        this.screenWidth = val
        if (val < 1300) {
          this.isShow = false
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all .8s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(-110px);
  }

  .lty_list {
    position: absolute;
    /*top: 10px;*/
    /*left: -210px;*/
    top: 76px;
    left: 0;
    z-index: 300;
    padding-left: 20px;
    /*background: url(../../../assets/image/sc_sidebar_mrbg.jpg) no-repeat 10px 0;*/
  }

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
