import { useParams } from "react-router-dom";
import FlashcardSetForm from "../../components/flash-card/FlashCardSetForm";
import {
  createMultipleFlashCard,
  deleteMultipleFlashCard,
  getFlashCardListById,
  updateFlashCardList,
  updateMultipleFlashCard,
} from "../../config/api/flashcard/apiFlashcard";
import { IFlashCardList } from "../../types/flashcard";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast from "../../utils/toast";

export default function EditSet() {
  const { ListId } = useParams();

  const [flashCardList, setFlashCardList] = useState<IFlashCardList>();
  const [flashCardOriginal, setFlashCardOriginal] = useState<IFlashCardList>();

  useEffect(() => {
    if (ListId) {
      getFlashCardListById(ListId).then((res) => {
        setFlashCardList(res);
        setFlashCardOriginal(res);
        console.log(res);
      });
    }
  }, [ListId]);

  const handleSubmit = async (newFlashcardList: IFlashCardList) => {
    console.log(flashCardList);
    console.log(newFlashcardList);

    try {
      // Nếu tên của flashCardList đã thay đổi, thực hiện cập nhật
      if (flashCardList?.name !== newFlashcardList.name) {
        updateFlashCardList(newFlashcardList._id, newFlashcardList.name)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      }

      // Tìm các flashcard id đã bị xóa
      const deletedFlashcardIds = flashCardOriginal?.flashcards
        .filter(
          (card) => !newFlashcardList.flashcards.some((c) => c._id === card._id)
        )
        .map((card) => card._id);

      // Tìm các flashcard mới được thêm
      const addedFlashcards = newFlashcardList.flashcards.filter(
        (card) => !flashCardOriginal?.flashcards.some((c) => c._id === card._id)
      );

      // Tìm các flashcard đã bị sửa
      const editedFlashcards = newFlashcardList.flashcards.filter((card) =>
        flashCardOriginal?.flashcards.some((c) => c._id === card._id)
      );

      // Thêm flashcard mới
      if (addedFlashcards.length > 0) {
        createMultipleFlashCard({
          listId: newFlashcardList._id,
          flashcards: addedFlashcards,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      }

      // Sửa flashcard
      if (editedFlashcards.length > 0) {
        updateMultipleFlashCard(editedFlashcards)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      }

      // Xóa flashcard
      if (deletedFlashcardIds && deletedFlashcardIds.length > 0) {
        deleteMultipleFlashCard(deletedFlashcardIds)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      }
      toast.success("Update flashcard list successfully");
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };
  return (
    <>
      {flashCardList && (
        <Box sx={{ m: 5 }}>
          <FlashcardSetForm
            flashcardList={flashCardList}
            isAdd={false}
            onSubmit={handleSubmit}
          ></FlashcardSetForm>
        </Box>
      )}
    </>
  );
}
