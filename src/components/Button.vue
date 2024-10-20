<template>
    <div class="custom-button">
        <button v-if="type === 'button'" class="button">
            <slot></slot>
        </button>

        <router-link v-else :to="path" class="button">
            <slot></slot>
        </router-link>

        <div v-if="disabled" class="disabled-block"></div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    type: 'button' | 'routerLink';
    path?: string;
    pill?: boolean;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    path: '',
    pill: false,
    disabled: false,
});

const borderRadius = computed(() => props.pill ? '20px' : '6px');
</script>

<style lang="scss" scoped>
.custom-button {
    position: relative;
}

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

.disabled-block {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    background-color: #00000050;
    border-radius: v-bind(borderRadius);
    cursor: not-allowed;
}
</style>
