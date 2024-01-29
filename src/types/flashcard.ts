
export interface IFlashcard {
  _id: string;
  listId: string;
  userId: string;
  front: string;
  back: string;
  __v: number;
}

export interface IFlashCardList {
    _id: string;
    userId: string;
    name: string;
    flashcards: IFlashcard[];
    __v: number;
}

export interface IFlashcardReq {
  listId: string;
  front: string;
  back: string;
}

export interface IFlashcardListReq {
  name : string;
}