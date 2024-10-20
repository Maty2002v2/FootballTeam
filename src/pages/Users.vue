<template>
    <PageBox>
        <h1>Users list</h1>

        <div v-if="usersData && !isLoading">
            <UsersTable :usersData="usersData"/>
        </div>

        <Loader v-else />
    </PageBox>
</template>

<script lang="ts" setup>
import PageBox from '../components/PageBox.vue';
import UsersTable from '../components/UsersTable.vue';
import Loader from '../components/Loader.vue';
import { useReqresApi } from '../composables/useReqresApi';

const { usersData, isLoading, getUsers } = useReqresApi();
getUsers();
</script>
