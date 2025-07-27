
<old_str>
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export default axiosInstance;
</old_str>
<new_str>
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export default axiosInstance;
</new_str>
