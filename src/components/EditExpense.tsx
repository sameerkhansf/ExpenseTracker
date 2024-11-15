"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ExpenseForm from "@/components/ExpenseForm";
import { Expense } from "@/types/expense";

export default function EditExpense({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`/api/expenses?id=${params.id}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch expense: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (!data) {
          throw new Error("No data returned from API");
        }
        setExpense(data);
      } catch (error) {
        console.error("Error fetching expense:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpense();
  }, [params.id]);

  const handleSubmit = async (expenseData: Omit<Expense, "_id">) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/expenses", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: params.id, // Include the ID in the request body
          ...expenseData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to update expense: ${errorData.error || response.statusText}`
        );
      }

      const updatedExpense = await response.json();
      console.log("Updated expense:", updatedExpense);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating expense:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!expense) {
    return <div>Expense not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Expense</h1>
      <ExpenseForm
        expense={expense} // Add this line
        onCancel={() => router.push("/dashboard")}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
