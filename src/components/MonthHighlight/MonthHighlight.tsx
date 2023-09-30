import CardHighlight from "../CardHighlight/CardHighlight";
import { GoalsTypes } from "../CardHighlight/CardHighlightModel";
import { MonthHighlightModel } from "./MonthHighlightModel";

const MonthHighlight: React.FC<MonthHighlightModel> = (
  props: MonthHighlightModel
) => {
  return (
    <div className="px-[18px] py-6 border-[1px] w-full max-w-[390px] h-[340px] rounded-[10px] border-[#D9D9D9] font-poppins">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-normal text-[#312843]">Destaques do mês</h2>
        <p className="px-[10px] py-1 border-[1px] border-[#D9D9D9] rounded-[10px] text-[#A3A3A3] text-base font-normal">
          {props.month}
        </p>
      </div>

      <div className="overflow-y-auto flex flex-col items-center h-56  gap-4 no-scrollbar justify-between">
        <CardHighlight
          metaType={GoalsTypes.GOAL}
          count={6}
          message="atingiram o Desafio de seu Indicador!"
        />
        <CardHighlight
          metaType={GoalsTypes.SUPERGOAL}
          altText="Ícone de um troféu"
          count={10}
          message="atingiram a Supermeta de seu Indicador!"
        />
        <CardHighlight
          metaType={GoalsTypes.CHALLENGE}
          altText="Ícone de um troféu"
          count={15}
          message="atingiram a Meta de seu Indicador!"
        />
        <CardHighlight
          metaType={GoalsTypes.NOT_REACHED}
          altText="Ícone de um troféu"
          count={5}
          message="Não atingiram seu indicador!"
        />
      </div>
    </div>
  );
};

export default MonthHighlight;
