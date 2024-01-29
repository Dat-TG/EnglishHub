import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { IFlashCardList, IFlashcard } from "../../types/flashcard";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";

interface FlashcardFormProps {
    flashcardList: IFlashCardList;
    isAdd: boolean;
    onSubmit: (flashcardSet: IFlashCardList) => void;
}

const FlashcardSetForm: React.FC<FlashcardFormProps> = ({ flashcardList, isAdd, onSubmit }) => {

    const [flashcardSet, setFlashcardSet] = useState<IFlashCardList>(flashcardList);

    const { t } = useTranslation("global");

    const handleAddCard = () => {

        const newCard: IFlashcard = {
            _id: "",
            listId: flashcardList._id,
            userId: flashcardList.userId,
            front: "",
            back: "",
            __v: 0,
        };

        setFlashcardSet((prevFlashcardSet) => ({
            ...prevFlashcardSet,
            flashcards: [...prevFlashcardSet.flashcards, newCard],
        }));

    };

    const handleTitleChange = (value: string) => {
        setFlashcardSet((prevFlashcardSet) => ({
            ...prevFlashcardSet,
            name: value,
        }));
    };

    const handleFrontChange = (index: number, value: string) => {
        setFlashcardSet((prevFlashcardSet) => {
            const updatedFlashcards = [...prevFlashcardSet.flashcards];
            updatedFlashcards[index].front = value;
            return {
                ...prevFlashcardSet,
                flashcards: updatedFlashcards,
            };
        });
    };

    const handleBackChange = (index: number, value: string) => {
        setFlashcardSet((prevFlashcardSet) => {
            const updatedFlashcards = [...prevFlashcardSet.flashcards];
            updatedFlashcards[index].back = value;
            return {
                ...prevFlashcardSet,
                flashcards: updatedFlashcards,
            };
        });
    };

    const handleDeleteCard = (index: number) => {
        setFlashcardSet((prevFlashcardSet) => {
            const updatedFlashcards = [...prevFlashcardSet.flashcards];
            updatedFlashcards.splice(index, 1);
            return {
                ...prevFlashcardSet,
                flashcards: updatedFlashcards,
            };
        });
    };

    const handleSave = () => {
        // Gọi hàm onSubmit với thông tin của flashcardSet
        onSubmit(flashcardSet);
    };
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h1">
                    {isAdd ? t("createNewSet") : t("editSet")}
                </Typography>

                <div>
                    <Button variant="outlined" onClick={handleSave}>
                        {isAdd ? t("create") : t("save")}
                    </Button>
                </div>
            </Box>

            <TextField 
            label={t("title")} 
            variant="standard" 
            value={flashcardSet.name} 
            onChange={(e) => handleTitleChange(e.target.value)} 
            sx={{display:'block'}}
            fullWidth/>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddCard} sx={{mt: 1}}>
                {t("addNewCard")}
            </Button>

            {flashcardSet.flashcards.map((card, index) => (
                <Grid container spacing={2} key={card._id} sx={{ mt: 1 }}>
                    <Grid item xs={1} display='flex' alignItems='flex-end' justifyContent='center'>
                        <Typography variant="h6"> {flashcardSet.flashcards.length - index}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            label="Front"
                            variant="standard"
                            fullWidth
                            value={card.front}
                            onChange={(e) => handleFrontChange(index, e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            label="Back"
                            variant="standard"
                            value={card.back}
                            fullWidth
                            onChange={(e) => handleBackChange(index, e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={1} display='flex' alignItems='flex-end' justifyContent='center'>
                        <IconButton aria-label="delete" color="error" onClick={() => handleDeleteCard(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            )).reverse()}
        </>

    );

}

export default FlashcardSetForm;
