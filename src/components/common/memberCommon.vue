<template>
    <div class="user_main">
        <div class="user_header">
            <div class="user_header_nav">
                <ul>
                    <slot name="nav">
                        <li class="hover">
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
      background: #fa5a1c;
      height: 40px;
      ul {
        overflow: hidden;
        li {
          float: left;
          font-size: 1rem;
          overflow: hidden;
          padding-top: 4px;
          margin-left: 4px;
          &.hover {
            a {
              background: #fff;
              color: #fa5a1c;
            }
          }
          &:hover {
            a {
              background: #fff;
              color: #fa5a1c;
            }
          }
          a {
            color: #fff;
            text-decoration: none;
            display: block;
            line-height: 36px;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      }
    }
  }
  .user_body {
    border: 1px solid #ddd;
    border-top: none;
    overflow: hidden;
  }
}
</style>
