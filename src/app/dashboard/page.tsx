"use client";

import { useState, useEffect } from "react";
import { Expense } from "@/types/expense";
import ExpenseList from "@/components/ExpenseList";
import ExpenseForm from "@/components/ExpenseForm";
import {
  FaPlus,
  FaChartPie,
  FaList,
  FaWallet,
  FaChartLine,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"list" | "summary">("list");
  const [darkMode, setDarkMode] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  useEffect(() => {
    fetchExpenses();
  }, []);
  const logout = () => {
    signOut({ callbackUrl: "/" });
  };
  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses");
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }
      const data = await response.json();
      if (Array.isArray(data.expenses) && data.expenses.length > 0) {
        setExpenses(data.expenses);
      } else {
        // setExpenses(generateFakeExpenses());
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      // setExpenses(generateFakeExpenses());
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      const response = await fetch(`/api/expenses?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      // Refresh the expense list
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleAddExpense = async (expenseData: Omit<Expense, "_id">) => {
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      await fetchExpenses();
      setIsAddExpenseModalOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        Loading...
      </div>
    );
  }

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  // Calculate expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory =
    Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "N/A";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const doughnutChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            ExpenseTracker
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddExpenseModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center"
            >
              <FaPlus className="mr-2" /> Add Expense
            </motion.button>
            <button
              onClick={logout}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <IoLogOut
                className="text-gray-600 dark:text-gray-300"
                size={20}
              />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaWallet className="text-blue-500 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${(totalExpenses / 5000) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Monthly budget: $5,000
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaChartLine className="text-green-500 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Average Expense
                </p>
                <p className="text-2xl font-bold">
                  ${averageExpense.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Based on {expenses.length} transactions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaChartPie className="text-yellow-500 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Top Category
                </p>
                <p className="text-2xl font-bold">{topCategory}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Most frequent expense type
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
            <div className="h-64">
              <Doughnut
                data={doughnutChartData}
                options={doughnutChartOptions}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Monthly Trend</h2>
            <div className="h-64 flex items-center justify-center">
              <FaChartLine className="text-6xl text-gray-400" />
              <p className="ml-4 text-gray-500 dark:text-gray-400">
                Coming soon
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-md transition-colors ${
                  view === "list"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                <FaList />
              </button>
              <button
                onClick={() => setView("summary")}
                className={`p-2 rounded-md transition-colors ${
                  view === "summary"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                <FaChartPie />
              </button>
            </div>
          </div>
          {expenses.length > 0 ? (
            view === "list" ? (
              <ExpenseList expenses={expenses} onDelete={handleDelete} />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(expensesByCategory).map(
                  ([category, amount]) => (
                    <div key={category} className="p-4 rounded-lg">
                      <h3 className="font-semibold">{category}</h3>
                      <p className="text-2xl font-bold">${amount.toFixed(2)}</p>
                    </div>
                  )
                )}
              </div>
            )
          ) : (
            <p className="text-gray-500 text-center py-4">No expenses found.</p>
          )}
        </motion.div>
      </div>

      {isAddExpenseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Add Expense
            </h2>
            <ExpenseForm
              onSubmit={handleAddExpense}
              onCancel={() => setIsAddExpenseModalOpen(false)}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
