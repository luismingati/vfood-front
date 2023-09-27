import useColaboratorHeaderViewModel from "./ColaboratorHeaderViewModel";
import HeaderCard from "./HeaderCard";
import MonthSelector from "./MonthSelector/MonthSelector";

const ColaboratorHeader = (props:ColaboratorCardModel) => {

    const viewModel = useColaboratorHeaderViewModel(props)

    return(
        <div className="flex flex-row items-center justify-between w-full">
            <HeaderCard name={viewModel.card.name} role={viewModel.card.role} stars={viewModel.card.stars} avatar={viewModel.card.avatar}></HeaderCard>
            <MonthSelector onMonthChange={viewModel.handleMonthChange}/>
        </div>
    )
}

export default ColaboratorHeader;