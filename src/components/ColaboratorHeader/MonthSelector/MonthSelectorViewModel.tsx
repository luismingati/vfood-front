import { useEffect, useState } from "react";
import MonthSelectorModel from "./MonthSelectorModel";

const useMonthSelectorViewModel = (model: MonthSelectorModel) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    useEffect(() => {
        model.onMonthChange(selectedMonth);
    }, [selectedMonth, model]);

    const goToNextMonth = () => {
        const nextMonth = new Date(selectedMonth);
        nextMonth.setMonth(selectedMonth.getMonth() + 1);
        if (nextMonth <= new Date()) {
            setSelectedMonth(nextMonth);
        }
    };

    const goToPreviousMonth = () => {
        const previousMonth = new Date(selectedMonth);
        previousMonth.setMonth(selectedMonth.getMonth() - 1);
        setSelectedMonth(previousMonth);
    };

    const shouldDisableNextMonth = () => {
        return ((selectedMonth.getMonth() === new Date().getMonth()) && (selectedMonth.getFullYear() === new Date().getFullYear()))
    }

    return {
        selectedMonth,
        goToNextMonth,
        goToPreviousMonth,
        shouldDisableNextMonth
    }
}

export default useMonthSelectorViewModel;