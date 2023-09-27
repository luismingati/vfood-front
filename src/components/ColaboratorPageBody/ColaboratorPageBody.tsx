import ColaboratorCard from "../ColaboratorCard/ColaboratorCard"
import useSearchbarViewModel from "../Searchbar/SearchbarViewModel"
import useColaboratorPageBodyViewModel from "./ColaboratorPageBodyViewModel"
import {MdStar} from 'react-icons/md'
const ColaboratorPageBody = (props: ColaboratorPageBodyModel) => {
const viewModel = useColaboratorPageBodyViewModel(props);
let alfabeto : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let estrelas : number[] = [0, 1, 2, 3, 4, 5];
const cards = viewModel.card.ColaboratorArray;
const stars = () => {
    let filterEstrelas = estrelas;
    switch (viewModel.card.contador) {
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
    return (
        <div className="flex flex-col gap-[12px] mt-[27px] font-poppins">
            <div className="flex flex-row gap-[12px]">
                {viewModel.card.contador > 5 ? 
                <p className="text-[#312843] text-[18px]">{alfabeto[viewModel.card.contador - 65]}</p> : 
                <div className="text-[#312843] text-[18px] flex flex-row mt-[4px]">{
                    stars()
                }</div>}
            <div className=" w-[88.7%] h-[2px] bg-[#D9D9D9] mt-[12.5px]"></div>
            </div>
            <div className="flex">
                <div className="flex flex-row flex-wrap gap-[10px] w-max-[860px] ml-[20px]">
                    {
                        cards.map((card) => {
                            {
                                if(viewModel.card.contador > 5){
                                    if(card.name[0].toLowerCase() != alfabeto[viewModel.card.contador - 65].toLowerCase()) return null;
                                    else return <ColaboratorCard name={card.name} role={card.role} stars={card.stars}/>
                                }
                                else{
                                    if((card.stars || 0) <= viewModel.card.contador && (card.stars || 0) > viewModel.card.contador - 1) return (<ColaboratorCard name={card.name} role={card.role} stars={card.stars}/>)
                                    return null
                                }
                        }
                        }
                        )}
                </div>
            </div>
        </div>
    )
}
export default ColaboratorPageBody;