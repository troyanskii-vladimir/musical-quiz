import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// import { StatusCodes } from 'http-status-codes';
import { ApiRoute, BACKEND_URL, REQUEST_TIMEOUT } from '../config';
import { getToken, saveToken } from './token';
import { AuthResponse } from '../types/auth-data';


// const StatusCodeMapping: Record<number, boolean> = {
//   [StatusCodes.BAD_REQUEST]: true,
//   [StatusCodes.UNAUTHORIZED]: true,
//   [StatusCodes.NOT_FOUND]: true,
// };


export const createApi = (): AxiosInstance => {
  const api = axios.create({
    withCredentials: true,
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }
  )

  api.interceptors.response.use((config: AxiosResponse) => {
      return config;
    }, async (error) => {
      const originalRequest = error.config;
      if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;

        try {
          const {data} = await axios.get<AuthResponse>(BACKEND_URL + ApiRoute.Refresh, {
            withCredentials: true,
          });
          saveToken(data.accessToken);
          return api.request(originalRequest);
        } catch (err) {
          console.log('Не авторизован');
        }
      }
      throw error;
    }
  )
  return api;
}

