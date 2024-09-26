"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ExpenseForm from "@/components/ExpenseForm";
import { Expense } from "@/types/expense";

export default function AddExpense() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (expenseData: Omit<Expense, "_id">) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add expense");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Add Expense</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ExpenseForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onCancel={() => {
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
