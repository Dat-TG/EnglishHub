import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface IRequestAxios extends InternalAxiosRequestConfig {
  skipLoading?: boolean;
}

const onRequestConfig = (config: IRequestAxios) => {
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  config.timeout = 30000;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
};

const onResponseError = async (
  err: AxiosError
): Promise<AxiosError | undefined> => {
  return Promise.reject(err?.response?.data);
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequestConfig, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (err: AxiosError) =>
    onResponseError(err)
  );
};
