
import { Box } from "@mui/material";
import FlashcardSetForm from "../../components/flash-card/FlashCardSetForm";
import { createFlashCard, createFlashCardList } from "../../config/api/flashcard/apiFlashcard";
import { IFlashCardList, IFlashcardListReq, IFlashcardReq } from "../../types/flashcard";

export default function CreateSet() {
    const newFlashCardSet: IFlashCardList = {
        _id: "",
        name: "",
        userId: "",
        __v: 0,
        flashcards: []
    }
    const handleSubmit = (flashcardList: IFlashCardList) => {
        const newFlashcardListReq: IFlashcardListReq = {
            name: flashcardList.name, // Copy giá trị từ flashcardList.name
        };
        let newListId: string = "";
        createFlashCardList(newFlashcardListReq).then(
            (res) => {
                newListId = res.data._id;
                flashcardList.flashcards.map(
                    (card) => {
                        const newFlashcard: IFlashcardReq = {
                            listId: newListId,
                            front: card.front,
                            back: card.back
                        }
                        createFlashCard(newFlashcard).then((res) => console.log(res));
                    }
                )

            }
        )
    }
    return (
        <>
            <Box sx={{ m: 5 }}>
                <FlashcardSetForm flashcardList={newFlashCardSet} isAdd={true} onSubmit={handleSubmit}></FlashcardSetForm>

            </Box>
        </>
    )
}