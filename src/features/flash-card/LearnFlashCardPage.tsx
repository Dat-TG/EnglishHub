import { IFlashCardList } from "../../types/flashcard";
import FlashCard from "../../components/flash-card/FlashCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFlashCardListById } from "../../config/api/flashcard/apiFlashcard";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";

export default function LearnFlashCardPage() {
  const { ListId } = useParams();
  const [flashCardList, setFlashCardList] = useState<IFlashCardList>();

  useEffect(() => {
    if (ListId) {
      getFlashCardListById(ListId).then((res) => {
        setFlashCardList(res);
      });
    }
  }, [ListId]);

  let cards = null;

  if (flashCardList && flashCardList.flashcards) {
    cards = flashCardList.flashcards.map((card) => (
      <FlashCard key={card._id} card={card} />
    ));
  }

  const [current, setCurrent] = useState(0);

  const previousCard = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(cards.length - 1);
    }
  };

  const nextCard = () => {
    if (current < cards.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };
  const { t } = useTranslation("global");
  return (
    <Box
      p={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
    >
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h1>{flashCardList?.name}</h1>
      </div>
      <div
        className="cardNumber"
        style={{
          marginBottom: "24px",
        }}
      >
        {t("Card")} {current + 1} / {cards?.length}
      </div>

      {cards && cards[current]}

      <div
        style={{
          marginTop: "24px",
        }}
      >
        <IconButton onClick={previousCard} size="large">
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton onClick={nextCard} size="large">
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </Box>
  );
}
