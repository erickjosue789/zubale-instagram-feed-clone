import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://662029f13bf790e070af2cd8.mockapi.io/api/v1/',
  timeout: 5000,
});
