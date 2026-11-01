"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

export const AcademicPerformance: FC<any> = ({ remarks }) => {
  const wk = parseFloat(remarks?.data[0]?.generalPerformace) * 20;
  const wkLast = parseFloat(remarks?.data[1]?.generalPerformace) * 20;
  const wkBefore = parseFloat(remarks?.data[2]?.generalPerformace) * 20;

  const chartData = [
    { wk: "This Week", desktop: wk },
    { wk: "Last Week", desktop: wkLast },
    { wk: "The Week Before", desktop: wkBefore },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0">
        <CardTitle>General Academic Performance - Chart</CardTitle>
        <CardDescription>
          This Week, Last Week and the Week Before, Perfomance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="wk"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="wk"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="insideRight"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-0 flex-col items-start gap-2 text-sm">
        <p className="my-5 text-[16px] font-semibold text-blue-950">
          {wk === 100
            ? "Awesome Performance this Week, Keep it up"
            : wk === wkLast &&
              wk === wkBefore &&
              wkBefore === wkLast &&
              wk < 100
            ? "No Significant Change, but can still do better!"
            : wk < wkLast && wkLast > wkBefore
            ? "You did better last week than this week... You have to paid more attention to your studies."
            : wk > wkLast && wkLast > wkBefore
            ? "This is an improvement... Good work!"
            : wk < wkLast && wkLast < wkBefore
            ? "This is a consistent poor result... You have to work harder."
            : wk < wkLast && wkLast === wkBefore
            ? "This performance is really bad. You have to wake up and pay more attention to your studies, because it is dropping!"
            : "There is still room for improvement..."}
        </p>
        <div className="flex gap-2 text-[12px] font-light leading-[1.5] tracking-wider">
          This gives an Insight of how you're performing within the last three
          weeks
        </div>
        {/* <TrendingUp className="h-4 w-4" /> */}
      </CardFooter>
    </Card>
  );
};
