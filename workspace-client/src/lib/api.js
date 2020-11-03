import axios from 'axios';

export default axios.create({
  baseURL: `http${proces.env.NODE_ENV === 'production' ? 's' : ''}://${process.env.VUE_APP_BASE_URL}/api`,
});
