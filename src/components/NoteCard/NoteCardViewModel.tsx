import { useEffect, useState } from "react";

const useNoteCardViewModel = (model: NoteCardModel) => {
    const [card, setCard] = useState<NoteCardModel>(model)

    useEffect(() => {
        const updatedCard = {...card};
        updatedCard.note = model.note;
        handleColorBackground(updatedCard)
    }, [model])

    const handleColorBackground = (updatedCard:NoteCardModel) => {

        if (updatedCard.note !== undefined){
            if (updatedCard.note > 8.0){
                updatedCard.bg = "bg-[#6186D3]"
            }else if (updatedCard.note > 6.0){
                updatedCard.bg = "bg-[#32B97C]"
            }else if (updatedCard.note > 4.0){
                updatedCard.bg = "bg-[#AC72C1]"
            }else{
                updatedCard.bg = "bg-[#F16062]"
            }
        }else{
            updatedCard.bg = "bg-[#A3A3A3]"
        }

        setCard(updatedCard)

    }

    return {
        card
    }
}

export default useNoteCardViewModel;