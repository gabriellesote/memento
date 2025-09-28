// frontend/src/services/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Confirme se a porta do seu backend é esta
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;