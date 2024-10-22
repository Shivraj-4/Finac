import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Function to generate personalized financial advice
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend, investment, savings, debts, tax) => {
  try {
    const prompt = `
  Based on the following financial data:
  - Total Budget: ${totalBudget} rupees
  - Expenses: ${totalSpend} rupees
  - Incomes: ${totalIncome} rupees
  - Investment: ${investment} rupees
  - Savings: ${savings} rupees
  - Debts: ${debts} rupees
  - Tax: ${tax} rupees

  Please provide a comprehensive financial strategy that includes:
  1. A **percentage breakdown** of how to allocate the total budget across essential categories (e.g., savings, debts, investments, necessities, tax) with numerical values.
  2. **Specific savings goals**, such as a target savings amount per month or year.
  3. Recommendations on how to **reduce unnecessary expenses** by a percentage or amount and how to handle investments.
  4. Suggested **investment options** based on current market trends and potential future returns, with estimated returns in percentage.
  5. Analysis of how **inflation** might affect future expenses and income, and how to adjust the budget accordingly.
  6. **Actionable steps** to improve cash flow and financial stability over the next year, with specific financial targets.

  **Format the response in clear bullet points** for easy readability.
`;


    // Call the Gemini model to generate content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    // Process and return the response
    const advice = result.response.text;
    return advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
