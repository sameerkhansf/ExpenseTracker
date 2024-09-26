"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { IoLogOut, IoLogOutOutline } from "react-icons/io5";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"list" | "summary">("list");
  const [darkMode, setDarkMode] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      console.log("Received data:", data);
      if (Array.isArray(data.expenses) && data.expenses.length > 0) {
        setExpenses(data.expenses);
      } else {
        console.log("No expenses found, using fake data");
        // setExpenses(generateFakeExpenses());
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      console.log("Using fake data due to error");
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
      <div className="flex justify-center items-center h-screen">
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

  const pieChartData = {
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

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <nav
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } border-b border-gray-200 fixed w-full z-10`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">ExpenseTracker</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              {darkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsAddExpenseModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
              <FaPlus className="mr-2" /> Add Expense
            </button>
            <button
              onClick={logout}
              className={`p-2 rounded-full ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              {darkMode ? (
                <IoLogOutOutline className="text-yellow-500" />
              ) : (
                <IoLogOut className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg p-6 shadow-lg`}
          >
            <div className="flex items-center mb-4">
              <FaWallet className="text-blue-500 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-2xl font-bold">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="h-2 bg-blue-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${(totalExpenses / 5000) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Monthly budget: $5,000</p>
          </div>

          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg p-6 shadow-lg`}
          >
            <div className="flex items-center mb-4">
              <FaChartLine className="text-green-500 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-500">Average Expense</p>
                <p className="text-2xl font-bold">
                  ${averageExpense.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Based on {expenses.length} transactions
            </p>
          </div>

          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg p-6 shadow-lg`}
          >
            <div className="flex items-center mb-4">
              <FaChartPie className="text-yellow-500 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-500">Top Category</p>
                <p className="text-2xl font-bold">{topCategory}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Most frequent expense type</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg p-6`}
          >
            <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
            <div className="h-64">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>

          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg p-6`}
          >
            <h2 className="text-xl font-semibold mb-4">Monthly Trend</h2>
            <div className="h-64 flex items-center justify-center">
              <FaChartLine className="text-6xl text-gray-400" />
              <p className="ml-4 text-gray-500">Coming soon</p>
            </div>
          </div>
        </div>

        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-lg p-6`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-md transition-colors ${
                  view === "list"
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <FaList />
              </button>
              <button
                onClick={() => setView("summary")}
                className={`p-2 rounded-md transition-colors ${
                  view === "summary"
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-600"
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
        </div>
      </div>

      {isAddExpenseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg p-6 w-full max-w-md`}
          >
            <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
            <ExpenseForm
              onSubmit={handleAddExpense}
              onCancel={() => setIsAddExpenseModalOpen(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </div>
  );
}
