import { Link } from "react-router-dom";
import NoteCard from "../NoteCard/NoteCard";
import useColaboratorCardViewModel from "./ColaboratorCardViewModel";

import avatarIcon from "./assets/avatar.png";

const ColaboratorCard = (props: ColaboratorCardModel) => {
  const viewModel = useColaboratorCardViewModel(props);

  return (
    <Link to={`/colaborators/${viewModel.card.id}`}>
      <div className="w-[162px] h-[182px] flex flex-col text-slate-800 gap-[2px] px-[20px] py-[10px] bg-neutral-50 rounded-[10px] justify-center items-center cursor-pointer">
        <img
          src={viewModel.card.avatar ? viewModel.card.avatar : avatarIcon}
          alt="avatar"
          className="w-[48px] h-[48px] rounded-full"
        />
        <p className="font-poppins text-[18px] font-bold w-[162px] text-center">
          {viewModel.card.name}
        </p>
        <p className="font-poppins text-[14px]">{viewModel.card.role}</p>
        <NoteCard note={viewModel.card.stars} />
      </div>
    </Link>
  );
};

export default ColaboratorCard;
