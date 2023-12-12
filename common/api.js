// api.js

import axios from 'axios';
import { APP_URL } from './config';

const baseURL = APP_URL || 'https://equivoyage.vercel.app';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Add any global request headers here

    // Handle authorization if needed
    const isAuthorized = config.isAuthorized !== undefined ? config.isAuthorized : true;

    if (isAuthorized) {
      const accessToken = sessionStorage.getItem('access_token');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        // Handle unauthorized request
        return Promise.reject(new Error('User is not authorized'));
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Common function for handling API requests
const handleRequest = async (method, url, data) => {
  try {
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// Export methods for common CRUD operations
export const get = (url, isAuthorized = true) => handleRequest('get', url, { isAuthorized });
export const post = (url, data, isAuthorized = true) => handleRequest('post', url, data, { isAuthorized });
export const put = (url, data, isAuthorized = true) => handleRequest('put', url, data, { isAuthorized });
export const patch = (url, data, isAuthorized = true) => handleRequest('patch', url, data, { isAuthorized });
export const remove = (url, isAuthorized = true) => handleRequest('delete', url, { isAuthorized });
