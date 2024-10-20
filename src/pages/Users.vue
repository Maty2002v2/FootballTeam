<template>
    <div v-if="usersData && !isLoading">
        <UsersTable :usersData="usersData"/>
    </div>

    <Loader v-else />
</template>

<script lang="ts" setup>
import UsersTable from '../components/UsersTable.vue';
import Loader from '../components/Loader.vue';
import { useReqresApi } from '../composables/useReqresApi';

const { usersData, isLoading, getUsers } = useReqresApi();
getUsers();
</script>
