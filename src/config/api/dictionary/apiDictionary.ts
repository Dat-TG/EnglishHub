import { IWord, IWordNotFound } from "../../../types/dictionary";
import AxiosClient from "../axios";

export const searchWord = async (word: string) => {
  const response = await AxiosClient.get(`/${word}`);
  if (response.status == 404) {
    return response.data as IWordNotFound;
  }
  if (response.status != 200) {
    throw new Error("Something went wrong");
  }
  return response.data[0] as IWord;
};
