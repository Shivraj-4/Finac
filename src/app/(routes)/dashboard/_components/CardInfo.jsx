import formatNumber from "@/utils";
import getFinancialAdvice from "@/utils/getFinacialAdvice";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
  TrendingUp,
  TrendingDownIcon,
  IndianRupee,
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
      totalIncome_ += Number(element.amount) || 0; // Changed from totalAmount to amount
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
          {/* AI Financial Advice Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Finan Smart AI</h2>
            </div>
            <p className="text-blue-100">
              {financialAdvice || "Loading financial advice..."}
            </p>
          </div>

          {/* Financial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Budget Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Budget</p>
                  <h3 className="text-2xl font-bold mt-1">₹{formatNumber(totalBudget)}</h3>
                </div>
                <PiggyBank className="w-10 h-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />
              </div>
            </div>

            {/* Total Spend Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Spend</p>
                  <h3 className="text-2xl font-bold mt-1">₹{formatNumber(totalSpend)}</h3>
                </div>
                <ReceiptText className="w-10 h-10 p-2 bg-green-100 text-green-600 rounded-lg" />
              </div>
            </div>

            {/* Number of Budgets Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Number of Budgets</p>
                  <h3 className="text-2xl font-bold mt-1">{budgetList?.length}</h3>
                </div>
                <Wallet className="w-10 h-10 p-2 bg-purple-100 text-purple-600 rounded-lg" />
              </div>
            </div>

            {/* Total Income Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Income</p>
                  <h3 className="text-2xl font-bold mt-1">₹{formatNumber(totalIncome)}</h3>
                </div>
                <CircleDollarSign className="w-10 h-10 p-2 bg-yellow-100 text-yellow-600 rounded-lg" />
              </div>
            </div>

            {/* Investments Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Investments</p>
                  <h3 className="text-2xl font-bold mt-1">₹{formatNumber(investment)}</h3>
                </div>
                <TrendingUp className="w-10 h-10 p-2 bg-indigo-100 text-indigo-600 rounded-lg" />
              </div>
            </div>

            {/* Savings Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Savings</p>
                  <h3 className="text-2xl font-bold mt-1">₹{formatNumber(savings)}</h3>
                </div>
                <PiggyBank className="w-10 h-10 p-2 bg-pink-100 text-pink-600 rounded-lg" />
              </div>
            </div>

            {/* Debts Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Debts</p>
                  <h3 className="text-2xl font-bold mt-1">₹{formatNumber(debts)}</h3>
                </div>
                <TrendingDownIcon className="w-10 h-10 p-2 bg-red-100 text-red-600 rounded-lg" />
              </div>
            </div>

            {/* Tax Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Tax</p>
                  <h3 className="text-2xl font-bold mt-1">₹{formatNumber(tax)}</h3>
                </div>
                <IndianRupee className="w-10 h-10 p-2 bg-orange-100 text-orange-600 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="h-[120px] w-full bg-gray-100 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
