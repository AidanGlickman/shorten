import Vue from 'vue';
import Vuex from 'vuex';
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
});

api.interceptors.response.use((response) => response, (error) => {
  const status = error.response ? error.response.status : null;
  const newReq = error;
  if (status === 498) {
    return vuexStore.dispatch('user/refreshToken').then(() => {
      newReq.config.headers.Authorization = `Bearer ${vuexStore.state.user.token}`;
      newReq.config.baseURL = undefined;
      return api.request(newReq.config);
    });
  }

  return Promise.reject(error);
});

export default vuexStore;
