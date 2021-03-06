import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import api from '@/lib/api';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import titleMixin from '@/lib/titleMixin';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.prototype.$api = api;
Vue.use(BootstrapVue);
Vue.use(Vuelidate);

Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
