"use client";

import React from "react";
import { Label, Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSchoolStudents } from "@/pages/hook/useSchoolAuth";

export const ExpensiveChartScreen: React.FC<any> = ({
  data,
  expense,
  revenue,
}) => {
  const { students } = useSchoolStudents(data?._id);

  let male: number = expense;
  let female: number = revenue;

  const chartData = [
    { student: "Expense", students: male, fill: "var(--color-male)" },
    { student: "Revenue", students: female, fill: "var(--color-female)" },
  ];

  const chartConfig = {
    students: {
      label: "students",
    },
    male: {
      label: "Expense",
      color: "hsl(var(--chart-1))",
    },
    female: {
      label: "Revenue",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  // let xTotal = students?.data?.students?.length;
  let xTotal = revenue - expense;

  return (
    <Card className="flex flex-col bg-transparent shadow-none border-0 rounded-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue/Expense - Chart</CardTitle>
        <CardDescription>
          {data?.presentTerm} - {data?.presentSession} session
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend />
            <Pie
              data={chartData}
              dataKey="students"
              nameKey="student"
              innerRadius={60}
              strokeWidth={5}
              paddingAngle={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {xTotal.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Profit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-center items-center gap-2 font-medium leading-none text-slate-900/90 text-[12px] uppercase">
          {/* Up to 5.2% Student Increase compare to last session's{" "} */}
          {/* <span>{data?.presentTerm}</span> */}
        </div>
      </CardFooter>
    </Card>
  );
};
