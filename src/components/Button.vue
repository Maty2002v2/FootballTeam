<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    pill?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
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
