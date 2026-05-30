import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
const API = axios.create({ baseURL: `${API_BASE_URL}/api` });

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('dyc_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginAdmin = (data) => API.post('/auth/login', data);

// Developers
export const getDevelopers = () => API.get('/developers');
export const createDeveloper = (formData) => API.post('/developers', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateDeveloper = (id, formData) => API.put(`/developers/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteDeveloper = (id) => API.delete(`/developers/${id}`);

// Services
export const getServices = () => API.get('/services');
export const getAllServicesAdmin = () => API.get('/services/all');
export const createService = (formData) => API.post('/services', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateService = (id, formData) => API.put(`/services/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteService = (id) => API.delete(`/services/${id}`);

// Contact
export const sendContactMessage = (data) => API.post('/contact', data);
