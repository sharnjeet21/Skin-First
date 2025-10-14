import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('beautyAppToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('beautyAppToken');
      localStorage.removeItem('beautyAppUser');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
};

// Quiz API calls
export const quizAPI = {
  saveResults: async (quizAnswers, recommendations) => {
    const response = await api.post('/quiz/save-results', {
      quizAnswers,
      recommendations,
    });
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/quiz/history');
    return response.data;
  },
};

// Favorites API calls
export const favoritesAPI = {
  add: async (product) => {
    const response = await api.post('/favorites/add', product);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;