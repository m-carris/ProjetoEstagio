// ====================================================
// api.ts — Configuração do cliente HTTP
// ====================================================

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor — adiciona automaticamente o token a todos os pedidos
api.interceptors.request.use(function (config) {
  var token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default api;
