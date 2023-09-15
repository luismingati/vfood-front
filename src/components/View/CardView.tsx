import CardModel from "../Model/CardModel";
import useCardViewModel from "../ViewModel/CardViewModel";

const CardView = (props:CardModel) => {
    const viewModel = useCardViewModel(props);

    return (
        <div className="flex flex-col items-center justify-start bg-slate-100 rounded-[8px] p-[8px] gap-[4px] shadow-md w-fit">
            <h1>{viewModel.card.name}</h1>
            <p>{viewModel.card.description}</p>
            <p>{viewModel.card.age}</p>
            <p>{viewModel.card.numberClicked}</p>
            <button onClick={viewModel.incrementNumberClicked} className="bg-blue-700 text-white p-[4px] rounded shadow-md">Increment</button>
            <button onClick={() => viewModel.handleNameChange("Novo Nome")} className="bg-blue-700 text-white p-[4px] rounded shadow-md">Change name</button>
        </div>
    )
}

export default CardView;