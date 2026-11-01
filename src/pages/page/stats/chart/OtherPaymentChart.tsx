"use client";
import _ from "lodash";
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

export const OtherPaymentChart: FC<any> = ({ data, sessionTermData }) => {
  const result = _(sessionTermData?.data?.paymentOptions)
    .groupBy("paymentDetails")
    .map((items, info) => ({
      info,
      amount: _.sumBy(items, "paymentAmount"),
    }))
    .value();

  const chartData = [...result];

  const chartConfig = {
    amount: {
      label: "amount",
      color: "hsl(var(--chart-1))",
    },

    label: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Other Payment Chart Record</CardTitle>
        <CardDescription>
          {data?.presentTerm} - {data?.presentSession} session
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
              dataKey="info"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="amount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="amount"
              layout="vertical"
              fill="var(--color-amount)"
              radius={4}
            >
              <LabelList
                dataKey="info"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="amount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-center  text-muted-foreground">
          Showing Other payment made for {data?.presentTerm} -{" "}
          {data?.presentSession} session
        </div>
      </CardFooter>
    </Card>
  );
};
