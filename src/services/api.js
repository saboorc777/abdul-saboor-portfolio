import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Attach the admin JWT (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token has expired/is invalid, bounce back to admin login.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const projectsApi = {
  list: () => api.get('/projects'),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  remove: (id) => api.delete(`/projects/${id}`),
  uploadImage: (formData) =>
    api.post('/projects/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const certificatesApi = {
  list: () => api.get('/certificates'),
  create: (data) => api.post('/certificates', data),
  update: (id, data) => api.put(`/certificates/${id}`, data),
  remove: (id) => api.delete(`/certificates/${id}`),
  uploadImage: (formData) =>
    api.post('/certificates/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const profileApi = {
  get: () => api.get('/profile'),
  uploadPhoto: (formData) =>
    api.post('/profile/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export default api;
