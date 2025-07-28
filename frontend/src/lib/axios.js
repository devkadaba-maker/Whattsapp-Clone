
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cb378054-078b-4d30-a41a-2135c7a4caff-00-2uq7d29wzoour.picard.replit.dev/api',
  withCredentials: true,
});

export default axiosInstance;


