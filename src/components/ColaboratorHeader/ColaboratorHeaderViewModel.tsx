import { useEffect, useState } from "react";

const useColaboratorHeaderViewModel = (model: ColaboratorCardModel & { onMonthChange: (date: Date) => void }) => {
    const [card, setCard] = useState<ColaboratorCardModel>(model)

    useEffect(() => {
        setCard(model)
    }, [model])

    const handleMonthChange = (month: Date) => {
        model.onMonthChange(month); // Chame a função passada como propriedade para notificar a mudança do mês
    }

    return {
        card,
        handleMonthChange
    }
}

export default useColaboratorHeaderViewModel;