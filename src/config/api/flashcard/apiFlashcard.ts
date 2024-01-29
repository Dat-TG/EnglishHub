import { IFlashcardListReq, IFlashcardReq } from "../../../types/flashcard";
import AxiosClient from "../base-client";

export const createFlashCard = async (data: IFlashcardReq) => {
    const res = await AxiosClient.post("/flashcard", data);
    return res.data;
};

export const deleteFlashCard = async (id : string) => {
    const res = await AxiosClient.delete(`/flashcard/card/${id}`);
    return res.data;
};

export const createFlashCardList = async (data: IFlashcardListReq) => {
    const res = await AxiosClient.post("/flashcard/list", data);
    return res.data;
};

export const getFlashCardListById = async (id: string) => {
    const res = await AxiosClient.get(`/flashcard/list/${id}`);
    return res.data;
};

export const updateFlashCardList = async (id: string, name : string) => {
    const res = await AxiosClient.patch(`/flashcard/list/${id}`, {name} );
    return res;
}


export const deleteFlashCardList = async (id: string) => {
    const res = await AxiosClient.delete(`/flashcard/list/${id}`);
    return res;
}