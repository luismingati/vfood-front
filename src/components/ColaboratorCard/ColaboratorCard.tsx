import NoteCard from "../NoteCard/NoteCard";
import useColaboratorCardViewModel from "./ColaboratorCardViewModel";

const ColaboratorCard = (props: ColaboratorCardModel) => {
  const viewModel = useColaboratorCardViewModel(props);

  return (
    <div className="min-w-[162px] h-[182px] flex flex-col text-slate-800 gap-[2px] px-[20px] py-[10px] bg-neutral-50 rounded-[10px] justify-center items-center">
      <img
        src={viewModel.card.avatar ? viewModel.card.avatar : "./avatar.png"}
        alt="avatar"
        className="w-[48px] h-[48px] rounded-full"
      />
      <p className="font-poppins text-[18px] font-bold">
        {viewModel.card.name}
      </p>
      <p className="font-poppins text-[14px]">{viewModel.card.role}</p>
      <NoteCard note={viewModel.card.stars} />
    </div>
  );
};

export default ColaboratorCard;
