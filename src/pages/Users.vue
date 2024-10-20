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
import PageBox from '../components/PageBox.vue';
import PageHeader from '../components/PageHeader.vue';
import UsersTable from '../components/UsersTable.vue';
import Loader from '../components/Loader.vue';
import SomethingWentWrong from '../components/SomethingWentWrong.vue';
import { useReqresApi } from '../composables/useReqresApi';

const { usersData, isLoading, isError, getUsers } = useReqresApi();
getUsers();
</script>
