import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:2004' }); //https://artisserv.galpodlipnik.com

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchPresets = () => API.get('/dimensions');
export const createPreset = (newPreset) => API.post('/dimensions', newPreset);
export const deletePreset = (id) => API.delete(`/dimensions/${id}`);

export const fetchImages = (page) => API.get(`/cloud/${page}`);
export const createImage = (newImage) => API.post('/cloud', newImage);
export const deleteImage = (id) => API.delete(`/cloud/${id}`);

export const fetchPublicImages = (page) => API.get(`/public/${page}`);
export const createPublicImage = (cloudImageId) => API.post('/public', { cloudImageId });
export const updatePublicImage = (id, newLikes) => API.put(`/public/${id}`, { likes: newLikes });
export const deletePublicImage = (cloudId) => API.delete(`/public/${cloudId}`);

export const dbStatus = () => API.get('/status/db');
export const serverStatus = () => API.get('/status/server');
export const userStats = (id) => API.get(`/status/user/${id}`);
