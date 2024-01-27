import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function DictionaryPage() {
  const [isFlipped, setIsFlipped] = useState<boolean | undefined>(false);

  const handleFlip = () => {
    setIsFlipped((prevState) => !prevState);
  };

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipSpeedBackToFront={0.1}
      flipSpeedFrontToBack={0.1}
      flipDirection="vertical"
    >
      <Card sx={{ maxWidth: 345 }} onClick={handleFlip}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia component="img" height="194" alt="Paella dish" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 345 }} onClick={handleFlip}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia component="img" height="194" alt="Paella dish" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            en peas along with the mussels, if you like.
          </Typography>
        </CardContent>
      </Card>
    </ReactCardFlip>
  );
}
