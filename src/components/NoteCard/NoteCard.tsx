import useNoteCardViewModel from "./NoteCardViewModel";

const NoteCard = (props:NoteCardModel) => {

    const viewModel = useNoteCardViewModel(props)

    return(
        <div className={`flex flex-row w-[69px] text-white items-start justify-start py-[4px] px-[4px] gap-[4px] rounded-[10px] ${viewModel.card.bg}`}>
            <p className="material-symbols-outlined">star</p>
            <p className="font-poppins text-[18px] font-bold">{viewModel.card.note}</p>
        </div>
    )
}

export default NoteCard;