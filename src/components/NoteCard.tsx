const NoteCard = (props:{note:number}) => {
    return(
        <div className="flex flex-row w-[69px] text-white items-start justify-start py-[4px] px-[4px] gap-[4px] rounded-[10px] bg-indigo-500">
            <p className="material-symbols-outlined">star</p>
            <p className="font-poppins text-[18px] font-bold">{props.note}</p>
        </div>
    )
}

export default NoteCard;