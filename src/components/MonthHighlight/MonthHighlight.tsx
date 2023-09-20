import { MonthHighlightModel } from "./MonthHighlightModel";
import chevron from '../../assets/chevron.svg'

const MonthHighlight = (props: MonthHighlightModel) => {

    return(
        <div className="px-[18px] py-6 border-2 w-full max-w-[390px] h-[340px] rounded-[10px] border-[#D9D9D9] font-poppins">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-normal text-[#312843]">Destaques do mês</h2>
                <p className="px-[10px] py-1 border-2 border-[#D9D9D9] rounded-[10px] text-[#A3A3A3] text-base font-normal">{props.month}</p>
            </div>
            <div className="overflow-y-auto flex flex-col items-center h-56 px-[10px] gap-4 divide-y-[1px] no-scrollbar">
                <div className="h-2 w-32 bg-red-500 "></div>
                <div className="flex items-center w-full pt-3 gap-[10px] cursor-pointer">
                    <img src="" alt="azul" className="w-12 h-8"/>
                    <p className="text-[#312843] text-base font-normal"><span className="font-bold">6 colaboradores</span> superaram a meta!</p>
                    <img src={chevron} alt="" />
                </div>
                <div className="flex items-center w-full pt-3 gap-[10px] cursor-pointer">
                    <img src="" alt="azul" className="w-12 h-8"/>
                    <p className="text-[#312843] text-base font-normal"><span className="font-bold">6 colaboradores</span> superaram a meta!</p>
                    <img src={chevron} alt="" />
                </div>
                <div className="flex items-center w-full pt-3 gap-[10px] cursor-pointer">
                    <img src="" alt="azul" className="w-12 h-8"/>
                    <p className="text-[#312843] text-base font-normal"><span className="font-bold">6 colaboradores</span> superaram a meta!</p>
                    <img src={chevron} alt="" />
                </div>
                <div className="flex items-center w-full pt-3 gap-[10px] cursor-pointer">
                    <img src="" alt="azul" className="w-12 h-8"/>
                    <p className="text-[#312843] text-base font-normal"><span className="font-bold">6 colaboradores</span> superaram a meta!</p>
                    <img src={chevron} alt="" />
                </div>
                
            </div>
        </div>
    )
}

export default MonthHighlight;