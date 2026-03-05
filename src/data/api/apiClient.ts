import axios from 'axios';

// Radio Browser API uses DNS round-robin — this is the recommended base URL
const BASE_URL = 'https://de1.api.radio-browser.info/json';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'RadioXMobile/1.0',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (__DEV__) {
      console.error('[API Error]', error?.message);
    }
    return Promise.reject(error);
  }
);
