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
      beforeEnter: async (to, from, next) => {
        const { usersData, getUsers } = useReqresApi();

        if (!usersData.value) {
          await getUsers();
        }

        const user = usersData.value?.data.find(user => `${user.id}` == to.params.userId);

        if (user) next();
        // reject the navigation
        else next({ name: 'NotFound' })
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/NotFound.vue'),
    },
];

export function getRoutes() {
    return routes;
}
