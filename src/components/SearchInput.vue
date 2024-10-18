<template>
    <div class="search">
        <input type="text" v-model="search" class="search__input" placeholder="Search for users...">
        <Search class="search__icon" color="#828691" />
    </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { refDebounced } from '@vueuse/core';
import { Search } from 'lucide-vue-next';

const emit = defineEmits(['update:modelValue']);

const search = defineModel<string | undefined>('search');
const searchDebounced = refDebounced(search, 500);

watch(() => searchDebounced.value, (value) => {
    emit('update:modelValue', value)
});
</script>

<style lang="scss" scoped>
.search {
    position: relative;
    width: 300px;

    &__input {
        width: 100%;
        padding: 10px;
        border: none;;
        border-radius: 6px;
        color: #828691;
        background-color: #F5F7F9;
        box-sizing: border-box;
    }

    &__icon {
        position: absolute;
        top: 50%;
        right: 20px;
        width: 20px;
        height: 20px;
        transform: translate(-50%, -50%);
    }
}
</style>
