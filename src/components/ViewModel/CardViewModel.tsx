import { useState, useEffect } from "react";
import CardModel from "../Model/CardModel";

const useCardViewModel = (model: CardModel) => {
    const [card, setCard] = useState<CardModel>(model)

    useEffect(() => {
        
    }, [])

    const incrementNumberClicked = () => {

        const updatedCard = {...card};

        updatedCard.numberClicked += 1

        setCard(updatedCard)

    }

    const handleNameChange = (newName: string) => {

        const updatedCard = {...card};

        updatedCard.name == newName ? updatedCard.name = model.name : updatedCard.name = newName

        setCard(updatedCard)

    }

    return {
        card,
        incrementNumberClicked,
        handleNameChange
    }
}

export default useCardViewModel;