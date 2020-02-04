import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Users from '../views/admin/Users.vue';
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';
import Media from '../views/Media.vue';
import DbUsersTransfer from '../views/admin/dbDataTransfer/DbUsersTransfer.vue';

Vue.use(VueRouter);

export default function createRouter() {
  const routes = [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
    },
    {
      path: '/data-transfer',
      name: 'users-transfer',
      component: DbUsersTransfer,
    },
    {
      path: '/media',
      name: 'media',
      component: Media,
    },
  ];

  const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
  });

  return router;
}
