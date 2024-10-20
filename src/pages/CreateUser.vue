<template>
    <PageBox>
        <h1>Add user</h1>

        <div class="create-user">
            <Box class="create-user-box">
                <form class="form">
                    <div class="form__inputs">
                        <Input label="First Name"/>
                        <Input label="Last Name" />
                    </div>

                    <Button type="button">Create user</Button>
                </form>
            </Box>

            <Box class="create-user-box">
            </Box>
        </div>
    </PageBox>
</template>

<script lang="ts" setup>
import PageBox from '../components/PageBox.vue';
import Box from '../components/Box.vue';
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
</script>

<style lang="scss" scoped>
.create-user {
    display: grid;
    grid-template-columns: 66% 33%;
    gap: 30px;

    &-box {
        padding-top: 60px;
    }
}

.form {
    &__inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
    }
}
</style>
