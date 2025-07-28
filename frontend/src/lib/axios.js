
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : `https://${window.location.hostname.split('.')[0]}.replit.dev/api`,
  withCredentials: true,
});

export default axiosInstance;
