import axios from 'axios';

const accessToken = window.sessionStorage.getItem('token');
// console.log(accessToken);

const apiClient = axios.create({
  baseURL: 'http://api.kiki-bus.com:8081/v1',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

export default apiClient;
