import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { IFlashcard } from "../../types/flashcard";

interface Props {
  card: IFlashcard;
}

const FlashCard: React.FC<Props> = ({ card }: Props) => {
  const [isFlipped, setIsFlipped] = useState<boolean | undefined>(false);

  const handleFlip = () => {
    setIsFlipped((prevState) => !prevState);
  };

  return (
    <>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipSpeedBackToFront={0.25}
        flipSpeedFrontToBack={0.25}
        flipDirection="vertical"
      >
        <Card
          sx={{
            maxWidth: 345,
            border: "1px solid #ccc",
          }}
          onClick={handleFlip}
        >
          <CardContent>
            <Typography variant="body2">{card.front}</Typography>
          </CardContent>
        </Card>

        <Card
          sx={{ maxWidth: 345, border: "1px solid #ccc" }}
          onClick={handleFlip}
        >
          <CardContent>
            <Typography variant="body2">{card.back}</Typography>
          </CardContent>
        </Card>
      </ReactCardFlip>
    </>
  );
};

export default FlashCard;
