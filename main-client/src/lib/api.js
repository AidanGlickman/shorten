import axios from 'axios';

const [baseURL] = window.location.hostname.split('.').slice(-1);

const api = axios.create({
  baseURL: `http://${baseURL}/api`,
});

export default api;
