<template>
    <div>
        <v-header></v-header>
        <router-view>
        </router-view>
        <v-foot></v-foot>
        <v-body></v-body>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import vBody from 'components/common/body_fixed';
import vFoot from 'components/footer/footer';
export default {
    components: { vHeader, vBody, vFoot },
}
</script>
<style scoped>
.main {
    width: 1000px !important;
    margin: 0 auto;
    overflow: hidden;
}
</style>
