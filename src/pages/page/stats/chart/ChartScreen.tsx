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

export const StudentChartScreen: React.FC<any> = ({ data }) => {
  const { students } = useSchoolStudents(data?._id);

  let male: number = 0;
  let female: number = 0;

  for (let i = 0; i < students?.data?.students?.length; i++) {
    if (students?.data?.students[i].gender === "Male") {
      male++;
    } else {
      female++;
    }
  }

  const chartData = [
    { student: "Male", students: male, fill: "var(--color-male)" },
    { student: "Female", students: female, fill: "var(--color-female)" },
  ];

  const chartConfig = {
    students: {
      label: "students",
    },
    male: {
      label: "male",
      color: "hsl(var(--chart-1))",
    },
    female: {
      label: "female",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  let xTotal = students?.data?.students?.length;

  return (
    <Card className="flex flex-col bg-transparent shadow-none border-0 rounded-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Male/Female - Students Chart</CardTitle>
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
                          Students
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
          Up to 5.2% Student Increase compare to last session's{" "}
          <span>{data?.presentTerm}</span>
          {/* <span>
            <TrendingUp className="h-4 w-4" />
          </span> */}
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
};
