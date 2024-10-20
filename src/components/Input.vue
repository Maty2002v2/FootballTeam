<template>
    <div class="input-wrapper">
        <label :for="uuid" class="label">{{ label }}</label>
        <input
            v-model="model"
            type="text" 
            :placeholder="placeholder ?? ''"
            :id="uuid"
            class="input"
        >
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue';

const instance = getCurrentInstance();
const uuid = ref(`${instance?.uid}`);

const model = defineModel();

defineProps<{
    label: string;
    placeholder?: string;
}>();
</script>

<style lang="scss" scoped>
.input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    color: #494F62;
}

.label {
    color: #5A6175;
    font-size: 0.75rem;
    font-weight: 500;
}

.input {
    width: 100%;
    height: 30px;
    padding: 10px;
    border: 1px solid #D8DDE2;
    border-radius: 3px;
    box-sizing: border-box;
    color: #5A6175;
    background-color: transparent;
}
</style>
