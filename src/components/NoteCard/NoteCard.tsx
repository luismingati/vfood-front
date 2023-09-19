import useNoteCardViewModel from "./NoteCardViewModel";

const NoteCard = (props:NoteCardModel) => {

    const viewModel = useNoteCardViewModel(props)

    return(
        <div className={`flex flex-row ${viewModel.card.long ? "w-[105px] justify-center items-center text-[24px]" : "w-[69px] text-[18px]"} text-white ${viewModel.card.note !== undefined && !viewModel.card.long ? "items-start justify-start" : "items-center justify-center"} py-[4px] px-[4px] gap-[4px] rounded-[10px] ${viewModel.card.bg}`}>
            <p className="material-symbols-outlined">star</p>
            {viewModel.card.note !== undefined && (<p className="font-poppins font-bold">{viewModel.card.note}</p>)}
        </div>
    )
}

export default NoteCard;