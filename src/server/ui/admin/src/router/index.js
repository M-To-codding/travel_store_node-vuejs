import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Users from '../views/Users.vue';

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
  ];

  const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
  });

  return router;
}
