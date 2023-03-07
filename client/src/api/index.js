import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const signIn = () => API.get('/user/signin');
export const signUp = () => API.get('/user/signup');

export const dbStatus = () => API.get('/status/db');
export const serverStatus = () => API.get('/status/server');
