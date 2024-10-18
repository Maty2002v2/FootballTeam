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
      path: '/edit-user',
      component: () => import('../pages/EditUser.vue')
    },
];

export function getRoutes() {
    return routes;
}
