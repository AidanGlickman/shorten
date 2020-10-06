import Vue from 'vue';
import api from '@/lib/api';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
