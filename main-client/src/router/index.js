import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/auth/Auth.vue';
import Verify from '../views/auth/Verify.vue';
import Reset from '../views/auth/Reset.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Auth,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Auth,
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify,
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset,
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Auth,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
