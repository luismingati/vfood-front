import ColaboratorCard from "../ColaboratorCard/ColaboratorCard";
import useColaboratorPageBodyViewModel from "./ColaboratorPageBodyViewModel";
import { MdStar } from "react-icons/md";
const ColaboratorPageBody = (props: ColaboratorPageBodyModel) => {
  const { card, stars, cards, alfabeto } =
    useColaboratorPageBodyViewModel(props);
  return (
    <div className="flex flex-col gap-[12px] mt-[27px] font-poppins">
      <div className="flex flex-row gap-[12px]">
        {card.contador > 5 ? (
          <p className="text-[#312843] text-[18px]">
            {alfabeto[card.contador - 65]}
          </p>
        ) : (
          <div className="text-[#312843] text-[18px] flex flex-row mt-[4px]">
            {stars()}
          </div>
        )}
        <div className=" w-full h-[2px] bg-[#D9D9D9] mt-[12.5px]"></div>
      </div>
      <div className="flex">
        <div className="flex flex-row flex-wrap gap-[10px] w-max-[860px] ml-[20px]">
          {cards.map((carta, index) => {
            {
              if (card.contador > 5) {
                if (
                  carta.name[0].toLowerCase() !=
                  alfabeto[card.contador - 65].toLowerCase()
                )
                  return null;
                else
                  return (
                    <ColaboratorCard
                      key={index}
                      id={carta.id}
                      name={carta.name}
                      role={carta.role}
                      stars={carta.stars}
                    />
                  );
              } else {
                if (
                  ((carta.stars || 0) <= card.contador &&
                    (carta.stars || 0) > card.contador - 1) ||
                  (card.contador == 1 && carta.stars == null)
                )
                  return (
                    <ColaboratorCard
                      name={carta.name}
                      role={carta.role}
                      stars={carta.stars}
                      id={carta.id}
                    />
                  );
                return null;
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default ColaboratorPageBody;
