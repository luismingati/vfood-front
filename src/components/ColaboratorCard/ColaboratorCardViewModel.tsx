import { useEffect, useState } from "react";

const useColaboratorCardViewModel = (model: ColaboratorCardModel) => {
    const [card, setCard] = useState<ColaboratorCardModel>(model)

    useEffect(() => {
        setCard(model)
    }, [model])

    return {
        card
    }
}

export default useColaboratorCardViewModel;