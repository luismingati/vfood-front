import { NotReachedIndicatorCardModel } from "./NotReachedIndicatorCardModel";

const NotReachedIndicatorCard = (model: NotReachedIndicatorCardModel) => {
  const data = model.notReachedIndicatorCardData;

  const dictionary: Record<string, { name: string, score: number }[]> = {};

  data.forEach((item) => {
    if (!dictionary[item.month]) {
      dictionary[item.month] = [];
    }
    dictionary[item.month].push({ name: item.name, score: item.score });
  });

  return (
    <div className="w-[240px] h-[290px] border border-[#D9D9D9] rounded-[20px] px-[18px] py-[24px]">
      <div className="flex flex-col gap-5 w-full">
        <p className="font-poppins text-[14px] text-[#312843]">Indicadores não alcançados</p>
        <div className="flex flex-col gap-5 w-full h-[210px] overflow-y-scroll pr-1">
          {Object.keys(dictionary).map((month, index) => (
            <div key={index} className="flex flex-col gap-0">
              <p className="font-poppins text-[12px] text-[#A3A3A3]">{month.slice(0, 3)}</p>
              <div className="flex flex-col gap-2">
                {dictionary[month].map((item, itemIndex) => (
                  <div className="flex flex-row items-center gap-2" key={itemIndex}>
                    <div className="w-[10px] h-1 bg-[#F16062] rounded-full"></div>
                    <div className="flex flex-row items-center gap-2 justify-between w-full">
                    <p className="font-poppins text-[14px] text-[#312843]">{item.name}</p>
                    <p className="font-poppins font-bold text-[12px] text-[#312843]">{item.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotReachedIndicatorCard;
