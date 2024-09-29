import React, { useState, useEffect } from "react";
import { Expense, ExpenseCategory } from "@/types/expense";
import {
  IoIosArrowDown,
  IoLogoUsd,
  IoMdCalendar,
  IoMdPricetag,
  IoMdCreate,
} from "react-icons/io";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: (expenseData: Omit<Expense, "_id">) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function ExpenseForm({
  expense,
  onSubmit,
  onCancel,
  isSubmitting,
}: ExpenseFormProps) {
  const [amount, setAmount] = useState(
    expense ? expense.amount.toString() : ""
  );
  const [category, setCategory] = useState<ExpenseCategory>(
    expense ? expense.category : ExpenseCategory.FOOD
  );
  const [date, setDate] = useState(
    expense
      ? formatDateForInput(expense.date)
      : formatDateForInput(new Date().toISOString())
  );
  const [description, setDescription] = useState(expense?.description || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { state } = useAppContext();

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDate(formatDateForInput(expense.date));
      setDescription(expense.description || "");
    }
  }, [expense]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!amount || isNaN(parseFloat(amount))) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!date) {
      newErrors.date = "Please select a date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        amount: parseFloat(amount),
        category: category as ExpenseCategory,
        date: new Date(date).toISOString(),
        description,
      });
    }
  };

  // Add this helper function
  function formatDateForInput(dateString: string): string {
    return new Date(dateString).toISOString().split("T")[0];
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Amount ({state.currency})
        </label>
        <div className="relative">
          <IoLogoUsd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 pr-3 py-2 w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
            required
            step="0.01"
            placeholder="0.00"
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Category
        </label>
        <div className="relative">
          <IoMdPricetag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="pl-10 pr-10 py-2 w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all appearance-none"
            required
          >
            {Object.values(ExpenseCategory).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Date
        </label>
        <div className="relative">
          <IoMdCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-10 pr-3 py-2 w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
            required
          />
        </div>
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Description (Optional)
        </label>
        <div className="relative">
          <IoMdCreate className="absolute left-3 top-3 text-gray-400" />
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="pl-10 pr-3 py-2 w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
            rows={3}
            placeholder="Enter a description..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-8">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting
            ? "Submitting..."
            : expense
            ? "Update Expense"
            : "Add Expense"}
        </motion.button>
      </div>
    </motion.form>
  );
}
