import { ref } from 'vue';
import urlJoin from 'url-join';
import type { ListUsersApiResponse, User, UsersData } from '../types';

const reqresUrl = 'https://reqres.in/';
const usersEndpoint = urlJoin(reqresUrl, '/api/users');

export const useReqresApi = () => {
    const isError = ref<boolean>(false);

    const usersData = ref<UsersData>();

    const getUsers = async (page: number = 1, per_page: number = 4): Promise<void> => {
        isError.value = false;

        try {
            const response = await fetch(urlJoin(usersEndpoint, `?page=${page}&per_page=${per_page}`), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        
            const data = await response.json() as ListUsersApiResponse;

            usersData.value = data;
        } catch (error) {
            isError.value = true;
        }

    }

    const editUser = async (user: User): Promise<void> => {
        isError.value = false;
        
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
        }
    }

    const createUser = async (user: Omit<User, 'id' | 'email'>): Promise<void> => {
        isError.value = false;

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
        }
    }

    const deleteUser = async (userId: Pick<User, 'id'>): Promise<void> => {
        isError.value = false;

        try {
            const response = await fetch(`${usersEndpoint}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            
        } catch (error) {
            isError.value = true;
        }
    }
    
    return {
        usersData,
        isError,
        getUsers,
        editUser,
        createUser,
        deleteUser,
    }
}
