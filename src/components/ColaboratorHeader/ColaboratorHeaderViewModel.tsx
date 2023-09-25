import { useEffect, useState } from "react";

const useColaboratorHeaderViewModel = (model: ColaboratorCardModel) => {
    const [card, setCard] = useState<ColaboratorCardModel>(model)

    useEffect(() => {
        setCard(model)
    }, [model])

    const handleMonthChange = (month: Date) => {
        console.log(month)
        //TODO: handle month change
    }

    return {
        card,
        handleMonthChange
    }
}

export default useColaboratorHeaderViewModel;