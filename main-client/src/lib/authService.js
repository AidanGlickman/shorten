import store from '@/store';
import api from './api';

const authService = {
  login(user) {
    return api.post('auth/login', {
      username: user.username,
      password: user.password,
    }).then((response) => {
      store.dispatch('login', response.data);
    }).catch((error) => error.response.data);
  },

};

export default authService;
