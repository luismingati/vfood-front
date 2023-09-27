import { useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
const useColaboratorPageBodyViewModel = (model: ColaboratorPageBodyModel) => {
    const [card, setCard] = useState<ColaboratorPageBodyModel>(model);
    useEffect(() => {
        setCard(model);
    }, [model]);
    let alfabeto : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let estrelas : number[] = [0, 1, 2, 3, 4, 5];
    const cards = card.ColaboratorArray;
    const stars = () => {
    let filterEstrelas = estrelas;
    switch (card.contador) {
        case 5:
            filterEstrelas.pop();
            return (filterEstrelas.map((star) => { return (<MdStar className=""/>) }))
        case 4:
            for(let i : number = 0; i < 2;i++){
                filterEstrelas.pop();
            }
            return (filterEstrelas.map((star) => { return (<MdStar className=""/>) }))
        case 3:
            for(let i : number = 0; i < 3;i++){
                filterEstrelas.pop();
            }
            return (filterEstrelas.map((star) => { return (<MdStar className=""/>) }))
        case 2:
            for(let i : number = 0; i < 4;i++){
                filterEstrelas.pop();
            }
            return (filterEstrelas.map((star) => { return (<MdStar className=""/>) }))
        case 1:
            for(let i : number = 0; i < 5;i++){
                filterEstrelas.pop();
            }
            return (filterEstrelas.map((star) => { return (<MdStar className=""/>) }))
        default:
            break;
    }
}
    return {
        card, stars, cards, alfabeto
    };
}
export default useColaboratorPageBodyViewModel;