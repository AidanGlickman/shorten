import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Workspace from '../views/Workspace.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/workspace/:workspace',
    name: 'Workspace',
    component: Workspace,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const splitted = window.location.host.split('.');
  const domain = 'localhost';
  const workspacePage = 'Workspace';
  if (splitted.length > domain.split('.').length && to.name !== workspacePage) {
    next({
      name: 'Workspace',
      component: Workspace,
      params: { workspace: splitted[0] },
    });
  } else {
    next();
  }
});

export default router;
