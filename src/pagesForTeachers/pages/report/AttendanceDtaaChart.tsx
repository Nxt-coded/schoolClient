"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const AttendanceDataChart: React.FC<any> = ({ remarks }) => {
  const att = parseInt(remarks?.data[0]?.attendanceRatio) * 20;
  const lastAtt = parseInt(remarks?.data[1]?.attendanceRatio) * 20;

  const presentData = [
    { record: "presence", present: att + lastAtt, fill: "var(--color-xx)" },
    {
      record: "absence",
      present: 200 - (att + lastAtt),
      fill: "var(--color-x)",
    },
  ];

  const chartConfig = {
    attendance: {
      label: "Attendance",
    },
    present: {
      label: "present",
    },

    x: {
      label: "x",
      color: "hsl(var(--chart-1))",
    },

    xx: {
      label: "xx",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(presentData[0].record);

  const activeIndex = React.useMemo(
    () => presentData.findIndex((item) => item.record === activeMonth),
    [activeMonth]
  );

  return (
    <Card data-chart={id} className="flex flex-col border-0 shadow-none ">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Attendance Record</CardTitle>
          <CardDescription>
            Last Week & This Week Attenence Record
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className=" mt-4 flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={presentData}
              dataKey="present"
              nameKey="record"
              innerRadius={60}
              strokeWidth={5}
              paddingAngle={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
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
                          {/* {presentData[activeIndex].present.toLocaleString()} */}
                          {((att + lastAtt) / 200) * 100}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Attendance
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
    </Card>
  );
};
