<template>
    <PageBox>
        <PageHeader>Users list</PageHeader>

        <div v-if="usersData && !isLoading">
            <UsersTable :usersData="usersData"/>
        </div>

        <SomethingWentWrong v-else-if="isError" />

        <Loader v-else />
    </PageBox>
</template>

<script lang="ts" setup>
import PageBox from '../components/atoms/PageBox.vue';
import PageHeader from '../components/atoms/PageHeader.vue';
import UsersTable from '../components/organisms/UsersTable.vue';
import Loader from '../components/atoms/Loader.vue';
import SomethingWentWrong from '../components/molecules/SomethingWentWrong.vue';
import { useReqresApi } from '../composables/useReqresApi';

const { usersData, isLoading, isError, getUsers } = useReqresApi();
getUsers();
</script>
