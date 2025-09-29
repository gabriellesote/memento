import axios from 'axios';

const apiClient = axios.create({
  // Lê a URL da variável de ambiente
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;