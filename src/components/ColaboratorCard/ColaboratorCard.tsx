import NoteCard from "../NoteCard"

const ColaboratorCard = (props:ColaboratorCardModel) => {
    return(
        <div className="w-[162px] h-[182px] flex flex-col text-slate-800 gap-[2px] px-[20px] py-[10px] bg-neutral-50 rounded-[10px] justify-center items-center">
            <img src={props.avatar ? props.avatar : "./avatar.png"} alt="avatar" className="w-[48px] h-[48px] rounded-full"/>
            <p className="font-poppins text-[18px] font-bold">{props.name}</p>
            <p className="font-poppins text-[14px]">{props.role}</p>
            <NoteCard note={props.stars}/>
        </div>
    )
}

export default ColaboratorCard