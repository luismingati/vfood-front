import { useEffect, useState } from "react";
import MonthSelectorModel from "./MonthSelectorModel";

const useMonthSelectorViewModel = (model: MonthSelectorModel) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    useEffect(() => {
        
    }, [])

    const goToNextMonth = () => {
        const nextMonth = new Date(selectedMonth);
        nextMonth.setMonth(selectedMonth.getMonth() + 1);
        console.log(nextMonth);
        if (nextMonth <= new Date()) {
        setSelectedMonth(nextMonth);
        model.onMonthChange(nextMonth);
        }
    };

    const goToPreviousMonth = () => {
        const previousMonth = new Date(selectedMonth);
        previousMonth.setMonth(selectedMonth.getMonth() - 1);
        setSelectedMonth(previousMonth);
        model.onMonthChange(previousMonth);
    };

    const shouldDisableNextMonth = () => {
        return selectedMonth.getMonth() === new Date().getMonth() && selectedMonth.getFullYear === new Date().getFullYear
    }

    return {
        selectedMonth,
        goToNextMonth,
        goToPreviousMonth,
        shouldDisableNextMonth
    }
}

export default useMonthSelectorViewModel;