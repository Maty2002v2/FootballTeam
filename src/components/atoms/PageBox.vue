<template>
    <div class="page-box">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.page-box {
    position: relative;
    max-width: unset;
    width: 100vw;
    margin: 0px 20px;
    box-sizing: border-box;

    @include breakpoint(md) {
        max-width: 1600px;
    }
}
</style>
