import NoteCard from "../NoteCard/NoteCard";

import avatarIcon from "./assets/avatar.png";

const HeaderCard = (props: ColaboratorCardModel) => {
  return (
    <div className="flex items-center gap-[18px] w-[506px]">
      <div>
        <img
          src={props.avatar ? props.avatar : avatarIcon}
          alt="avatar"
          className="w-[48px] h-[48px] rounded-full"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <p className="font-poppins text-[16px] text-[#A3A3A3] font-regular">
          {props.role}
        </p>
        <p className="font-poppins text-[32px] text-[#312843] font-bold">
          {props.name}
        </p>
      </div>
      <div>
        <NoteCard note={props.stars} long={true} />
      </div>
    </div>
  );
};

export default HeaderCard;
