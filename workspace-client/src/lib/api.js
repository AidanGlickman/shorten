import axios from 'axios';

const [baseURL] = window.location.hostname.split('.').slice(-1);

export default axios.create({
  baseURL: `http://${baseURL}/api`,
});
