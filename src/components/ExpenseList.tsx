import React from "react";
import Link from "next/link";
import { Expense } from "@/types/expense";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  return (
    <ul className="space-y-2">
      {expenses.map((expense) => (
        <li
          key={expense._id}
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <span className="font-semibold">
              {new Date(expense.date).toLocaleDateString()}
            </span>
            : ${expense.amount.toFixed(2)} - {expense.category}
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/edit-expense/${expense._id}`}
              title="Edit Expense"
              className="text-blue-500 hover:underline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(expense._id)}
              title="Delete Expense"
              className="text-red-500 hover:underline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
