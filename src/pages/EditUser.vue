<template>
    <PageBox>
        <PageHeader>Edit user</PageHeader>

        <div class="edit-user">
            <Box class="create-user-box">
                <form v-if="!isLoading" class="form" @submit.prevent="update">
                    <div class="form__inputs">
                        <Input label="First Name" v-model="firstName" />
                        <Input label="Last Name" v-model="lastName" />
                    </div>

                    <Button type="button" :disabled="!canUpdateUser" class="form__button">Update Details</Button>
                </form>

                <Loader v-else />
            </Box>

            <Box class="create-user-box">
                <LoadAvatarTile>
                    <template #buttonText>
                        Edit Photo
                    </template>

                    <template #modalTitle>
                        Edit Photo
                    </template>
                </LoadAvatarTile>
            </Box>
        </div>
    </PageBox>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PageBox from '../components/PageBox.vue';
import PageHeader from '../components/PageHeader.vue';
import Box from '../components/Box.vue';
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
import LoadAvatarTile from '../components/LoadAvatarTile.vue';
import Loader from '../components/Loader.vue';
import { useLoadAvatarModal } from '../composables/Modals/useLoadAvatarModal';
import { useReqresApi } from '../composables/useReqresApi';
import type { User } from '../types';  

const { avatarLink } = useLoadAvatarModal();
const { isLoading, usersData, editUser } = useReqresApi();

const route = useRoute();
const user = usersData.value?.data.find(user => `${user.id}` == route.params.userId) as User;

const firstName = ref<string>(user.first_name);
const lastName = ref<string>(user.last_name);
avatarLink.value = user.avatar;

const canUpdateUser = computed(() => {
    return !!firstName.value && !!lastName.value && !!avatarLink.value
});

const router = useRouter();
const update = async () => {
    if (!canUpdateUser.value) return;

    await editUser({ 
        id: user.id,
        first_name: firstName.value as string, 
        last_name: lastName.value as string, 
        avatar: avatarLink.value as string,
        email: user.email
    });

    router.push('/')
}
</script>

<style lang="scss" scoped>
.edit-user {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;

    @include breakpoint(md) {
        grid-template-columns: 66% 33%;
    }

    &-box {
        padding-top: 60px;
    }
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    &__inputs {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;

        @include breakpoint(sm) {
            grid-template-columns: 1fr 1fr;
        }
    }

    &__button {
        width: fit-content;
        margin-top: 20px;
    }
}
</style>
