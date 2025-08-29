import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
});

// Interceptor để thêm token vào headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    register: (userData) => api.post('/register', userData),
    login: (userData) => api.post('/login', userData),
    forgotPassword: (data) => api.post('/forgot-password', data),
    getHome: () => api.get('/home'),
};

export default api;