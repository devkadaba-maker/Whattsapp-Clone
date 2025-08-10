import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? `${window.location.protocol}//${window.location.hostname}:5000/api` : "/api",
  withCredentials: true,
});