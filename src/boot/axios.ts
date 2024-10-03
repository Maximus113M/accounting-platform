import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

//Change when platform is in relase
const baseUrl= 'http://127.0.0.1:8000/api';
const api = (accessToken: string, _headers: _headers | null = null) =>{

  const headers: _headers = {
    ContentType: _headers && _headers.ContentType ? _headers.ContentType  :'application/json',
    Authorization:'Bearer '+ accessToken,
    Accept: _headers && _headers.Accept ? _headers.Accept  :'application/json'
  }
  return axios.create({ baseURL: baseUrl,
    headers: headers
  });
}

type _headers = {
  ContentType?: string | null,
  Accept?: string | null,
  Authorization?: string | null,
}


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  //app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, baseUrl };
export type { _headers }
