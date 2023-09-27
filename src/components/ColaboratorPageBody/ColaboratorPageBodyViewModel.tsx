import { useEffect, useState } from "react";
const useColaboratorPageBodyViewModel = (model: ColaboratorPageBodyModel) => {
    const [card, setCard] = useState<ColaboratorPageBodyModel>(model);
    useEffect(() => {
        setCard(model);
    }, [model]);
    return {
        card
    };
}
export default useColaboratorPageBodyViewModel;