import axios from "axios";
import { setupInterceptors } from "./interceptor";

const AxiosClient = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en",
  headers: {
    Accept: "application/json",
  },
});

setupInterceptors(AxiosClient);

export default AxiosClient;
