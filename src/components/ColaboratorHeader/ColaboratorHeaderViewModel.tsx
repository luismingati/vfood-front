import { useEffect, useState } from "react";

const useColaboratorHeaderViewModel = (model: ColaboratorCardModel) => {
    const [card, setCard] = useState<ColaboratorCardModel>(model)

    useEffect(() => {
        setCard(model)
    }, [model])

    const handleMonthChange = (month: Date) => {
        //TODO: handle month change
        console.log(month)
    }

    return {
        card,
        handleMonthChange
    }
}

export default useColaboratorHeaderViewModel;