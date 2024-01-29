
import { useParams } from "react-router-dom";
import FlashcardSetForm from "../../components/flash-card/FlashCardSetForm";
import { createFlashCard, deleteFlashCard, getFlashCardListById, updateFlashCardList } from "../../config/api/flashcard/apiFlashcard";
import { IFlashCardList, IFlashcardReq } from "../../types/flashcard";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function EditSet() {
  const { ListId } = useParams();

  const [flashCardList, setFlashCardList] = useState<IFlashCardList>();

  useEffect(() => {

    if (ListId) {
      getFlashCardListById(ListId).then(
        (res) => {
          setFlashCardList(res);
          console.log(res);
        }
      )
    }
  }, [ListId]);


  const handleSubmit = async (newFlashcardList: IFlashCardList) => {
    console.log(flashCardList);
    console.log(newFlashcardList);

    try {
      // Nếu tên của flashCardList đã thay đổi, thực hiện cập nhật
      if (flashCardList?.name !== newFlashcardList.name) {
        await updateFlashCardList(newFlashcardList._id, newFlashcardList.name);
      }

      if (flashCardList) {
        await Promise.all(
          flashCardList.flashcards.map((card) => deleteFlashCard(card._id))
        );
      }

      await Promise.all(
        newFlashcardList.flashcards.map((card) =>
          createFlashCard({
            listId: newFlashcardList._id,
            front: card.front,
            back: card.back,
          } as IFlashcardReq)
        )
      );

      console.log('Submission successful');
    } catch (error) {
      console.error('Error submitting:', error);
    }
  }
  return (
    <>
      {flashCardList &&
        <Box sx={{ m: 5 }}>
          <FlashcardSetForm flashcardList={flashCardList} isAdd={false} onSubmit={handleSubmit}></FlashcardSetForm>

        </Box>

      }
    </>
  )
}