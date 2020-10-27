import axios from 'axios';

export default axios.create({
  baseURL: `http://${process.env.VUE_APP_BASE_URL}/api`,
});
