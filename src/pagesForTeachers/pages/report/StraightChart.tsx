"use client";

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
import { FC } from "react";

export const StraightChart: FC<any> = ({ remarks }) => {
  const att = parseInt(remarks?.data[0]?.attendanceRatio) * 20;
  const lastAtt = parseInt(remarks?.data[1]?.attendanceRatio) * 20;

  const chartData = [
    { attendance: "Attendance", lastWeek: lastAtt, thisWeek: att },
  ];

  const chartConfig = {
    lastWeek: {
      label: "lastWeek",
      color: "hsl(var(--chart-1))",
    },
    thisWeek: {
      label: "thisWeek",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="border-0 shadow-none m-0 p-0 flex flex-col h-[400px]">
      <CardHeader>
        <CardTitle className="m-0 p-0">Attendance Chart -</CardTitle>
        <CardDescription>Last Week - This Week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} className="">
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="attendance"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="lastWeek" fill="var(--color-lastWeek)" radius={4} />
            <Bar dataKey="thisWeek" fill="var(--color-thisWeek)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <div className="flex-1" />
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Record data for Last Week and This Week's Attendance
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};
