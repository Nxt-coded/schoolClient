"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

export const Participation: FC<any> = ({ remarks }) => {
  const wkClass1 =
    remarks?.data[0]?.classParticipation === "Excellent"
      ? 100
      : remarks?.data[0]?.classParticipation === "Good"
      ? 50
      : 20;
  const wkClass2 =
    remarks?.data[1]?.classParticipation === "Excellent"
      ? 100
      : remarks?.data[1]?.classParticipation === "Good"
      ? 50
      : 20;
  const wkClass3 =
    remarks?.data[2]?.classParticipation === "Excellent"
      ? 100
      : remarks?.data[2]?.classParticipation === "Good"
      ? 50
      : 20;
  const wkClass4 =
    remarks?.data[3]?.classParticipation === "Excellent"
      ? 100
      : remarks?.data[3]?.classParticipation === "Good"
      ? 50
      : 20;
  const wkClass5 =
    remarks?.data[4]?.classParticipation === "Excellent"
      ? 100
      : remarks?.data[4]?.classParticipation === "Good"
      ? 50
      : 20;

  const wksport1 =
    remarks?.data[0]?.sportParticipation === "Excellent"
      ? 100
      : remarks?.data[0]?.sportParticipation === "Good"
      ? 50
      : 20;
  const wksport2 =
    remarks?.data[1]?.sportParticipation === "Excellent"
      ? 100
      : remarks?.data[1]?.sportParticipation === "Good"
      ? 50
      : 20;
  const wksport3 =
    remarks?.data[2]?.sportParticipation === "Excellent"
      ? 100
      : remarks?.data[2]?.sportParticipation === "Good"
      ? 50
      : 20;
  const wksport4 =
    remarks?.data[3]?.sportParticipation === "Excellent"
      ? 100
      : remarks?.data[3]?.sportParticipation === "Good"
      ? 50
      : 20;
  const wksport5 =
    remarks?.data[4]?.sportParticipation === "Excellent"
      ? 100
      : remarks?.data[4]?.sportParticipation === "Good"
      ? 50
      : 20;

  const chartData = [
    {
      month: "wk1",
      classParticipation: wkClass1,
      sportParticipation: wksport1,
    },
    {
      month: "wk2",
      classParticipation: wkClass2,
      sportParticipation: wksport2,
    },
    {
      month: "wk3",
      classParticipation: wkClass3,
      sportParticipation: wksport3,
    },
    {
      month: "wk4",
      classParticipation: wkClass4,
      sportParticipation: wksport4,
    },
    {
      month: "wk5",
      classParticipation: wkClass5,
      sportParticipation: wksport5,
    },
  ];

  const chartConfig = {
    classParticipation: {
      label: "classParticipation",
      color: "hsl(var(--chart-1))",
    },
    sportParticipation: {
      label: "sportParticipation",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="p-0 m-0 border-0 shadow-none  ">
      <CardHeader>
        <CardTitle>Class and Sport - Participation</CardTitle>
        <CardDescription>
          <p className="text-[12px] font-medium">
            Showing class and sport participation within the last 5weeks
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-classParticipation)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-classParticipation)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sportParticipation)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sportParticipation)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="sportParticipation"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-sportParticipation)"
              stackId="a"
            />
            <Area
              dataKey="classParticipation"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-classParticipation)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div> */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
