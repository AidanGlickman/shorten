import jwtDecode from 'jwt-decode';
import api from '../../lib/api';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = () => ({
  username: '',
  email: '',
  token: '',
});

const getters = {
  isLoggedIn(state) {
    if (state.token) {
      return state;
    }
    return false;
  },
  isTokenExpired(state) {
    const currToken = state.token;
    const decoded = jwtDecode(currToken);
    const currentTime = new Date().getTime() / 1000;
    return currentTime > decoded.exp;
  },
};

const actions = {
  login(context, user) {
    api.post('auth/login', {
      username: user.username,
      password: user.password,
      remember: (user.remember === 'true'),
    }).then((response) => {
      context.commit('login', response.data);
    }).catch((error) => console.log(error.response.data));
  },
  refreshToken(context) {
    api.post('/session/refresh').then((res) => {
      context.commit('updateToken', res.data.token);
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
  updateToken(state, token) {
    state.token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
