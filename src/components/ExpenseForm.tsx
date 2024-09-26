import { useState } from "react";
import { Expense } from "@/types/expense";
import { IoIosArrowDown, IoLogoUsd } from "react-icons/io";
interface ExpenseFormProps {
  onSubmit: (expenseData: Omit<Expense, "_id">) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}
const CATEGORIES = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Other",
];

export default function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      category,
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Amount
        </label>
        <div className="relative">
          <IoLogoUsd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition-all"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <div className="relative">
          <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-10 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition-all"
            required
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="pl-10 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition-all"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}
