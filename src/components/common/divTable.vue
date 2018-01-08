<template>
    <div class="bonusrecord_data">
        <slot name="head" class="thead"></slot>
        <slot name="body"></slot>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.bonusrecord_data {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    &>div {
        &>div+div {
            border-left: 1px solid #ddd;
        }
    }
    .thead>div,
    .tbody>div {
        display: flex;
        flex: 1;
        justify-content: center;
        box-sizing: border-box;
        padding: 8px;
    }
    .thead {
        background: #f4f4f4;
        display: flex;
        flex-direction: row;
        &>div {
            color: #666;
            font-size: 12px;
        }
    }
    .tbody {
        border-bottom: 1px solid #ddd;
        display: flex;
        flex-direction: row;
        &:nth-last-child(1) {
            border-bottom: none;
        }
        &>div {
            color: rgb(51, 51, 51);
            font-size: 14px;
        }
    }
}
</style>
