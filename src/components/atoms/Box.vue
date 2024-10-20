<template>
    <div class="box">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.box {
    position: relative;
    padding: 20px;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #FFFFFF;
}
</style>
