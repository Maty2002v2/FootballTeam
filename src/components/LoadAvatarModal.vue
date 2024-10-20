<template>
    <Modal :showModal="loadAvatarModalState" @closeModal="closeLoadAvatarModal" @saveAction="saveAction">
        <template #title>
            Add Photo
        </template>

        <template #content>
            <Input label="Enter link photo" v-model="dirtyLink" />

            <p v-show="showError" class="error-message">Bad link to the avatar, provide e.g. <span class="link">https://reqres.in/img/faces/1-image.jpg</span></p>
        </template>
    </Modal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Modal from './Modal.vue';
import Input from './Input.vue';
import { useLoadAvatarModal } from '../composables/Modals/useLoadAvatarModal';

const dirtyLink = ref<string | undefined>();
const showError = ref(false);

const { avatarLink, loadAvatarModalState, closeLoadAvatarModal, isVlidAvatarLink } = useLoadAvatarModal();
watch(loadAvatarModalState, (newValue) => {
    if (!newValue) return;

    showError.value = false;
});

const saveAction = () => {
    if (!isVlidAvatarLink(dirtyLink.value ?? '')) {
        showError.value = true;
        return;
    };

    avatarLink.value = dirtyLink.value;
    closeLoadAvatarModal();
}
</script>

<style lang="scss" scoped>
.error-message {
    margin-top: 20px;
    color: rgb(250, 67, 67);
    font-size: 12px;

    .link {
        color: #494F62;
    }
}
</style>
