import { Box } from "@mui/material";
import FlashcardSetForm from "../../components/flash-card/FlashCardSetForm";
import {
  createFlashCardList,
  createMultipleFlashCard,
} from "../../config/api/flashcard/apiFlashcard";
import { IFlashCardList, IFlashcardListReq } from "../../types/flashcard";
import toast from "../../utils/toast";
import { useNavigate } from "react-router";

export default function CreateSet() {
  const navigate = useNavigate();
  const newFlashCardSet: IFlashCardList = {
    _id: "",
    name: "",
    userId: "",
    __v: 0,
    flashcards: [],
  };
  const handleSubmit = (flashcardList: IFlashCardList) => {
    const newFlashcardListReq: IFlashcardListReq = {
      name: flashcardList.name, // Copy giá trị từ flashcardList.name
    };
    let newListId: string = "";
    createFlashCardList(newFlashcardListReq)
      .then((res) => {
        toast.success("Create flashcard list successfully");
        newListId = res.data._id;
        createMultipleFlashCard({
          listId: newListId,
          flashcards: flashcardList.flashcards,
        })
          .then((res) => {
            toast.success("Add flashcards successfully");
            console.log(res);
            setTimeout(() => navigate("/learn-flashcard"), 1000);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <>
      <Box sx={{ m: 5 }}>
        <FlashcardSetForm
          flashcardList={newFlashCardSet}
          isAdd={true}
          onSubmit={handleSubmit}
        ></FlashcardSetForm>
      </Box>
    </>
  );
}
