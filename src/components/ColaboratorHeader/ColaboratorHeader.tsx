import useColaboratorHeaderViewModel from "./ColaboratorHeaderViewModel";
import HeaderCard from "./HeaderCard";
import MonthSelector from "./MonthSelector/MonthSelector";

interface ColaboratorHeaderProps extends ColaboratorCardModel {
    onMonthChange: (date: Date) => void;
}

const ColaboratorHeader: React.FC<ColaboratorHeaderProps> = (props) => {

    const viewModel = useColaboratorHeaderViewModel(props)

    return (
        <div className="flex flex-row items-center justify-between w-full">
            <HeaderCard name={viewModel.card.name} role={viewModel.card.role} stars={viewModel.card.stars} avatar={viewModel.card.avatar}></HeaderCard>
            <MonthSelector onMonthChange={props.onMonthChange}/>
        </div>
    );
}

export default ColaboratorHeader;