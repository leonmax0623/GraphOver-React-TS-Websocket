import axios from 'axios';
import { authAPI } from './auth-api';

const BACKEND_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_BACKEND_URL_LOCAL;

export const BASE_URL = '/' + BACKEND_URL;

const $auth = axios.create({
  baseURL: BACKEND_URL,
});

export function createClient(config) {
  return axios.create({
    baseURL: `${BACKEND_URL}`,
    headers: {
      ...config?.headers,
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  });
}

export const ApiClient = createClient();

ApiClient.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && accessToken !== 'null') {
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const onResponseError = async error => {
  const originalRequest = error.config;

  if (error.response) {
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (originalRequest.url.search('refresh') === -1) {
        await refreshAuth();
        return ApiClient(originalRequest);
      } else {
        localStorage.setItem('access_token', null);
        localStorage.setItem('refresh_token', null);
      }
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    }
    if (error.response?.status === 404) {
      // window.location = '/';
    }
  }
  return Promise.reject(error);
};

ApiClient.interceptors.response.use(
  res => res,
  e => onResponseError(e),
);

$auth.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  return config;
});

export { $auth };

export const refreshAuth = async () => {
  // localStorage.setItem('refresh_token')
  localStorage.setItem('access_token', null);
  const refresh_token = localStorage.getItem('refresh_token');
  if (JSON.parse(refresh_token) !== null) {
    try {
      const { data } = await authAPI.refresh(JSON.parse(refresh_token));
      localStorage.setItem('access_token', JSON.stringify(data.access));
      // window.location.reload();
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 401) {
      }
      localStorage.setItem('refresh_token', null);
      // window.location.reload();
    }
  }
};
