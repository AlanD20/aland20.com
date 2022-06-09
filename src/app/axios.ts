import config from '@config';
import axios from 'axios';


export default axios.create({
  baseURL: config.host,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  }
});
