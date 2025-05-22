"use client";

import { motion } from "motion/react";
import {
  IconChartAreaLine,
  IconGauge,
  IconTrendingUp,
  IconCurrencyDollar,
} from "@tabler/icons-react";

// Dummy data for demonstration
const analyticsData = [
  { title: "Total Revenue", value: "$1,545,890", trend: "+12.5%", icon: IconCurrencyDollar },
  { title: "Total Orders", value: "8,230", trend: "+8.1%", icon: IconTrendingUp },
  { title: "Average Order Value", value: "$187.84", trend: "+3.2%", icon: IconGauge },
  { title: "Items Sold", value: "25,120", trend: "+10.9%", icon: IconPackage }, // Assuming IconPackage is imported or available
];

import { Card, Title, DonutChart, AreaChart } from "@tremor/react"; // Assuming Tremor is used for charts
import { IconPackage } from "@tabler/icons-react";


const salesData = [
  { date: "Jan 23", Sales: 980, Profit: 232 },
  { date: "Feb 23", Sales: 456, Profit: 150 },
  { date: "Mar 23", Sales: 390, Profit: 280 },
  { date: "Apr 23", Sales: 340, Profit: 200 },
  { date: "May 23", Sales: 450, Profit: 180 },
  { date: "Jun 23", Sales: 600, Profit: 250 },
];

const inventoryValueData = [
  { name: "Electronics", value: 450000 },
  { name: "Accessories", value: 120000 },
  { name: "Storage", value: 80000 },
  { name: "Furniture", value: 150000 },
  { name: "Other", value: 50000 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View key performance indicators and reports
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((item) => (
          <Card key={item.title} className="dark:bg-neutral-800">
            <div className="flex items-center justify-between">
              <Title className="text-gray-500 dark:text-gray-400">{item.title}</Title>
              <item.icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
              <p className="text-sm font-medium text-green-600">{item.trend}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="dark:bg-neutral-800">
          <Title className="text-gray-900 dark:text-white">Sales and Profit Trends</Title>
          <AreaChart
            className="mt-4 h-72"
            data={salesData}
            index="date"
            categories={["Sales", "Profit"]}
            colors={["blue", "emerald"]}
            valueFormatter={(number) =>
              `$${Intl.NumberFormat("us").format(number).toString()}`
            }
          />
        </Card>

        <Card className="dark:bg-neutral-800">
          <Title className="text-gray-900 dark:text-white">Inventory Value Distribution by Category</Title>
          <DonutChart
            className="mt-4 h-48"
            data={inventoryValueData}
            category="value"
            index="name"
            variant="donut"
            valueFormatter={(number) =>
              `$${Intl.NumberFormat("us").format(number).toString()}`
            }
          />
        </Card>
      </div>
    </div>
  );
} 