import { useReqresApi } from '../composables/useReqresApi';

const routes = [
    {
      path: '/',
      component: () => import('../pages/Users.vue')
    },
    {
      path: '/create-user',
      component: () => import('../pages/CreateUser.vue')
    },
    {
      path: '/edit-user/:userId',
      component: () => import('../pages/EditUser.vue'),
      beforeEnter: async (to) => {
        const { usersData, getUsers } = useReqresApi();

        if (!usersData.value) {
          await getUsers();
        }

        const user = usersData.value?.data.find(user => `${user.id}` == to.params.userId);

        if (user) return true
        // reject the navigation
        return false
      },
    },
];

export function getRoutes() {
    return routes;
}
