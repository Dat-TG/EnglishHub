import { AxiosResponse } from "axios";
import AxiosClient from "../chatgpt-client";
import { IGrammarCheckResult } from "../../../types/grammar";

export const checkGrammar = async (text: string) => {
  const response: AxiosResponse = await AxiosClient.post("/chat/completions", {
    messages: [
      {
        role: "user",
        content: `Find mistakes in this English paragraph. Answer in JSON format so that i can parse it and use in my app. Here is JSON format: \n interface IGrammarCheckResult { \n outputParagraph: string; \n mistakes: { \n description: string; \n shortDescription: string; \n wrongWord: string; \n replacement:string; \n }[]; \n } \n ouputParagraph is the paragraph after replace mistakes by replacements \n Answer mistakes results in ascending order of position offset in the paragraph \n Please answer correctly and in details! Thank you. \n Here is the paragraph: ${text}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
  });
  return JSON.parse(
    response.data.choices[0].message.content
  ) as IGrammarCheckResult;
};
