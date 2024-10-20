<template>
    <div class="something-went-wrong">
        <Bug :size="60" />

        <h2 class="header">Opss.. Something went wrong</h2>

        <slot name="actions">
            <Button v-if="tryAgainFunction" type="button" @click="tryAgainFunction">
                <slot name="buttonText">Try Again</slot>
            </Button>
        </slot>
    </div>
</template>

<script lang="ts" setup>
import { Bug } from 'lucide-vue-next';
import Button from './Button.vue';

defineProps<{
    tryAgainFunction?: () => void
}>();
</script>

<style lang="scss" scoped>
.something-went-wrong {
    position: absolute;
    top: 50%;
    left: 50%;

    display: flex;
    flex-direction: column;
    place-items: center;
    gap: 20px;

    color: #494F62;

    transform: translate(-50%, -50%);

    .header {
        font-weight: 400;
    }
}
</style>
