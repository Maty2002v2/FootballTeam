import { ref } from 'vue';
import urlJoin from 'url-join';
import type { ListUsersApiResponse, User, UsersData } from '../types';

const reqresUrl = 'https://reqres.in/';
const usersEndpoint = urlJoin(reqresUrl, '/api/users');

export const useReqresApi = () => {
    const isLoading = ref<boolean>(false);
    const isError = ref<boolean>(false);

    const usersData = ref<UsersData>();

    const getUsers = async (): Promise<void> => {
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
        
            
        } catch (error) {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    }

    const deleteUser = async (userId: Pick<User, 'id'>): Promise<void> => {
        isError.value = false;
        isLoading.value = true;

        try {
            const response = await fetch(`${usersEndpoint}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            
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
