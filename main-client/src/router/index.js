import Vue from 'vue';
import VueRouter from 'vue-router';
import Me from '@/views/Me.vue';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Auth from '@/views/auth/Auth.vue';
import Verify from '@/views/auth/Verify.vue';
import Reset from '@/views/auth/Reset.vue';
import Edit from '@/views/Edit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
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
    path: '/me',
    name: 'Me',
    component: Me,
  },
  {
    path: '/edit/:code',
    name: 'Edit',
    component: Edit,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
