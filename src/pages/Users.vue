<template>
    <div v-if="usersData">
        <UsersTable :usersData="usersData" :freezingPagination="isLoading" @paginateUpdate="paginateAction"/>
    </div>
</template>

<script lang="ts" setup>
import UsersTable from '../components/UsersTable.vue';
import { useReqresApi } from '../composables/useReqresApi';
import type { Pagination } from '../types/index';

const { usersData, isLoading, getUsers } = useReqresApi();
getUsers(1);

const paginateAction = async (paginateOptions: Pagination) => {
    await getUsers(paginateOptions.currentPage);
}
</script>
