<template>
    <div v-if="usersData">
        <UsersTable :usersData="usersData"/>
    </div>
</template>

<script lang="ts" setup>
import UsersTable from '../components/UsersTable.vue';
import { useReqresApi } from '../composables/useReqresApi';

const { usersData, getUsers } = useReqresApi();
getUsers();
</script>
