<template>
    <Box v-if="usersData.data.length" class="users-table">
        <div class="header-actions">
            <SearchInput v-model="search" placeholder="Search for users..."  />
            <Button type="routerLink" path="/create-user" :pill="true"><Plus :size="18" /> Add user</Button>
        </div>

        <div class="table">
            <div class="table_row">
                <div class="table_header table__cell"></div>
                <div class="table_header table__cell">Full Name</div>
                <div class="table_header table__cell">Actions</div>
            </div>

            <div v-for="user in filteredUsers.slice(pagination?.startIndex, (pagination?.endIndex ?? 0) + 1)" :key="user.id" class="table_row">
                <div class="table__cell">
                    <img :src="user.avatar" alt="User avatar" class="table__cell-avatar">
                </div>
                <div class="table__cell">{{ user.first_name + user.last_name }}</div>
                <div class="table__cell table__actions">
                    <FilePenLine class="table__icon" color="#ABB2BA"/>
                    <Trash class="table__icon" color="#ABB2BA"/>
                </div>
            </div>
        </div>
    </Box>

    <Pagination 
        class="pagination"
        :totalItems="filteredUsers.length"
        @setPaginate="(paginationOptions) => pagination = paginationOptions"
    />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Plus, FilePenLine, Trash } from 'lucide-vue-next';
import Box from './Box.vue';
import SearchInput from './SearchInput.vue';
import Pagination from './Pagination.vue';
import Button from './Button.vue';
import type { UsersData, Pagination as PaginationOptions  } from '../types';

const props = defineProps<{
    usersData: UsersData,
}>();

const search = ref<string | undefined>();

const pagination = ref<PaginationOptions | undefined>();

const filteredUsers = computed(() => {
    if (!search.value) return props.usersData.data;

    const searchedUsers = props.usersData.data.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`;

        return fullName.toLowerCase().includes(search.value!.toLowerCase())
    });

    return searchedUsers;
});
</script>

<style lang="scss" scoped>
.header-actions {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 20px;
    margin-bottom: 20px;

    @include breakpoint(md) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .search {
        width: 100%;

        @include breakpoint(md) {
            max-width: 300px;
        }
    }
}

.table {
    color: #494F62;
    overflow-x: scroll;

    @include breakpoint(md) {
        max-width: unset;
        overflow-x: auto;
    }
    
    &_row {
        display: grid;
        grid-template-columns: 80px 400px 70px;
        text-align: start;
        
        @include breakpoint(md) {
            grid-template-columns: 40px 1fr 70px; 
            gap: 40px;
        }

        &:nth-child(even) {
            background-color: #F5F7F9;
        }
    }

    &_header {
        font-weight: 700;
    }

    &__cell {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: inherit;

        &-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    &__actions {
        display: flex;
        gap: 10px;
    }

    &__icon {
        cursor: pointer;
        width: 20px;
        height: 20px;
    }
}

.pagination {
    margin-top: 20px;
}
</style>
