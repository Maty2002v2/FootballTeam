<template>
    <PageBox>
        <PageHeader>Add user</PageHeader>

        <div class="create-user">
            <Box class="create-user-box">
                <form v-if="!isLoading" class="form" @submit.prevent="create">
                    <div class="form__inputs">
                        <Input label="First Name" v-model="firstName" />
                        <Input label="Last Name" v-model="lastName" />
                    </div>
                    
                    <Button type="button" :disabled="!canCreateUser" class="form__button">Create user</Button>
                </form>

                <Loader v-else />
            </Box>

            <Box class="create-user-box">
                <LoadAvatarTile />
            </Box>
        </div>
    </PageBox>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import PageBox from '../components/PageBox.vue';
import PageHeader from '../components/PageHeader.vue';
import Box from '../components/Box.vue';
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
import LoadAvatarTile from '../components/LoadAvatarTile.vue';
import Loader from '../components/Loader.vue';
import { useLoadAvatarModal } from '../composables/Modals/useLoadAvatarModal';
import { useReqresApi } from '../composables/useReqresApi';

const { avatarLink } = useLoadAvatarModal();
const { isLoading, createUser } = useReqresApi();

const firstName = ref<string | undefined>();
const lastName = ref<string | undefined>();

const canCreateUser = computed(() => {
    return !!firstName.value && !!lastName.value && !!avatarLink.value
});

const router = useRouter();
const create = async () => {
    if (!canCreateUser.value) return;

    await createUser({ 
        first_name: firstName.value as string, 
        last_name: lastName.value as string, 
        avatar: avatarLink.value as string
    });

    router.push('/')
}
</script>

<style lang="scss" scoped>
.create-user {
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
