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
import toast from "../../utils/toast";
import arrowLeft from "../../assets/images/keyboard_key_left.png";
import arrowRight from "../../assets/images/keyboard_key_right.png";
import enter from "../../assets/images/enter.png";

export default function LearnFlashCardPage() {
  const { ListId } = useParams();
  const [flashCardList, setFlashCardList] = useState<IFlashCardList>();

  let cards = null;

  if (flashCardList && flashCardList.flashcards) {
    cards = flashCardList.flashcards.map((card) => (
      <FlashCard key={card._id} card={card} />
    ));
  }

  const [current, setCurrent] = useState(0);

  const { t } = useTranslation("global");

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

  useEffect(() => {
    if (ListId) {
      getFlashCardListById(ListId)
        .then((res) => {
          setFlashCardList(res);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  }, [ListId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        // Move to the previous card
        if (current > 0) {
          setCurrent(current - 1);
        } else {
          setCurrent(cards.length - 1);
        }
      } else if (event.key === "ArrowRight") {
        // Move to the next card
        if (current < cards.length - 1) {
          setCurrent(current + 1);
        } else {
          setCurrent(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cards?.length, current, flashCardList]);

  return (
    <Box
      p={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          position: "absolute",
          bottom: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <img src={arrowLeft} height={"32px"} alt="<" />{" "}
          {t("toGoToPreviousCard")}
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <img src={arrowRight} height={"32px"} alt=">" /> {t("toGoToNextCard")}
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <img src={enter} height={"32px"} alt="Enter" /> {t("toFlipCard")}
        </div>
      </div>
    </Box>
  );
}
