<template>
    <div class="user_main">
        <div class="user_header">
            <div class="user_header_nav">
                <ul>
                    <slot name="nav">
                        <li class="hover" >
                            <a href="javascript:;">{{menu}}</a>
                        </li>
                    </slot>
                </ul>
            </div>
        </div>
        <div class="user_body">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>
export default {
  props: ["menu"]
};
</script>
<style lang="less" scoped>
.user_main {
  margin-top: 0px;
  clear: both;
  .user_header {
    margin-top: 0px;
    .user_header_nav {
      background: #F8F5F5;
      /*height: 40px;*/
      ul {
        overflow: hidden;
        background: #F8F5F5;
        li {
          float: left;
          overflow: hidden;
          border-right: 1px solid #E5E5E5;
          height: 50px;
          line-height: 50px;
          padding: 0 10px;
          font-size: 14px;
          color: #696969;
          &.hover {
              background: #fff;
              border-top: 5px solid #694D85;
          }
          a {
            color: #696969;
            text-decoration: none;
          }
        }
        &.hover {
          li {
            background: #fff;
          }
        }
      }
    }
  }
  .user_body {
    border: 1px solid #ddd;
    border-top: none;
    min-height: 487px;
    overflow: hidden;
    background: #fff;
  }
}
</style>
