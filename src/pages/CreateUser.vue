<template>
    <PageBox>
        <PageHeader>Add user</PageHeader>

        <div class="create-user">
            <Box class="create-user-box">
                <form class="form">
                    <div class="form__inputs">
                        <Input label="First Name"/>
                        <Input label="Last Name" />
                    </div>

                    <Button type="button" class="form__button">Create user</Button>
                </form>
            </Box>

            <Box class="create-user-box">
                <LoadAvatarTile />
            </Box>
        </div>
    </PageBox>
</template>

<script lang="ts" setup>
import PageBox from '../components/PageBox.vue';
import PageHeader from '../components/PageHeader.vue';
import Box from '../components/Box.vue';
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
import LoadAvatarTile from '../components/LoadAvatarTile.vue';
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
