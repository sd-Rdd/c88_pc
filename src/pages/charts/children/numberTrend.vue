<template>
  <div>
    <v-header>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam cumque delectus dolore eaque excepturi explicabo incidunt laboriosam maiores maxime, nulla provident quisquam quos reiciendis repudiandae, sequi similique sit veritatis!</v-header>
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
