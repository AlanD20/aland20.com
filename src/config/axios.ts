import config from '@/config/app';
import axios from 'axios';

export default axios.create({
  baseURL: config.host,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
