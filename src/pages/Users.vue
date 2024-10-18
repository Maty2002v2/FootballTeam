<template>
    <div>
        <UsersTable :users="users" />
    </div>
</template>

<script lang="ts" setup>
import UsersTable from '../components/UsersTable.vue';
import { useReqresApi } from '../composables/useReqresApi';

const { users, getUsers } = useReqresApi();
getUsers(1);
</script>
