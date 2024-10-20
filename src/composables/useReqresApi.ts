import { ref } from 'vue';
import urlJoin from 'url-join';
import type { ListUsersApiResponse, User, UserApiResponse, UsersData } from '../types';
import mockUsersListData from '../helpers/mockUsersListData.json'

const reqresUrl = 'https://reqres.in/';
const usersEndpoint = urlJoin(reqresUrl, '/api/users');

const usersData = ref<UsersData>();

export const useReqresApi = () => {
    const isLoading = ref<boolean>(false);
    const isError = ref<boolean>(false);

    const getUsers = async (): Promise<void> => {
        if (usersData.value) return;

        isError.value = false;
        isLoading.value = true;

        try {
            //get all users
            const firstResponse = await fetch(usersEndpoint);
            const { total } = await firstResponse.json() as ListUsersApiResponse;

            const response = await fetch(urlJoin(usersEndpoint, `?per_page=${total}`), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        
            const data = await response.json() as ListUsersApiResponse;

            usersData.value = data;
        } catch (error) {
            isError.value = true;
            usersData.value = mockUsersListData;
        } finally {
            isLoading.value = false;
        }

    }

    const editUser = async (user: User): Promise<void> => {
        isError.value = false;
        isLoading.value = true;
        
        const copy = JSON.parse(JSON.stringify(user)); 
        if ('id' in copy) delete copy.id;

        try {
            const response = await fetch(`${usersEndpoint}/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(copy)
            });

            const data = await response.json() as UserApiResponse;

            const editedUserIndex = usersData.value?.data.findIndex(userData => userData.id === user.id);
            if (editedUserIndex == undefined || !usersData.value) return;

            usersData.value.data[editedUserIndex] = data;
        } catch (error) {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    }

    const createUser = async (user: Omit<User, 'id' | 'email'>): Promise<void> => {
        isError.value = false;
        isLoading.value = true;

        try {
            const response = await fetch(usersEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
        
            const data = await response.json() as UserApiResponse;
            usersData.value?.data.push(data);
        } catch (error) {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    }

    const deleteUser = async (userId: number): Promise<void> => {
        isError.value = false;
        isLoading.value = true;

        try {
            await fetch(`${usersEndpoint}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            const deletedUserIndex = usersData.value?.data.findIndex(user => user.id === userId);
            if (deletedUserIndex == undefined || !usersData.value) return;

            usersData.value.data.splice(deletedUserIndex, 1);
        } catch (error) {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    }
    
    return {
        usersData,
        isError,
        isLoading,
        getUsers,
        editUser,
        createUser,
        deleteUser,
    }
}
