import Vue from 'vue';
import api from '@/lib/api';
import { BootstrapVue } from 'bootstrap-vue';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
