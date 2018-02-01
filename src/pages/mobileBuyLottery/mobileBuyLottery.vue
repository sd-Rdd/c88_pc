<template>
    <div>
        <v-header></v-header>
        <div class="shouji">
            <div class="main shouji_main" style=" width: 1282px !important; ">
                <div class="down_app">
                    <a href="#az" class="bg_btn az">
                        <img src="../../assets/image/AndroidDown.png" alt="">
                        <img src="../../assets/image/Android-200.png" class="qrImg" alt="">
                    </a>
                    <a href="#ap" class="bg_btn ap">
                        <img src="../../assets/image/iphoneDown.png" alt="">
                        <img src="../../assets/image/ios-200.png" style="width: 200px; height: 200px; margin-top: 20px;" alt="">
                    </a>
                </div>
                <!-- <div class="qr1">
                    <img src="https://cpweb.kosunmobile.com/c9.kosungames.com/upload/596f102ea5a00.png" alt="">
                </div>
                <div class="qr2">
                    <img src="https://cpweb.kosunmobile.com/c9.kosungames.com/upload/596f103f4f9c6.png" alt="">
                </div> -->
            </div>
        </div>
        <div class="anquan">
            <div class="anquan_main">
                <em class="qianbi">
                </em>
            </div>
        </div>
        <v-foot></v-foot>
        <v-body></v-body>
    </div>
</template>
<script>
import vHeader from 'components/header/header'
import vBody from 'components/common/body_fixed'
import vFoot from 'components/footer/footer'
export default {
    components: { vHeader, vBody, vFoot }
}
</script>
<style scoped>
.shouji {
    overflow: hidden;
    background: #FFBD5F
}

.shouji .shouji_main {
    overflow: hidden;
    background: url("../../assets/image/bg.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    height: 668px;
    position: relative
}

.main {
    margin: 0 auto;
}

.shouji .shouji_main .down_app {
    overflow: hidden;
    position: absolute;
    right: 62px;
    top: 250px
}

.shouji .shouji_main .down_app a {
    /*overflow: hidden;*/
    display: inline-block;
    width: 280px;
    height: 60px;
    text-align: center;
    margin-left: 20px
}

.shouji .shouji_main .down_app a img {
    width: 245px;
    height: 58px
}

.shouji .shouji_main .down_app a img.qrImg {
   width: 200px;
   height: 200px;
   margin-top: 20px;
}

.shouji .shouji_main .qr1 {
    overflow: hidden;
    position: absolute;
    right: 400px;
    top: 330px
}

.shouji .shouji_main .qr1 img {
    overflow: hidden;
    width: 200px;
    height: 200px
}

.shouji .shouji_main .qr2 {
    overflow: hidden;
    position: absolute;
    right: 100px;
    top: 330px
}

.shouji .shouji_main .qr2 img {
    overflow: hidden;
    width: 200px;
    height: 200px
}

.anquan {
    height: 70px;
    background: #E94335;
    padding-top: 19px
}

.anquan .anquan_main {
    margin: 0 auto;
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/shouji_b.png) center center;
    background-size: 1000px 56px;
    background-repeat: no-repeat;
    height: 56px;
    width: 1000px;
    position: relative
}

.anquan .anquan_main em {
    overflow: hidden
}

.anquan .anquan_main em.qianbi {
    overflow: hidden;
    display: block;
    background: url(https://cpweb.kosunmobile.com/c9/Public/static/images/qianbi_b.png);
    height: 61px;
    width: 77px;
    top: -42px;
    position: absolute;
    left: -60px;
    background-size: 77px 61px;
    background-repeat: no-repeat
}
</style>
