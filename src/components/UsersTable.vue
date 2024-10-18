<template>
    <div v-if="users.length" class="wrapper">
        <SearchInput v-model="search" />

        <div class="table">
            
            <div class="table_row">
                <div class="table_header table__cell"></div>
                <div class="table_header table__cell">Full Name</div>
                <div class="table_header table__cell">Actions</div>
            </div>

            <div v-for="user in filteredUsers" :key="user.id" class="table_row">
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
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { FilePenLine, Trash } from 'lucide-vue-next';
import SearchInput from './SearchInput.vue';
import type { User } from '../types';

const props = defineProps<{
    users: User[]
}>();

const search = ref<string | undefined>();

const filteredUsers = computed(() => {
    if (!search.value) return props.users;

    const searchedUsers = props.users.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`;

        return fullName.toLowerCase().includes(search.value!.toLowerCase())
    });

    return searchedUsers;
});
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 0px 10px;
    padding: 20px;
    // box-shadow: ;
    border-radius: 6px;
    background-color: #FFFFFF;
    
    @include breakpoint(md) {
        width: 1135px;
        max-width: 95vw;
        margin: 0;
    }
}

.table {
    color: #494F62;
    max-width: 100vw;
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
</style>
