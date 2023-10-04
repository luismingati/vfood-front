import { useEffect, useState } from "react";
import CardHighlight from "../CardHighlight/CardHighlight";
import { GoalsTypes } from "../CardHighlight/CardHighlightModel";
import { MonthHighlightModel } from "./MonthHighlightModel";
import axios from 'axios';

const MonthHighlight: React.FC<MonthHighlightModel> = (
  props: MonthHighlightModel
) => {

  const [data, setData] = useState<any>({});

  const fetchHighlighsData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/colaborator/month-highlights');
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados", error);
    }
  };

  useEffect(() => {
    fetchHighlighsData();
  }, []);

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
          count={data.desafios?.length || 0}
          data={data.desafios}
          message="atingiram o Desafio de seu Indicador!"
        />
        <CardHighlight
          metaType={GoalsTypes.SUPERGOAL}
          altText="Ícone de um troféu"
          count={data.supermetas?.length || 0}
          data={data.supermetas}
          message="atingiram a Supermeta de seu Indicador!"
        />
        <CardHighlight
          metaType={GoalsTypes.CHALLENGE}
          altText="Ícone de um troféu"
          count={data.metas?.length || 0}
          data={data.metas}
          message="atingiram a Meta de seu Indicador!"
        />
        <CardHighlight
          metaType={GoalsTypes.NOT_REACHED}
          altText="Ícone de um troféu"
          count={data.noneCompleted?.length || 0}
          data={data.noneCompleted}
          message="Não atingiram seu indicador!"
        />
      </div>
    </div>
  );
};

export default MonthHighlight;
