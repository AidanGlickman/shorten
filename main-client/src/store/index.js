import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import user from './modules/user';

Vue.use(Vuex);

const vuexStore = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
  },
  plugins: [createPersistedState()],
});

api.interceptors.request.use((config) => {
  const newConfig = config;
  newConfig.headers.Authorization = `Bearer ${vuexStore.state.user.token}`;
  return newConfig;
});

api.interceptors.response.use((response) => response, (error) => {
  const status = error.response ? error.response.status : null;
  const newReq = error;
  if (status === 498) {
    if (Cookies.get('refresh')) {
      return vuexStore.dispatch('user/refreshToken').then(() => {
        newReq.config.baseURL = undefined;
        return api.request(newReq.config);
      }).catch((err) => {
        Promise.reject(err);
      });
    } vuexStore.commit('user/logout');
  }

  return Promise.reject(error);
});

export default vuexStore;
