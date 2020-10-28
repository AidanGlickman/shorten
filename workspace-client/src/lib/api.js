import axios from 'axios';

export default axios.create({
  baseURL: `https://${process.env.VUE_APP_BASE_URL}/api`,
});
