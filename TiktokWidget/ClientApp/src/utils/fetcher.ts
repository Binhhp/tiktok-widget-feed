import { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { RootURL } from 'common/constants/RootURL';

export const getAxiosInstance = (
  requireAuth?: boolean,
  notTimeZone?: boolean,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: RootURL.ApiBase,
    timeout: 30 * 1000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!notTimeZone && localStorage.getItem('timezone')) {
    instance.defaults.headers.common['tz'] = `${localStorage.getItem(
      'timezone',
    )}`;
  }

  // response parse
  instance.interceptors.request.use(
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
      return response.data;
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

function getInstance(isPrivate: boolean = false, notTimeZone: boolean = false) {
  if (!publicRequester) {
    publicRequester = getAxiosInstance(isPrivate, notTimeZone);
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
export const axiosInstanceV2 = getInstance(false, true).publicRequester;

export const privateInstance = getInstance(true).publicRequester;

const fetcher = (arg: any, ...args: any) => axiosInstance(arg, ...args);

export default fetcher;
