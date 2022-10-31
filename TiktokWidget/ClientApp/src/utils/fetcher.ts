import { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import config from 'config';

export const getAxiosInstance = (requireAuth?: boolean): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.apiUrl,
    timeout: 30 * 1000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // response parse
  instance.interceptors.response.use(
    (config: AxiosRequestConfig) => {
      // check login and add token header
      if (requireAuth) {
      }
      return config;
    },
    (error) => {
      console.warn('Error status', error.response.status);
      // return Promise.reject(error)
      if (error.response) {
        return error.response.data;
      } else {
        return Promise.reject(error);
      }
    },
  );

  // response parse
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.warn('Error status', error.response.status);
      // return Promise.reject(error)
      if (error.response) {
        return error.response.data;
      } else {
        return Promise.reject(error);
      }
    },
  );
  return instance;
};

let publicRequester: AxiosInstance;
let privateRequester: AxiosInstance;

function getInstance(isPrivate: boolean = false) {
  if (!publicRequester) {
    publicRequester = getAxiosInstance();
  }
  if (!privateRequester && isPrivate) {
    privateRequester = getAxiosInstance(true);
  }
  return {
    publicRequester,
    privateRequester,
  };
}

export const axiosInstance = getInstance().publicRequester;

export const privateInstance = getInstance(true).publicRequester;

const fetcher = (arg: any, ...args: any) => axiosInstance(arg, ...args);

export default fetcher;
