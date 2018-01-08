<template>
    <div class="container">
        <v-header></v-header>
        <v-body></v-body>
        <!-- 上部分 -->
        <div class="main index">
            <div class="index_main">
                <div class="slide">
                    <index_1 ></index_1>
                </div>
                <index_2></index_2>
                <div class="index_box_tz">
                    <div class="left tz_box">
                        <index_3></index_3>
                    </div>
                    <div class="right down_mobile_app">
                        <index_4></index_4>
                    </div>
                </div>
            </div>
        </div>
        <!-- 下半部分 -->
        <div class="index">
            <div class="index_box_main main">
                <div class="left kj">
                    <index_5></index_5>
                </div>
                <div class="left news">
                    <index_6></index_6>
                </div>
                <div class="left phb">
                    <index_7></index_7>
                </div>
            </div>
        </div>
        <v-foot></v-foot>
    </div>
</template>
<script>
import index_1 from './children/index_1';
import index_2 from './children/index_2';
import index_3 from './children/index_3';
import index_4 from './children/index_4';
import index_5 from './children/index_5';
import index_6 from './children/index_6';
import index_7 from './children/index_7';
import vHeader from 'components/header/header'
import vBody from 'components/common/body_fixed'
import vFoot from 'components/footer/footer'
export default {
    components: { index_1, index_2, index_3, index_4, index_5, index_6, index_7, vHeader, vBody, vFoot },
    data() {
        return {
           
        }
    },
}
</script>
<style scoped>
.main {
    width: 1000px !important;
    margin: 0 auto;
    overflow: hidden;
}

.index .index_main {
    height: 563px;
    padding-left: 258px;
}

.index .index_main .slide {
    overflow: hidden;
    width: 740px;
    height: 230px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.index .index_main .index_box_tz {
    overflow: hidden;
    margin-top: 10px;
}

.index .index_main .index_box_tz .tz_box {
    overflow: hidden;
    width: 493px;
    height: 272px;
    border: 1px solid #ddd;
}

.left {
    overflow: hidden;
    float: left;
}

.right {
    overflow: hidden;
    float: right;
}

.index .index_main .index_box_tz .down_mobile_app {
    overflow: hidden;
    width: 240px;
    height: 271px;
    border: 1px solid #ddd;
}

.index .index_box_main {
    overflow: hidden;
    margin-bottom: 20px;
}

.index .index_box_main .kj {
    overflow: hidden;
    width: 248px;
    margin-right: 10px;
}

.index .index_box_main .news {
    overflow: hidden;
    width: 495px;
}

.index .index_box_main .phb {
    overflow: hidden;
    width: 241px;
    margin-left: 6px;
    padding-bottom: 2px;
}
</style>
