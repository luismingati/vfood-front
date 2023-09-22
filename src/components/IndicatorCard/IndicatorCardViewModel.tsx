import { useEffect, useState } from "react";

const useIndicatorCardViewModel = (model: IndicatorCardModel) => {
    const [card, setCard] = useState<IndicatorCardModel>(model)

    useEffect(() => {
        setCard(model)
    }, [model])

    return {
        card
    }
}

export default useIndicatorCardViewModel;