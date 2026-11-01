import { FC } from "react";
import { MonthlyChart } from "./MonthlyChart";
import { WeeklyChart } from "./WeeklyExpenseChart";

export const DailyExpenseChart: FC<any> = ({ dailyExpense, data }) => {
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyChart dailyExpense={dailyExpense} data={data} />
        <WeeklyChart dailyExpense={dailyExpense} data={data} />
      </div>
      <div className="mt-2 mb-10 text-[14px]"> </div>
    </main>
  );
};
