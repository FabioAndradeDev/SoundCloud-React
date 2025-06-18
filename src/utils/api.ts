import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Você pode adicionar interceptors aqui para lidar com tokens de autenticação, se necessário.
// Exemplo:
// api.interceptors.request.use(async config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api; 