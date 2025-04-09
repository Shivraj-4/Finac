"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import {
  Budgets,
  debts,
  Expenses,
  Incomes,
  investments,
  savings,
  tax,
} from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import PieChartComponent from "./_components/PieChartComponent";

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [investmentList, setInvestmentList] = useState([]);
  const [savingsList, setSavingsList] = useState([]);
  const [debtsList, setDebtsList] = useState([]);
  const [taxList, settaxList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
      getInvestment();
      getSaving();
      getDebt();
      getTax();
    }
  }, [user]);

  // Get the budget list
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
    getIncomeList();
  };

  // Get the income list
  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
        })
        .from(Incomes)
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Incomes.id));

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  // Get the investment list
  const getInvestment = async () => {
    const result = await db
      .select({
        id: investments.id,
        name: investments.name,
        totalInvestment:
          sql`sum(CAST(${investments.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(investments)
      .where(eq(investments.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(investments.id, investments.name)
      .orderBy(desc(investments.id));

    setInvestmentList(result);
  };

  // Get all expenses
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };
  const getSaving = async () => {
    const result = await db
      .select({
        id: savings.id,
        name: savings.name,
        totalSavings: sql`sum(CAST(${savings.amount} AS NUMERIC))`.mapWith(
          Number
        ),
      })
      .from(savings)
      .where(eq(savings.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(savings.id, savings.name)
      .orderBy(desc(savings.id));

    setSavingsList(result);
  };
  const getDebt = async () => {
    const result = await db
      .select({
        id: debts.id,
        name: debts.name,
        totalDebts: sql`sum(CAST(${debts.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(debts)
      .where(eq(debts.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(debts.id, debts.name)
      .orderBy(desc(debts.id));

    setDebtsList(result);
  };
  const getTax = async () => {
    const result = await db
      .select({
        id: tax.id,
        name: tax.name,
        totaltax: sql`sum(CAST(${tax.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(tax)
      .where(eq(tax.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(tax.id, tax.name)
      .orderBy(desc(tax.id));

    settaxList(result);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="font-bold text-4xl text-gray-800">Hi, {user?.fullName} 👋</h2>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your money. Let's manage your expenses.
        </p>
      </div>

      {/* Financial Overview Cards */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Financial Overview</h3>
        <CardInfo
          budgetList={budgetList}
          incomeList={incomeList}
          investmentList={investmentList}
          savingsList={savingsList}
          debtsList={debtsList}
          taxList={taxList}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Activity</h3>
            <BarChartDashboard budgetList={budgetList} />
          </div>

          {/* Financial Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Financial Distribution</h3>
            <PieChartComponent
              incomeList={incomeList}
              investmentList={investmentList}
              savingsList={savingsList}
              debtsList={debtsList}
              taxList={taxList}
            />
          </div>

          {/* Recent Expenses */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Expenses</h3>
            <ExpenseListTable
              expensesList={expensesList}
              refreshData={getBudgetList}
            />
          </div>
        </div>

        {/* Right Column - Budgets */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Latest Budgets</h3>
            <div className="space-y-4">
              {budgetList?.length > 0
                ? budgetList.map((budget, index) => (
                    <BudgetItem budget={budget} key={index} />
                  ))
                : [1, 2, 3].map((item, index) => (
                    <div
                      key={index}
                      className="h-[120px] w-full bg-gray-100 rounded-lg animate-pulse"
                    ></div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
