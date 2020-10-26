import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
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
  console.log(newReq);
  if (status === 498) {
    return vuexStore.dispatch('user/refreshToken').then(() => {
      newReq.config.headers.Authorization = `Bearer ${vuexStore.state.user.token}`;
      newReq.config.baseURL = undefined;
      return api.request(newReq.config);
    }).catch((err) => {
      Promise.reject(err);
    });
  }

  return Promise.reject(error);
});

export default vuexStore;
