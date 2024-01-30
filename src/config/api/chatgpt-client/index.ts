import axios from "axios";
import { setupInterceptors } from "./interceptor";

const AxiosClient = axios.create({
  baseURL: "https://api.openai.com/v1",
});

setupInterceptors(AxiosClient);

export default AxiosClient;
