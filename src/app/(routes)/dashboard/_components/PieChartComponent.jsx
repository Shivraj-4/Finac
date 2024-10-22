import React from "react";
import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699"]; // Customize your colors as needed

const PieChartComponent = ({ incomeList, investmentList, savingsList, debtsList, taxList }) => {
  // Prepare data for the pie chart
  const data = [
    { name: "Incomes", value: incomeList.reduce((acc, curr) => acc + curr.totalAmount, 0) },
    { name: "Investments", value: investmentList.reduce((acc, curr) => acc + curr.totalInvestment, 0) },
    { name: "Savings", value: savingsList.reduce((acc, curr) => acc + curr.totalSavings, 0) },
    { name: "Debts", value: debtsList.reduce((acc, curr) => acc + curr.totalDebts, 0) },
    { name: "Taxes", value: taxList.reduce((acc, curr) => acc + curr.totaltax, 0) },
  ];

  return (
    <div className="border rounded-2xl p-5">
      <h2 className="font-bold text-lg">Financial Overview</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
        <Pie
  data={data}
  cx="50%"
  cy="50%"
  labelLine={false}
  outerRadius={160}
  fill="#8884d8"
  dataKey="value"
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
  {data.map((entry, index) => (
    <Label
      key={`label-${index}`}
      position="outside" // Change position to "outside" to avoid collisions
      style={{ fontSize: '12px', fill: '#333' }} // Customize styles as needed
    />
  ))}
</Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
