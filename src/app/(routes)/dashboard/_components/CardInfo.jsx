
import formatNumber from "@/utils";
import getFinancialAdvice from "@/utils/getFinacialAdvice";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import React, { useEffect, useState } from "react";


function CardInfo({ budgetList, incomeList, investmentList, savingsList ,debtsList,taxList}) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");
  const [investment, setInvestment] = useState(0);
  const [savings, setSavings] = useState(0);
  const [debts , setDebts] = useState(0);
  const [tax , settax] = useState(0);

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList, investmentList, savingsList,debtsList,taxList]);

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0 || investment > 0 || savings > 0 || debts>0 || tax>0) {
      const fetchFinancialAdvice = async () => {
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend,
          investment,
          savings,
          debts,
          tax
        );
        setFinancialAdvice(advice);
      };

      fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend, investment, savings,debts,tax]);

  const CalculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;
    let totalInvestment_ = 0;
    let totalSavings_ = 0;
    let totalDebts_= 0;
    let totalTax_ = 0 ;

    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount) || 0; // Ensure amount is a number
      totalSpend_ += Number(element.totalSpend) || 0; // Ensure totalSpend is a number
    });

    incomeList.forEach((element) => {
      totalIncome_ += Number(element.totalAmount) || 0; // Ensure totalAmount is a number
    });

    investmentList.forEach((element) => {
      totalInvestment_ += Number(element.totalInvestment) || 0; // Ensure totalInvestment is a number
    });

    savingsList.forEach((element) => {
      totalSavings_ += Number(element.totalSavings) || 0; // Ensure totalSavings is a number
    });
    debtsList.forEach((element) => {
      totalDebts_ += Number(element.totalDebts) || 0; // Ensure totalSavings is a number
    });
    taxList.forEach((element) => {
      totalTax_+= Number(element.totaltax) || 0; // Ensure totalSavings is a number
    });
    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
    setInvestment(totalInvestment_);
    setSavings(totalSavings_);
    setDebts(totalDebts_);
    settax(totalTax_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
            <div className="">
              <div className="flex mb-2 flex-row space-x-1 items-center">
                <h2 className="text-md">Finan Smart AI</h2>
                <Sparkles
                  className="rounded-full text-white w-10 h-10 p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate"
                />
              </div>
              <h2 className="font-light text-md">
                {financialAdvice || "Loading financial advice..."}
              </h2>
            </div>
          </div>
          

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Budget</h2>
                <h2 className="font-bold text-2xl">${formatNumber(totalBudget)}</h2>
              </div>
              <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Spend</h2>
                <h2 className="font-bold text-2xl">${formatNumber(totalSpend)}</h2>
              </div>
              <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">No. Of Budget</h2>
                <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
              </div>
              <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Income Streams</h2>
                <h2 className="font-bold text-2xl">${formatNumber(totalIncome)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Investments</h2>
                <h2 className="font-bold text-2xl">${formatNumber(investment)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Savings</h2>
                <h2 className="font-bold text-2xl">${formatNumber(savings)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of debts</h2>
                <h2 className="font-bold text-2xl">${formatNumber(debts)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of tax</h2>
                <h2 className="font-bold text-2xl">${formatNumber(tax)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
