import { AxiosResponse } from "axios";
import AxiosClient from "../axios";

export const searchWord = async (word: string) => {
  const response: AxiosResponse = await AxiosClient.get(`/${word}`);
  if (response.status == 404) {
    return response.data;
  }
  if (response.status != 200) {
    throw new Error("Something went wrong");
  }
  return response;
};
