<template>
    <button v-if="type === 'button'" class="button">
        <slot></slot>
    </button>

    <router-link v-else :to="path" class="button">
        <slot></slot>
    </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    type: 'button' | 'routerLink';
    path?: string;
    pill?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    path: '',
    pill: false,
});

const borderRadius = computed(() => props.pill ? '20px' : '6px');
</script>

<style lang="scss" scoped>
.button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 10px;
    border-radius: v-bind(borderRadius);

    color: #ffffff;
    font-size: 13px;

    background-color: #459571;
} 
</style>
