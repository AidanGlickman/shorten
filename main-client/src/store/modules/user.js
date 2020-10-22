import jwtDecode from 'jwt-decode';
import api from '@/lib/api';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = () => ({
  username: '',
  email: '',
  token: '',
});

const getters = {
  isLoggedIn(state) {
    return Boolean(state.token);
  },
  isTokenExpired(state) {
    const currToken = state.token;
    const decoded = jwtDecode(currToken);
    const currentTime = new Date().getTime() / 1000;
    return currentTime > decoded.exp;
  },
};

const actions = {
  async login(context, user) {
    try {
      const res = await api.post('auth/login', {
        username: user.username,
        password: user.password,
        remember: (user.remember === 'true'),
      });
      context.commit('login', res.data);
      // return { success: true, data: res.data.user.username };
      return { success: true, data: res.data.user.username };
    } catch (err) {
      return { success: false, data: err.response.data };
    }
    // .then((response) => {
    //   context.commit('login', response.data);
    //   return { success: true };
    // }).catch((error) => ({ success: false, error: error.response.data }));
  },
  refreshToken(context) {
    api.post('/session/refresh').then((res) => {
      context.commit('updateToken', res.data);
      setTimeout(() => context.dispatch('refreshToken'), 780000);
      return true;
    }).catch(() => false);
  },
};

const mutations = {
  login(state, res) {
    state.username = res.user.username;
    state.email = res.user.email;
    state.token = res.token;
  },
  updateToken(state, res) {
    state.token = res.token;
    state.username = res.user.username;
    state.email = res.user.email;
  },
  logout(state) {
    state.token = '';
    state.username = '';
    state.email = '';
    api.post('/session/logout');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
