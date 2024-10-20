<template>
    <div class="load-avatar-tile">
        <AvatarImage :path="avatarLink" width="140px" height="140px" />

        <button class="load-avatar-tile__button" @click="openLoadAvatarModal">
            <slot name="buttonContent">
                <Camera />
                <slot name="buttonText">Add Photo</slot>
            </slot>
        </button>
    </div>

    <teleport to='#modals'>
        <LoadAvatarModal>
            <template #modalTitle>
                <slot name="modalTitle"></slot>
            </template>
    </LoadAvatarModal>
    </teleport>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { Camera } from 'lucide-vue-next';
import AvatarImage from './AvatarImage.vue';
import LoadAvatarModal from './LoadAvatarModal.vue';
import { useLoadAvatarModal } from '../composables/Modals/useLoadAvatarModal';

interface Props {
    path?: string;
}

withDefaults(defineProps<Props>(), {
    path: '',
});

const { avatarLink, openLoadAvatarModal } = useLoadAvatarModal();

onUnmounted(() => {
    avatarLink.value = undefined;
})
</script>

<style lang="scss" scoped>
.load-avatar-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;

    &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 40px;
        padding: 8px;
        border: 1px solid #494F62;
        border-radius: 3px;
        text-align: center;

        color: #494F62;
        font-size: 12px;

        background-color: transparent;

        transition: all 0.25s;

        cursor: pointer;

        &:hover {
            color: #ffffff;
            background-color: #494F62;
        }
    }
}
</style>
