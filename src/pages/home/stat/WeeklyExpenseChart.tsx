"use client";
import { FC, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import _ from "lodash";

export const WeeklyChart: FC<any> = ({ dailyExpense, data }) => {
  const yy = dailyExpense?.data?.week;

  let [readResult, setReadResult] = useState<Array<{}>>([]);
  let [readResultData, setReadResultData] = useState<Array<{}>>([]);
  let [readResultChart, setReadResultChart] = useState<Array<{}>>([]);

  if (readResult.length <= 0) {
    let x = setTimeout(() => {
      setReadResult(Object.entries(yy));
      clearTimeout(x);
    }, 1000);
  }

  let result1 = readResult.map(([key, values]: any) => ({
    amount: values.map((el: any) => {
      return { amount: el.amount, day: el.day };
    }),
  }));

  if (readResultData.length <= 0) {
    let x = setTimeout(() => {
      setReadResultData(Object.values(result1[0]));
      clearTimeout(x);
    }, 1000);
  }

  if (readResultChart.length <= 0) {
    let x = setTimeout(() => {
      setReadResultChart(
        Object.entries(_.groupBy(readResultData.flat(), "day")).map(
          ([key, values]: any) => ({
            ["Mon-Fri"]: key,
            amount: values
              .map((el: any) => {
                return el.amount;
              })
              .reduce((sum: any, num: any) => sum + num, 0),
          })
        )
      );
      clearTimeout(x);
    }, 1000);
  }

  const chartData = readResultChart;
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="shadow-none rounded-md">
      <CardHeader>
        <CardTitle>Weekly Expenses made </CardTitle>
        <CardDescription>
          {data?.presentTerm} {data?.presentSession} session
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Mon-Fri"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none capitalize">
          Tracking expense made for this Term per weeks
          <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="leading-none text-muted-foreground"></div> */}
      </CardFooter>
    </Card>
  );
};
