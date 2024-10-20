<template>
    <img :src="imgSrc" alt="user avatar" class="avatar" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import EmptyAvatar from '../../assets/EmptyAvatar.png'

interface Props {
    path?: string;
    width?: string;
    height?: string;
}

const props = withDefaults(defineProps<Props>(), {
    path: '',
    width: '100%',
    height: '100%'
});

const imgSrc = computed(() => props.path.length ? props.path : EmptyAvatar);
</script>

<style lang="scss" scoped>
.avatar {
    width: v-bind(width);
    height: v-bind(height);
    border-radius: 50%;
}
</style>
