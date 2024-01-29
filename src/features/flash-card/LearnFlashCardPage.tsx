import { IFlashCardList } from "../../types/flashcard";
import FlashCard from "../../components/flash-card/FlashCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFlashCardListById } from "../../config/api/flashcard/apiFlashcard";

export default function LearnFlashCardPage() {

    const { ListId } = useParams();
    const [flashCardList, setFlashCardList] = useState<IFlashCardList>();

    useEffect(() => {

        if (ListId) {
            getFlashCardListById(ListId).then(
                (res) => {
                    setFlashCardList(res);
                }
            )
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
        setCurrent(current - 1);
    }

    const nextCard = () => {
        setCurrent(current + 1);
    }
    return (

        <div>

            <div className="cardNumber">
                Card {current + 1} of {cards?.length}
            </div>

            {cards && cards[current]}

            <div >
                {current > 0 ? (
                    <button onClick={previousCard}>Previous card</button>
                ) : (
                    <button disabled>
                        Previous card
                    </button>
                )}

                {cards && current < cards.length - 1 ? (
                    <button onClick={nextCard}>Next card</button>
                ) : (
                    <button disabled>
                        Next card
                    </button>
                )}
            </div>
        </div>

    )
}